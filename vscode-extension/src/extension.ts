import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

let currentPanel: vscode.WebviewPanel | undefined;
let currentFilePath: string | undefined;
let fileWatcher: vscode.FileSystemWatcher | undefined;

export function activate(context: vscode.ExtensionContext): void {
  // Open Preview — file picker or active editor
  const openPreviewCmd = vscode.commands.registerCommand(
    "repoStory.openPreview",
    async () => {
      const filePath = await resolveHtmlFile();
      if (filePath) {
        openPreviewPanel(context, filePath);
      }
    }
  );

  // Open specific file (can be called programmatically by Claude skill)
  const openFileCmd = vscode.commands.registerCommand(
    "repoStory.openFile",
    (filePath: string) => {
      if (filePath && fs.existsSync(filePath)) {
        openPreviewPanel(context, filePath);
      }
    }
  );

  // Refresh the current preview
  const refreshCmd = vscode.commands.registerCommand(
    "repoStory.refresh",
    () => {
      if (currentPanel && currentFilePath) {
        loadHtmlIntoPanel(currentPanel, currentFilePath);
        vscode.window.setStatusBarMessage("RepoStory preview refreshed", 2000);
      }
    }
  );

  // Open the HTML in default browser
  const openInBrowserCmd = vscode.commands.registerCommand(
    "repoStory.openInBrowser",
    () => {
      if (currentFilePath) {
        vscode.env.openExternal(vscode.Uri.file(currentFilePath));
      }
    }
  );

  context.subscriptions.push(
    openPreviewCmd,
    openFileCmd,
    refreshCmd,
    openInBrowserCmd
  );
}

/**
 * Try to resolve an HTML file to preview:
 * 1. If active editor is an HTML file, use that
 * 2. Search workspace for demo.html / repo-story.html
 * 3. Fall back to file picker
 */
async function resolveHtmlFile(): Promise<string | undefined> {
  // Check active editor
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor?.document.fileName.endsWith(".html")) {
    return activeEditor.document.fileName;
  }

  // Search workspace for common output filenames
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders) {
    const root = workspaceFolders[0].uri.fsPath;
    for (const name of ["demo.html", "repo-story.html", "walkthrough.html"]) {
      const candidate = path.join(root, name);
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  // File picker
  const uris = await vscode.window.showOpenDialog({
    canSelectFiles: true,
    canSelectFolders: false,
    canSelectMany: false,
    filters: { "HTML Files": ["html", "htm"] },
    title: "Select RepoStory HTML file to preview",
  });
  return uris?.[0]?.fsPath;
}

function openPreviewPanel(
  context: vscode.ExtensionContext,
  htmlFilePath: string
): void {
  const column = vscode.ViewColumn.Beside;
  const fileName = path.basename(htmlFilePath);

  // Reuse existing panel
  if (currentPanel) {
    currentPanel.reveal(column);
    currentFilePath = htmlFilePath;
    loadHtmlIntoPanel(currentPanel, htmlFilePath);
    setupFileWatcher(htmlFilePath, currentPanel);
    return;
  }

  // Create new webview panel
  currentPanel = vscode.window.createWebviewPanel(
    "repoStoryPreview",
    `RepoStory: ${fileName}`,
    column,
    {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(path.dirname(htmlFilePath)),
      ],
      retainContextWhenHidden: true,
    }
  );

  currentFilePath = htmlFilePath;
  loadHtmlIntoPanel(currentPanel, htmlFilePath);
  setupFileWatcher(htmlFilePath, currentPanel);

  // Cleanup on panel close
  currentPanel.onDidDispose(
    () => {
      currentPanel = undefined;
      currentFilePath = undefined;
      fileWatcher?.dispose();
      fileWatcher = undefined;
    },
    null,
    context.subscriptions
  );
}

function loadHtmlIntoPanel(
  panel: vscode.WebviewPanel,
  htmlFilePath: string
): void {
  try {
    let html = fs.readFileSync(htmlFilePath, "utf8");

    // Rewrite relative asset paths (src="./...", href="./...") to webview URIs
    // so local images/resources load correctly inside the webview
    const fileDir = path.dirname(htmlFilePath);
    html = html.replace(
      /(src|href)="(?!https?:\/\/)(?!data:)(?!#)([^"]+)"/g,
      (_match, attr, relativePath) => {
        const absolutePath = path.resolve(fileDir, relativePath);
        if (fs.existsSync(absolutePath)) {
          const webviewUri = panel.webview.asWebviewUri(
            vscode.Uri.file(absolutePath)
          );
          return `${attr}="${webviewUri}"`;
        }
        return `${attr}="${relativePath}"`;
      }
    );

    panel.webview.html = html;
    panel.title = `RepoStory: ${path.basename(htmlFilePath)}`;
  } catch (err) {
    panel.webview.html = `<!DOCTYPE html><html><body>
      <div style="padding:40px;font-family:system-ui;color:#e2e8f0;background:#0f0f23;min-height:100vh;">
        <h2 style="color:#ef4444;">Failed to load preview</h2>
        <p>${String(err)}</p>
        <p style="color:#9ca3af;margin-top:16px;">
          Make sure the HTML file exists and is readable.
        </p>
      </div>
    </body></html>`;
  }
}

function setupFileWatcher(
  htmlFilePath: string,
  panel: vscode.WebviewPanel
): void {
  // Dispose previous watcher if watching a different file
  fileWatcher?.dispose();

  const pattern = new vscode.RelativePattern(
    vscode.Uri.file(path.dirname(htmlFilePath)),
    path.basename(htmlFilePath)
  );

  fileWatcher = vscode.workspace.createFileSystemWatcher(pattern);

  fileWatcher.onDidChange(() => {
    loadHtmlIntoPanel(panel, htmlFilePath);
    vscode.window.setStatusBarMessage("RepoStory preview refreshed", 2000);
  });

  fileWatcher.onDidCreate(() => {
    loadHtmlIntoPanel(panel, htmlFilePath);
  });
}

export function deactivate(): void {
  fileWatcher?.dispose();
}
