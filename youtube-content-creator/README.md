# YouTube Content Creator AI

This is an AI-powered application that helps create YouTube content using OpenAI's API.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (18.x or higher)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd youtube-content-creator
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:
   - Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Open `.env` and replace `your-api-key-here` with your OpenAI API key

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
