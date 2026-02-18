# RepoStory

Generate animated phone demo walkthroughs from your codebase — a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) skill.

<p align="center">
  <img src="https://img.shields.io/badge/Claude_Code-Skill-blueviolet" alt="Claude Code Skill" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License" />
</p>

## Install

```bash
git clone https://github.com/BaeriShapira/repo-story .claude/skills/repo-story
```

## Usage

In Claude Code, run:

```
/repo-story
```

Or just ask naturally:

- "Create a demo walkthrough of my app"
- "Generate an animated showcase for investors"
- "Make a phone mockup demo of the registration flow"

## What You Get

A single self-contained HTML file with:

- iPhone-style phone frame with animated screen transitions
- Your app's actual color palette, extracted from the codebase
- Realistic placeholder content (not Lorem ipsum)
- Captions explaining each screen
- Auto-play with seamless loop
- Zero external dependencies

## How It Works

1. **Discovery** — Scans your codebase for framework, colors, pages, and components
2. **Consultation** — Asks which flow to showcase, audience, language, and features
3. **Design** — Creates simplified screen representations using your design language
4. **Generation** — Produces the self-contained HTML animation
5. **Tuning** — Refine screens through conversation until you're happy
6. **Export** — Keep as HTML, export as video, or embed in your project

## Supported Frameworks

Next.js, React, Vue/Nuxt, Angular, Svelte/SvelteKit, Astro, Remix, Gatsby — or any web project.

## License

[MIT](LICENSE)
