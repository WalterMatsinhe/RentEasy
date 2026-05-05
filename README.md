# RentEasy - Property Management Platform

A modern, fast, and scalable property management application built with React, Vite, and Tailwind CSS.

## Features

- 🏠 Property Listing & Management
- 🔍 Advanced Search & Filtering
- 💰 Price Management
- 📱 Responsive Design
- ⚡ Fast Performance with Vite
- 🎨 Beautiful UI with Tailwind CSS
- 🔐 Type-Safe with TypeScript

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # UI components (Button, Card, etc.)
│   └── layout/         # Layout components (Header, Footer)
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── assets/             # Static assets (images, icons)
├── styles/             # Global styles
└── main.tsx            # Application entry point
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local .env.local
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## Architecture & Best Practices

### Component Organization
- **UI Components** (`src/components/ui/`) - Reusable, stateless components
- **Layout Components** (`src/components/layout/`) - Page structure components
- **Pages** (`src/pages/`) - Page-level components with routing

### Type Safety
- All components use TypeScript interfaces
- Custom types in `src/types/`
- Strict TypeScript configuration

### State Management
- React Hooks for local state (useState)
- Custom hooks for shared logic (useLocalStorage)
- Plan: Consider Redux or Zustand for global state

### Styling
- Tailwind CSS for utility-first styling
- Custom component classes in `src/styles/index.css`
- Consistent color scheme in `tailwind.config.js`

### Performance
- Lazy loading with React.lazy()
- Memoization with useMemo/useCallback
- Vite for fast HMR and builds

## Next Steps

1. **Set up API Integration**
   - Replace mock data with API calls
   - Create API client utilities

2. **Add Authentication**
   - Implement login/register pages
   - Add JWT token handling
   - Create auth context/provider

3. **Enhance Components**
   - Add more UI components
   - Create form components
   - Add validation

4. **Add Testing**
   - Set up Vitest
   - Write unit tests
   - Add E2E testing with Cypress

## Environment Variables

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

For more information, see the [Vite](https://vitejs.dev) and [React](https://react.dev) documentation.
