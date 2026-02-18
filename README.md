# RepoStory

> Turn any web project into an animated phone demo — powered by Claude Code.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Claude Code Plugin](https://img.shields.io/badge/Claude_Code-Plugin-blueviolet)](https://docs.anthropic.com/en/docs/claude-code)

<p align="center">
  <img src="docs/demo-preview.gif" alt="RepoStory generates animated phone demos from your codebase" width="360" />
</p>

RepoStory is a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) plugin that reads your project's source code, extracts its design language, maps user flows, and generates a **self-contained animated HTML file** showing an iPhone-style walkthrough of your app.

No config, no dependencies, no design tools — just point it at your repo and get a polished demo.

## Quick Start

```bash
# 1. Install the plugin
claude /plugin install github:BaeriShapira/repo-story

# 2. Run it in your project
/repo-story

# 3. Open demo.html in your browser
```

## What You Get

A single HTML file (zero external dependencies) featuring:

- **iPhone frame** with Dynamic Island and status bar
- **Animated transitions** — slide, fade, zoom, slide-up between screens
- **Your actual color palette** — extracted from your codebase
- **Realistic content** — domain-specific placeholder text, not Lorem ipsum
- **Captions** explaining each screen and key features
- **Auto-play** with seamless loop
- **Keyboard controls** — arrow keys + spacebar
- **Responsive** — works on mobile and desktop

## How It Works

RepoStory runs in 6 phases:

1. **Discovery** — Identifies your framework, design tokens, pages, components, and UI patterns
2. **Consultation** — Asks which flow to showcase, target audience, language, and key features
3. **Screen design** — Creates simplified HTML/CSS representations of each screen
4. **Generation** — Produces the self-contained HTML file with CSS transitions and JS auto-play
5. **Tuning** — Refine screens through conversation until you're happy
6. **Export** — Download as video, embed in your project, or keep as HTML

## Supported Frameworks

Works with any web project. Optimized detection for:

| Framework | Router Support |
|-----------|---------------|
| Next.js | App Router & Pages Router |
| React | Vite, CRA |
| Vue / Nuxt | Vue 3 + Nuxt 3 |
| Angular | Standalone & NgModule |
| Svelte / SvelteKit | - |
| Astro | - |
| Remix | - |
| Gatsby | - |

## Multi-Language Support

RepoStory asks which language to use for captions and placeholder text. Supports LTR and RTL languages, including Hebrew and Arabic.

## VS Code Extension

An optional extension that adds a live preview panel inside VS Code:

```bash
# From VS Code Marketplace
ext install BaeriShapira.repo-story-preview
```

Or build from source:

```bash
cd vscode-extension
npm install && npm run compile
```

**Commands:**

| Command | Description |
|---------|-------------|
| `RepoStory: Open Preview` | Open phone mockup in a side panel |
| `RepoStory: Refresh Preview` | Reload the preview |
| `RepoStory: Open in Browser` | Open the HTML in your default browser |

The preview auto-refreshes when the HTML file changes — perfect for the tuning phase.

## Project Structure

```
repo-story/
├── .claude-plugin/            # Claude Code plugin manifest
│   └── plugin.json
├── skills/repo-story/         # Skill definition + reference files
│   ├── SKILL.md               # Main skill (6 phases)
│   └── references/            # Discovery, patterns, template, animation guides
├── vscode-extension/          # VS Code preview extension
│   ├── src/extension.ts
│   └── package.json
├── docs/                      # Demo assets
├── LICENSE
└── README.md
```

## Usage Examples

```
# Generate with default output (demo.html)
/repo-story

# Specify output filename
/repo-story my-app-demo.html

# Or use natural language
"Create a demo walkthrough of my app"
"Generate an animated showcase of the registration flow"
"Make a phone mockup demo for investors"
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

[MIT](LICENSE)
