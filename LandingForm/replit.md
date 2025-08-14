# Overview

This is a modern full-stack web application built with React and Express, featuring a landing page with contact form functionality. The application follows a monorepo structure with separate client and server directories, sharing common schemas and types. It's designed as a business landing page called "ConnectPro" that allows visitors to submit contact information through a form.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for client-side routing

## Backend Architecture  
- **Framework**: Express.js with TypeScript
- **Data Storage**: Currently using in-memory storage with MemStorage class, but configured for PostgreSQL via Drizzle ORM
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas shared between client and server
- **API Design**: RESTful endpoints with JSON responses

## Database Schema
The application defines two main entities:
- **Users**: Basic user management with username/password fields
- **Contacts**: Contact form submissions with name, email, phone, and timestamp
- Uses PostgreSQL with UUID primary keys and proper indexing

## Development Environment
- **Build System**: Vite for frontend bundling with React plugin
- **Development Server**: Express server with Vite middleware integration
- **Hot Module Replacement**: Enabled in development mode
- **Type Safety**: Full TypeScript support across client, server, and shared code

## Project Structure
- `client/` - React frontend application
- `server/` - Express backend API
- `shared/` - Common schemas and types used by both client and server
- Monorepo setup with path mapping for clean imports

# External Dependencies

## Database
- **Neon Database**: PostgreSQL database provider (@neondatabase/serverless)
- **Connection**: Uses DATABASE_URL environment variable
- **Migration**: Drizzle Kit for schema migrations

## UI Framework
- **shadcn/ui**: Complete UI component library with Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Custom typography (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)

## Form & Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library for type-safe data validation
- **zod-validation-error**: Better error messages from Zod validation

## Development Tools
- **Replit Integration**: Custom plugins for Replit development environment
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

## HTTP Client
- **Fetch API**: Native browser fetch for API requests
- **TanStack React Query**: Server state management with caching and synchronization