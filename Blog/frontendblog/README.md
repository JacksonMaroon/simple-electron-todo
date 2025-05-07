# Gwern-Inspired Blog Frontend

This is the frontend for a Gwern-inspired blog built with Next.js, TypeScript, Tailwind CSS, and tRPC.

## Features

- Next.js 14 App Router with TypeScript
- Tailwind CSS for styling with shadcn/ui components
- MDX rendering with KaTeX, Shiki, sidenotes, and hover footnotes
- JWT authentication with secure cookies
- Infinite scrolling post list
- Command+K spotlight search
- Tag and series pages
- Search functionality via Algolia
- Links page that groups markdown links by year and tag
- Admin dashboard for content management
- Light/dark mode toggle
- Keyboard navigation (j/k, n/p, g h)
- Dead link dimming
- SEO meta tags and OpenGraph cards

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Backend API running (see backend-blog repository)

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/frontend-blog.git
cd frontend-blog
\`\`\`

2. Install dependencies:

\`\`\`bash
pnpm install
\`\`\`

3. Create a `.env.local` file with the following variables:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

4. Start the development server:

\`\`\`bash
pnpm dev
\`\`\`

The application will be available at http://localhost:3000.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components
  - `ui/` - shadcn/ui components
  - `mdx/` - MDX rendering components
  - `admin/` - Admin dashboard components
  - `auth/` - Authentication components
- `lib/` - Utility functions
  - `trpc/` - tRPC client setup
  - `auth/` - Authentication utilities
  - `hooks/` - Custom React hooks
- `styles/` - Global styles
- `config/` - Site configuration
- `public/` - Static assets

## Authentication

The application uses JWT-based authentication with secure cookies. The authentication flow is as follows:

1. User signs in with email and password
2. Backend validates credentials and returns access and refresh tokens
3. Tokens are stored in secure HTTP-only cookies
4. Access token is used for API requests
5. Refresh token is used to get a new access token when it expires

## MDX Rendering

The blog supports MDX content with the following features:

- KaTeX for math rendering
- Shiki for code highlighting
- Sidenotes for margin notes
- Hover footnotes
- Custom components for enhanced content

## Admin Dashboard

The admin dashboard provides the following functionality:

- Post management (create, edit, delete)
- Tag management
- Series management
- Comment moderation

## Testing

Run unit tests:

\`\`\`bash
pnpm test
\`\`\`

Run E2E tests:

\`\`\`bash
pnpm test:e2e
\`\`\`

## Deployment

The application is configured for deployment on Vercel with the following settings:

- ISR (Incremental Static Regeneration) for posts
- Edge caching for feeds

To deploy to Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Set the environment variables
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.
