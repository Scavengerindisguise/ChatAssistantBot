# ChatAssistantBot

A small terminal chat assistant powered by the [OpenAI API](https://platform.openai.com/). Type messages in the console and get replies from **gpt-4o-mini**, with conversation history kept in memory and trimmed when it grows too large.

## Features

- **Interactive CLI** — reads your input from stdin and prints assistant responses in the terminal.
- **Persistent context** — each turn is appended to a message list so the model can follow the conversation.
- **Token-aware trimming** — uses [tiktoken](https://github.com/openai/tiktoken) to estimate context size. When usage exceeds the configured limit, older non-system messages are removed so the system prompt stays in place.

## Requirements

- [Node.js](https://nodejs.org/) (with support for `--env-file`, as used by the start script)
- An OpenAI API key

## Setup

1. Clone or download this repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root (this file is gitignored):

   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

   The official OpenAI Node SDK reads `OPENAI_API_KEY` from the environment.

## Usage

Start the basic chat entry point:

```bash
npm start
```

Type a message and press Enter. The assistant reply is printed as `assistant: ...`. Continue chatting until you exit the process (for example with `Ctrl+C`).

### Debugging in VS Code

The repo includes a **Current File** launch configuration that runs the active TypeScript file with `ts-node` and loads variables from `.env`. Open `src/basic-chat/index.ts` and start debugging, or adjust the configuration for other files under `src/`.

## Project layout

| Path | Description |
|------|-------------|
| `src/basic-chat/index.ts` | Main chat loop: OpenAI completions, context management, stdin handling |
| `dist/` | TypeScript compiler output (`tsc` with `outDir: dist`) |
| `tsconfig.json` | TypeScript settings (strict mode, CommonJS, `src` → `dist`) |

## How context trimming works

- The system message (`"You are a helpful assistant."`) is never removed.
- After each API response, if reported `total_tokens` is above **700**, the app drops the oldest user/assistant messages one at a time until the locally estimated token count (via tiktoken for `gpt-4o-mini`) is at or below that threshold.

You can change the model, system prompt, or `MAX_TOKENS` in `src/basic-chat/index.ts`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run `src/basic-chat/index.ts` with `ts-node` and `.env` loaded |

## License

ISC — see `package.json`.

## Author

Shourya Dey
