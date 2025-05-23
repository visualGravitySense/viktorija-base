# Marketing Website Template

A modern, responsive marketing website template built with React, TypeScript, and Material UI.

## Overview

This project is a starter template for creating marketing websites, based on the [Material UI Marketing Template](https://mui.com/material-ui/getting-started/templates/). It includes:

- Responsive design with mobile-first approach
- Dark and light mode support
- Modern UI components from Material UI
- TypeScript for type safety
- Vite for fast development and building

## Features

- 🎨 Customizable theme with light/dark mode
- 📱 Fully responsive layout
- ⚡ Fast development with Vite
- 🔒 Type-safe with TypeScript
- 🎯 SEO-friendly structure
- 🎭 Modern UI components
- 📦 Easy to customize and extend

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Create a `.env` file in the root directory:
```env
VITE_TEMPLATE_IMAGE_URL=https://mui.com
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── marketing-page/     # Marketing page components
│   └── shared-theme/       # Theme customization
├── pages/                  # Page components
└── App.tsx                 # Main application component
```

## Customization

### Theme

The theme can be customized in `src/components/shared-theme/`:
- `themePrimitives.ts` - Base theme configuration
- `AppTheme.tsx` - Theme provider component

### Images

Update the `VITE_TEMPLATE_IMAGE_URL` in `.env` to use your own image URLs.

## Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on the [Material UI Marketing Template](https://mui.com/material-ui/getting-started/templates/)
- Uses Material UI components and styling system
