# Contributing

Thanks for your interest in improving Network Study Hub! Contributions are welcome.

## Development Setup

- Node 18+ recommended
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Generate content from PDFs:
  - `npm run summarize`
  - `npm run extract:finale`

## Code Style

- TypeScript, React function components
- Keep changes focused and minimal; prefer small PRs
- Use Tailwind for styling; keep UI consistent with the light‑blue theme
- Put new diagrams in markdown code fences using the `mermaid` language

## Testing and Validation

- Ensure `npm run build` succeeds
- Manually verify pages you touched in the browser
- If you added new diagrams, expand them on the Learn page to confirm rendering

## Git & PRs

- Create a feature branch off `main`
- Write a clear PR title and description with screenshots (if UI changes)
- Link any related issues; describe rationale and alternatives considered

## Content

- Curated topics live in `src/content/topics.ts`
- Quizzes live in `src/data/quizzes.ts`
- Command lists live in `src/data/commands.ts`
- Keep explanations concise; prefer bullets + diagrams over long text

## Reporting Issues

Use the issue templates to provide reproduction steps, expected vs actual behavior, and screenshots when relevant.

## License

By contributing, you agree that your contributions will be licensed under the
MIT License. See `LICENSE`.

