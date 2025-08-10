# Authentication System

This app now includes a complete authentication system with the following features:

## Structure
- `app/auth/login.tsx` - Login screen
- `app/auth/register.tsx` - Registration screen  
- `app/(tabs)/profile.tsx` - User profile screen
- `context/AuthContext.tsx` - Authentication context and state management

## Features
- Mock authentication (no real backend required)
- Protected routes - redirects to login if not authenticated
- Tab navigation between Home and Profile for authenticated users
- TailwindCSS styling with NativeWind
- TypeScript support with proper types

## Usage
1. Start the app with `npm start`
2. You'll be redirected to the login screen
3. Enter any email and password to login (mock authentication)
4. Navigate between Home and Profile tabs
5. Use the logout button in Profile to return to login

## Authentication Flow
- Unauthenticated users are redirected to `/auth/login`
- Authenticated users can access `/(tabs)` routes
- Login/Register forms include validation
- User state is managed through React Context