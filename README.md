# Next.js Sanity Ecommerce

A modern ecommerce application built with Next.js 16, Sanity CMS, Clerk authentication, and Stripe payments.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity v5
- **Authentication**: Clerk
- **Payments**: Stripe
- **Styling**: Tailwind CSS, Shadcn UI, Radix UI
- **Language**: TypeScript

## Features

- Product catalog with categories
- Shopping cart (guest and authenticated users)
- Stripe checkout integration
- Sanity Studio admin panel (`/admin/studio`)
- Real-time content preview with draft mode
- Responsive design with modern UI components

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Sanity project
- Clerk account
- Stripe account

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-10
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_TOKEN=your_write_token

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BASE_URL=your-production-domain.com
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000` and the Sanity Studio at `http://localhost:3000/admin/studio`.

### Build

```bash
npm run build
npm start
```

### Type Generation

Generate TypeScript types from Sanity schema:

```bash
npm run typegen
```

## Project Structure

```
├── app/             # Next.js app router pages
│   ├── (client)/    # Client-facing pages
│   ├── (auth)/      # Authentication pages
│   ├── admin/       # Admin routes
│   └── api/         # API routes
├── src/
│   ├── entities/    # Business entities (products, categories, etc.)
│   ├── features/    # Feature modules
│   ├── pages/       # Page components
│   ├── shared/      # Shared utilities and config
│   └── widgets/     # UI widgets
├── sanity/          # Sanity schema and configuration
└── public/          # Static assets
```

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typegen` - Generate TypeScript types from Sanity schema
