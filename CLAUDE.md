# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (or `yarn dev`) - Runs Next.js development server on http://localhost:3000
- **Build**: `npm run build` - Creates production build
- **Start production**: `npm start` - Starts production server
- **Lint**: `npm run lint` - Runs Next.js ESLint

## Project Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **UI Framework**: Material-UI (MUI) v6 + Tailwind CSS + shadcn/ui components
- **State Management**: Redux Toolkit with Redux Persist (localStorage)
- **Styling**: Tailwind CSS with custom animations and HSL color variables
- **Authentication**: Google OAuth via @react-oauth/google
- **HTTP Client**: Axios with interceptors for auth handling
- **Maps**: React Leaflet for location features
- **Charts**: Recharts and MUI X-Charts
- **Animation**: Framer Motion, AOS (Animate On Scroll)
- **Data Fetching**: TanStack Query (React Query)

### Project Structure

#### Routing (App Router)
- **Public routes**: `/` (landing page)
- **Auth routes**: `/auth/login`, `/auth/register` (dark theme layout)
- **Private routes**: `/beranda`, `/monitoring`, `/pembayaran`, `/profile`, etc. (authenticated with navbar)

#### Key Directories
- `app/(pages)/(auth)/` - Authentication pages with dark background layout
- `app/(pages)/(private)/` - Protected pages with navbar and padding
- `app/components/` - Application-specific components
- `app/layouts/` - Layout providers (AuthProvider, PrivateProvider)
- `app/services/` - API service layers
- `app/store/` - Redux store configuration and slices
- `components/` - Reusable UI components (shadcn/ui style)

#### State Management
- Redux store with auth slice persisted to localStorage
- AuthProvider context for authentication state
- Automatic logout on 401/403 API responses via axios interceptor

#### API Integration
- Base URL configured via `NEXT_PUBLIC_BASE_URL` environment variable
- Centralized API instance in `app/utils/API.ts` with auth interceptors
- Services organized by domain (e.g., `app/services/auth/`)

#### Styling System
- Tailwind CSS with custom font families: Poppins, Inter, Montserrat, Boren, Nasalization
- HSL-based color system with CSS variables
- Custom animations: grid, ripple effects
- Component library integration with both MUI and shadcn/ui

#### Authentication Flow
- Google OAuth integration
- JWT token handling with automatic refresh/logout
- Protected route middleware via layout providers

### Environment Variables Required
- `NEXT_PUBLIC_BASE_URL` - API backend URL
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - Google OAuth client ID

### Development Notes
- Uses TypeScript with strict mode enabled
- Path aliases configured with `@/*` mapping to project root
- PWA-ready with manifest.json and service worker files
- Responsive design with mobile-first approach (evident from mobile navbar)