# Network Study Hub

An interactive study site for networking coursework. It summarizes slides, renders diagrams, provides quizzes, and includes hands‑on CLI labs for IPv4/IPv6. Built with Vite + React + Tailwind + Mermaid.

## Features

- Learn: curated topics with Mermaid diagrams, command highlights, and collapsible sections
- Final Notes: renders your summarized PDF as Markdown
- Quiz: large set of topic‑grouped multiple‑choice questions
- Labs: practice typing real IOS‑style configs with instant feedback (IPv4/IPv6 toggle)
- Commands: quick cheatsheet (IPv4 + IPv6)

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS (Typography plugin)
- React Router
- Mermaid (diagrams)
- react‑markdown + remark‑gfm (Markdown rendering)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Content Pipeline

- Generate slide summaries from PDFs in `course_slides/`:
  - `npm run summarize` → writes `content/summary.md`
- Use your pre‑summarized final notes PDF:
  - Place at `course_slides/summarized/Net Design Finale.pdf`
  - `npm run extract:finale` → writes `content/finale.md`

The Learn page has two tabs:
- Topics: curated explanations + diagrams (editable at `src/content/topics.ts`)
- Final Notes: rendered from `content/finale.md`

## Useful Scripts

- `npm run dev` – start dev server
- `npm run build` – type‑check + build
- `npm run preview` – preview production build
- `npm run summarize` – extract text from all PDFs to `content/summary.md`
- `npm run extract:finale` – extract text from your summarized PDF to `content/finale.md`

## Project Structure

```
src/
  pages/           # Home, Learn, Quiz, Labs, Commands
  components/      # Quiz, Mermaid renderer
  content/         # Curated topics (TS module with markdown)
  data/            # Quizzes and command groups
content/           # Generated markdown (summary.md, finale.md)
course_slides/     # Your PDFs (ignored by git)
scripts/           # PDF extraction scripts
```

## Contributing

See `CONTRIBUTING.md` for setup, coding style, and pull request guidelines. By contributing, you agree to the code of conduct in `CODE_OF_CONDUCT.md`.

## Security

Please report vulnerabilities responsibly as described in `SECURITY.md`.

## License

MIT — see `LICENSE` for details.

