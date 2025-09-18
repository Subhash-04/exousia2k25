# EXOUSIA 2K25 🎯

A modern, fully responsive React TypeScript application for the EXOUSIA 2K25 tech fest event management system.

## ✨ Features

- **🎬 Splash Screen**: 5-second animated logo display with smooth transitions
- **🏠 Home Screen**: Squid Game-themed animated background with geometric shapes and particles
- **📅 Events Page**: 4 comprehensive tech events with detailed descriptions
- **📝 Event Registration**: Seamless Google Forms integration for event registration
- **📱 Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **🎨 Smooth Animations**: Custom canvas animations, particle effects, and hover transitions
- **🎯 Modern UI/UX**: Clean, intuitive interface with accessibility features

## Events

1. **Circuit Carnival** (Day 1) - Electrical engineering board game
2. **Watt-A-Fight** (Day 1) - Team strategy challenge (up to 5 members)
3. **Eliminators Arena** (Day 2) - Batch vs batch competition
4. **Code Breaker** (Day 2) - Programming/logic challenge for CSE/ECE

## Technology Stack

- React 19.1.1
- TypeScript 4.9.5
- CSS3 with animations
- Canvas API for particle effects
- Google Forms integration

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Registration

When users click the "Register" button on any event, they will be redirected to the Google Form:
https://forms.gle/3cxHh6MkqKRZm9V96

## Project Structure

```
src/
├── components/          # React components
│   ├── AnimatedBackground.tsx
│   ├── EventCard.tsx
│   ├── EventsPage.tsx
│   ├── HomeScreen.tsx
│   └── SplashScreen.tsx
├── data/               # Static data
│   └── events.ts
├── types/              # TypeScript type definitions
│   └── Event.ts
├── App.tsx             # Main app component
└── index.tsx           # Entry point
```

## 🎨 Design

The application features a Squid Game-inspired design with:
- **Black splash screen** with prominent event logo and IEI branding
- **Red/pink gradient backgrounds** with animated geometric shapes and particles
- **Smooth transitions** and hover effects throughout the interface
- **Particle animations** on event cards for enhanced interactivity
- **Fully responsive layout** optimized for all screen sizes (desktop to mobile)
- **Accessibility-compliant** touch targets and readable typography

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+ (Full layout with large elements)
- **Tablet**: 768px-1024px (Optimized for touch interaction)
- **Mobile**: 480px-768px (Stacked layout, larger touch targets)
- **Small Mobile**: 360px-480px (Compact design, essential content)
- **Very Small**: <360px (Minimal but functional layout)

## 🚀 Live Demo

Visit the live application: [EXOUSIA 2K25](https://your-deployment-url.com)

## 📸 Screenshots

### Desktop View
- Splash screen with event logo
- Home screen with animated background
- Events page with responsive cards

### Mobile View
- Optimized layout for small screens
- Touch-friendly interface
- Maintained functionality across devices