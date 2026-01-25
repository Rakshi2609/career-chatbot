# Career Chatbot - Frontend (Next.js)

Modern Next.js frontend for the Career Chatbot application with Genkit AI integration, built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- **Next.js 15** - React framework with App Router
- **Genkit AI Integration** - Google AI Generative SDK
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Voice Support** - Voice interaction capabilities
- **Responsive Design** - Mobile-first approach
- **Firebase Integration** - Authentication and backend services

## Tech Stack

### Core
- Next.js 15.5.9
- React 18.3.1
- TypeScript 5.x
- Tailwind CSS

### AI & Backend
- Genkit 1.14.1
- @genkit-ai/googleai 1.14.1
- @genkit-ai/next 1.14.1
- Firebase 11.9.1

### UI Components
- shadcn/ui (Radix UI primitives)
- Lucide React (icons)
- Recharts (data visualization)
- date-fns (date utilities)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key_here
PORT=9002
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### 3. Run Development Server

```bash
npm run dev
```

App will run on `http://localhost:9002`.

### 4. (Optional) Run Genkit Development UI

For debugging AI flows:

```bash
npm run genkit:dev
```

Or with file watching:

```bash
npm run genkit:watch
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run genkit:dev` | Start Genkit development UI |
| `npm run genkit:watch` | Start Genkit UI with file watching |

## Project Structure

```
trial/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Home page
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   └── api/          # API routes
│   │       └── chat/     # Chat API endpoints
│   ├── components/       # React components
│   │   ├── chat-message.tsx
│   │   ├── mira-chat.tsx
│   │   ├── voice-status-bar.tsx
│   │   └── ui/          # shadcn/ui components
│   ├── ai/              # Genkit AI configuration
│   │   ├── genkit.ts    # AI setup
│   │   └── dev.ts       # Development flows
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── public/              # Static assets
├── docs/               # Documentation
├── .env.local          # Environment variables (not in git)
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind configuration
└── package.json        # Dependencies and scripts
```

## Pages

- **/** - Home page
- **/about** - About the application
- **/contact** - Contact page
- **/chatbot** - Main chatbot interface (if implemented)

## API Routes

### POST `/api/chat`

Chat endpoint for AI interactions.

**Request:**
```json
{
  "message": "How do I become a data scientist?",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "response": "AI-generated response...",
  "sessionId": "session-id"
}
```

### POST `/api/chat/message`

Alternative message endpoint.

## Components

### Core Components
- `chat-message.tsx` - Individual chat message display
- `mira-chat.tsx` - Main chat interface
- `voice-status-bar.tsx` - Voice interaction status
- `header.tsx` / `footer.tsx` - Layout components

### UI Components (shadcn/ui)
Pre-built, accessible components in `src/components/ui/`:
- Buttons, Cards, Dialogs
- Forms, Inputs, Selects
- Accordions, Tabs, Tooltips
- Charts, Progress, Sliders
- And many more...

## Styling

This project uses Tailwind CSS with custom configuration. The design system includes:
- Custom color palette
- Responsive breakpoints
- Dark mode support
- Animation utilities

## Firebase Configuration

If using Firebase features, add these to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Genkit AI

The application uses Genkit for AI flow management. Configuration is in `src/ai/genkit.ts`.

### Key Features:
- Google AI integration (Gemini models)
- Flow management for AI interactions
- Development UI for debugging
- Streaming responses support

## Building for Production

```bash
npm run build
npm start
```

The optimized production build will be created in `.next/`.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key | Yes |
| `PORT` | Development server port | No (default: 9002) |
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase config | Optional |

## Deployment

This project can be deployed to:
- Vercel (recommended for Next.js)
- Google Cloud (App Hosting)
- Any Node.js hosting platform

See `apphosting.yaml` for Google Cloud deployment configuration.

## Documentation

Additional documentation is available in the `docs/` folder:
- `blueprint.md` - Project architecture and design

## License

ISC
