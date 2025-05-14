# 🐾 Animal Welfare NGO Website - Complete Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Technology Stack](#technology-stack)
3. [Core Goals](#core-goals)
4. [Project Structure](#project-structure)
5. [User-Facing Features](#user-facing-features)
6. [Admin Panel Features](#admin-panel-features)
7. [Technical Architecture](#technical-architecture)
8. [Media Management System](#media-management-system)
9. [Donation System](#donation-system)
10. [Database Schema](#database-schema)
11. [API Reference](#api-reference)
12. [Development Guide](#development-guide)
13. [Deployment](#deployment)
14. [Performance & Security](#performance--security)
15. [Media Integration Guide](#media-integration-guide)
16. [Future Roadmap](#future-roadmap)

---

## Introduction

This document provides comprehensive documentation for the Animal Welfare NGO website. The website is designed to help animal welfare organizations manage their online presence, media, donations, and administrative tasks with a mobile-first approach.

---

## Technology Stack

- **Frontend Framework**: Next.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Deployment**: Render
- **Content Management**: Custom admin panel
- **Responsive Design**: Mobile-first (max 500px width) above 500px width user showing under Maintenance

---

## Core Goals

- Mobile-first design (fixed 500px on wide screens)
- Simple, trustable donation flow (via UPI)
- Easy media management (especially for animal images)
- Smart admin control + optional AI assistance
- Clear calls-to-action: Adopt, Donate, Connect

---

## Project Structure

### Directory Structure

```
animal-welfare-ngo/
├── .next/                  # Next.js build output
├── backup/                 # Backup of old/replaced files
├── docs/                   # Documentation files
├── public/                 # Static assets
│   ├── favicon/            # Favicon files in different sizes
│   └── images/             # Images used throughout the site
├── scripts/                # Utility scripts
├── src/                    # Source code
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   ├── context/            # React context providers
│   ├── services/           # Service layer for API calls
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── .env.local              # Environment variables (not committed)
├── .eslintrc.json          # ESLint configuration
├── README.md               # Project documentation
├── cleanup.sh              # Cleanup script for removing unnecessary files
├── middleware.ts           # Next.js middleware
├── next.config.js          # Next.js configuration
├── package.json            # NPM dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

### Key Directories

#### `/src/app`

Contains the main application pages using Next.js App Router pattern:

- `layout.tsx` - Root layout with common elements (Header, Footer)
- `page.tsx` - Home page
- `/admin/...` - Admin panel routes
- `/api/...` - API routes

#### `/src/components`

Reusable React components organized by feature:

- `/admin/` - Admin panel components
  - Media management components
  - Dashboard components
  - Settings components
- `/common/` - Shared components used across the app
  - `Header.tsx` - Site header with navigation
  - `Footer.tsx` - Site footer
  - `ClientScreenCheck.tsx` - Component to handle mobile-only display
  - Other shared UI components
- `/donation/` - Donation-related components
- `/home/` - Components specific to the home page
  - `Hero.tsx` - Hero section
  - `AnimalCards.tsx` - Featured animals display
  - `SuccessStories.tsx` - Success stories grid
  - `InjuredAnimals.tsx` - Display for injured animals needing help
  - `RecentBlogPosts.tsx` - Blog post previews

#### `/src/context`

React context providers:

- `MediaContext.tsx` - Context for media management

#### `/src/services`

Service layers for API interactions:

- `MediaService.ts` - Service for media-related operations

#### `/src/utils`

Utility functions and helpers:

- `mongodb.ts` - MongoDB connection utilities
- `api.ts` - API helper functions
- `MediaUtils.tsx` - Media-specific utilities

---

## User-Facing Features

| Page | Details |
|------|---------|
| Home | NGO mission, recent success stories, top services |
| Adoption | Animal profiles: name, image, breed, age, status, contact |
| Donation | UPI QR, click-to-pay UPI link, predefined amount buttons |
| Blog & Updates | News, tips, case studies, rescue stories |
| Contact Us | Form (name, email, message), phone number, Google Maps optional |
| Thank You Page | Simple thank you message post-donation or form submission |

---

## Admin Panel Features

### Content Management
- Blog post editor (title, content, image, tags)
- Manage success stories with images and text
- Service category management (add/edit/delete)

### Media Management
- Upload: single or bulk
- Assign to service or animal profile
- If bulk → ask for category
- If no category exists → popup for new one
- Option to view all images:
  - Mark as used in post or unused (catalogue)
  - Change image's category
  - Fill full post form for used image (title, description)

### Donation Settings
- Set UPI ID
- Add/edit predefined amounts
- Upload or regenerate UPI QR code
- Preview donation layout

### NGO Profile Management
- Logo upload and management
- Organization details (name, mission statement, contact info)
- Team member profiles and roles
- Social media links and handles

### Analytics & Marketing
- Facebook Pixel & Google Analytics/Tag Manager code box
- Dashboard: show donation summary, traffic stats (optional phase)

### Optional AI Features
- On uploaded image:
  - Suggest title/content based on image recognition (animals, activities)
  - Extract keywords or auto-fill post data
- Toggle switch in Admin: AI Assist ON/OFF

---

## Technical Architecture

### Architecture Overview

This application follows a modern Next.js architecture using the App Router pattern. It's designed as a single-page application (SPA) with server-side rendering (SSR) for improved SEO and initial load performance.

### App Router Structure

The application uses Next.js App Router for routing:

- Each folder in `/src/app` represents a route
- `page.tsx` files define the content for each route
- `layout.tsx` files define the layout wrapping content
- `loading.tsx` files define loading states
- `error.tsx` files define error handling

### Component Architecture

Components follow a hierarchical structure:

1. **Page Components**: Top-level components that correspond to routes
2. **Feature Components**: Components that implement specific features
3. **Common Components**: Shared UI components used across features

### State Management

- React Context API for global state
- Local component state for UI-specific state
- MongoDB for persistence

---

## Media Management System

### Overview

The centralized media management system provides a complete solution for managing all media assets across the NGO website. It replaces the previously fragmented media handling approach with a unified system that allows administrators to efficiently organize, search, and utilize media files.

### Features

- **Unified Media Library**: Central repository for all images, videos, and documents
- **Advanced Search & Filtering**: Find media by type, tags, categories, and more
- **Usage Analytics**: Track where media is being used across the website
- **Tag Management**: Organize media with consistent tagging
- **Migration Tool**: Easily migrate from the old system to the new one
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Components

1. **MediaContext**: Provides state management for the entire media system
2. **MediaService**: Handles API interactions for CRUD operations
3. **MediaUtils**: Utility functions for common media operations
4. **UI Components**:
   - MediaLibrary: Browse and manage media files
   - MediaAnalytics: View usage statistics and trends
   - MediaTagManager: Organize and standardize tags
   - MediaDashboard: Main interface tying everything together

### Media Upload Flow

1. User selects files through MediaLibrary component
2. Files are processed (resized if needed) using Sharp
3. Media metadata is stored in MongoDB
4. Files are stored in the file system with optimized naming

### Media Context

The MediaContext provides:
- Media items list and filtering
- Category management
- Upload functionality
- Media item updates

```jsx
// Example usage of MediaContext
const { mediaItems, addMediaItem, deleteMediaItem } = useMedia();
```

---

## Donation System

### UPI Payment Flow

1. User selects donation amount
2. UPI QR code is generated with the amount embedded
3. User scans QR code with UPI app
4. Payment confirmation is sent to the server
5. Thank you page is displayed

### Donation Components

- `DonationForm.tsx` - Main donation form
- `UpiQRCode.tsx` - Generates and displays UPI QR code
- `PredefinedAmounts.tsx` - Shows preset donation amounts

---

## Database Schema

### Media Collection
```javascript
{
  id: String,
  name: String,
  url: String,
  type: String,
  size: Number,
  category: String,
  dateCreated: Date,
  status: String,
  metadata: {
    width: Number,
    height: Number,
    // AI-generated fields when enabled
    suggestedTitle: String,
    suggestedKeywords: [String]
  }
}
```

### Animal Collection
```javascript
{
  id: String,
  name: String,
  type: String,
  breed: String,
  age: Number,
  gender: String,
  images: [String], // References to media collection
  description: String,
  status: String, // available, adopted, etc.
  medicalHistory: String,
  dateAdded: Date
}
```

### Post Collection
```javascript
{
  id: String,
  title: String,
  content: String,
  author: String,
  images: [String], // References to media collection
  category: String,
  tags: [String],
  publishDate: Date,
  status: String // draft, published
}
```

---

## API Reference

### Media API
- `GET /api/media` - List all media with filtering options
- `POST /api/media` - Upload new media
- `PUT /api/media/:id` - Update media metadata
- `DELETE /api/media/:id` - Delete media item

### Donation API
- `GET /api/donations` - List donations (admin only)
- `POST /api/donations` - Record new donation
- `GET /api/donations/stats` - Get donation statistics

---

## Development Guide

### Getting Started

This section provides instructions for developers who want to contribute to the Animal Welfare NGO website. It outlines the development workflow, coding standards, and key areas for future development.

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB
- Git

### Initial Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd animal-welfare-ngo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/ngo
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:3000.

### Code Structure and Standards

#### File Naming Conventions

- React components: PascalCase (e.g., `Header.tsx`)
- Utilities and hooks: camelCase (e.g., `useLocalStorage.ts`)
- Pages: lowercase with hyphens for multi-word names (e.g., `thank-you.tsx`)

#### Component Structure

Each component should follow this basic structure:

```tsx
// Imports
import React from 'react';
import { SomeType } from 'types';

// Types
type ComponentProps = {
  prop1: string;
  prop2?: number;
};

// Component
const Component: React.FC<ComponentProps> = ({ prop1, prop2 = 0 }) => {
  // State and hooks
  
  // Helper functions
  
  // Render
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default Component;
```

#### Styling Approach

Use Tailwind CSS utility classes for styling. Keep custom CSS to a minimum.

For complex components, group related Tailwind classes:

```tsx
<div 
  className={`
    px-4 py-2 rounded-lg          // Padding and border
    bg-blue-500 text-white        // Colors
    hover:bg-blue-600 transition   // Interaction
  `}
>
  Content
</div>
```

### Working with MongoDB

#### Connection

MongoDB connection is handled in `src/utils/mongodb.ts`. Use the provided client:

```tsx
import { getMongoDb } from '@/utils/mongodb';

async function getData() {
  const db = await getMongoDb();
  const collection = db.collection('yourCollection');
  return collection.find({}).toArray();
}
```

#### Models

Define data models in the `src/models` directory following this pattern:

```tsx
// src/models/Animal.ts
import { ObjectId } from 'mongodb';

export type Animal = {
  _id?: ObjectId;
  name: string;
  type: string;
  breed: string;
  age: number;
  // other fields
};

// Helper functions for this model
export async function getAnimals() {
  // Implementation
}
```

---

## Deployment

The application is configured for deployment on Render, but can be deployed on any Node.js hosting platform.

### Build Process

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Staging Environment

Before deploying to production, test changes in the staging environment:

```bash
# Deploy to staging
npm run build
npm run deploy:staging
```

### Production Environment

Once verified in staging, deploy to production:

```bash
# Deploy to production
npm run build
npm run deploy:production
```

---

## Performance & Security

### Performance Considerations

- Images are optimized using Sharp
- Static assets are cached
- MongoDB queries are optimized with proper indexes
- Client-side JS is minimized

### Key Metrics to Monitor

- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Total Bundle Size: < 250KB (compressed)
- Server Response Time: < 200ms

### Optimization Techniques

- Use Next.js Image component for all images
- Implement proper code splitting
- Minimize third-party scripts
- Use Server Components where possible
- Implement proper caching strategies

### Security Measures

- API routes are protected with proper authentication
- Admin panel requires secure login
- Environment variables are used for sensitive information
- Input validation on all forms
- MongoDB connection uses TLS

---

## Media Integration Guide

### Step 1: Update Component Imports

Replace old media-related imports with the new context-based approach:

```tsx
// OLD APPROACH
import MediaManager from '../components/admin/MediaManager';
// or
import { someMediaFunction } from '../utils/oldMediaUtils';

// NEW APPROACH
import { useMedia } from '../context/MediaContext';
```

### Step 2: Access Media Context in Components

Use the `useMedia` hook to access all media-related functionality:

```tsx
import React from 'react';
import { useMedia } from '../context/MediaContext';

const YourComponent = () => {
  const { 
    mediaItems, 
    getFilteredMedia, 
    addMediaItem,
    // other functions as needed
  } = useMedia();
  
  // Your component logic
  
  return (
    // Your component JSX
  );
};
```

### Step 3: Replace Media Selection UI

If your component used the old media selector:

```tsx
// OLD APPROACH
<MediaManager 
  onSelect={handleMediaSelect} 
  multiSelect={false} 
/>

// NEW APPROACH
<MediaLibrary 
  onSelect={handleMediaSelect}
  multiSelect={false}
/>
```

### Step 4: Update Media Data Model Usage

The new system uses a consistent data model for all media items. Make sure your component handles the MediaItem type correctly:

```tsx
import { MediaItem } from '../components/admin/MediaManager';

// Example usage
const handleMediaSelect = (selectedMedia: MediaItem) => {
  console.log(selectedMedia.title);
  console.log(selectedMedia.filePath);
  // etc.
};
```

### Step 5: Test Your Integration

After making these changes:

1. Test that media selection works correctly
2. Verify that uploaded media appears in the centralized library
3. Check that all media-related functions behave as expected

### Common Integration Patterns

#### Example 1: Blog Post Editor with Media Selection

```tsx
import React, { useState } from 'react';
import { useMedia } from '../context/MediaContext';
import MediaLibrary from '../components/admin/MediaLibrary';
import { MediaItem } from '../components/admin/MediaManager';

const BlogPostEditor = () => {
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  
  const handleMediaSelect = (media: MediaItem) => {
    setSelectedMedia(media);
    setShowMediaLibrary(false);
  };
  
  return (
    <div>
      {/* Blog post form fields */}
      
      <div>
        <button onClick={() => setShowMediaLibrary(true)}>
          Select Featured Image
        </button>
        
        {selectedMedia && (
          <div>
            <img 
              src={selectedMedia.filePath} 
              alt={selectedMedia.altText || selectedMedia.title} 
              width={200}
            />
            <p>{selectedMedia.title}</p>
          </div>
        )}
      </div>
      
      {showMediaLibrary && (
        <div className="modal">
          <MediaLibrary 
            onSelect={handleMediaSelect}
            allowedTypes={['image/jpeg', 'image/png']}
          />
          <button onClick={() => setShowMediaLibrary(false)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
```

#### Example 2: Displaying Media Analytics

```tsx
import React from 'react';
import { useMedia } from '../context/MediaContext';

const MediaUsageReport = () => {
  const { mediaItems } = useMedia();
  
  // Calculate statistics
  const totalItems = mediaItems.length;
  const imageCount = mediaItems.filter(item => item.fileType === 'image').length;
  const videoCount = mediaItems.filter(item => item.fileType === 'video').length;
  const documentCount = mediaItems.filter(item => item.fileType === 'document').length;
  
  return (
    <div>
      <h2>Media Usage Report</h2>
      <ul>
        <li>Total Media Items: {totalItems}</li>
        <li>Images: {imageCount}</li>
        <li>Videos: {videoCount}</li>
        <li>Documents: {documentCount}</li>
      </ul>
    </div>
  );
};
```

---

## Future Roadmap

### Key Areas for Development

#### 1. Media Management Enhancements

The media management system can be improved with:

- Better caching for media previews
- Integration with cloud storage (AWS S3, etc.)
- Background processing for large uploads
- Image optimization using WebP/AVIF formats

#### 2. Donation System

The donation flow needs these enhancements:

- Payment verification callbacks
- Donation receipt generation and emails
- Recurring donation options
- Campaign-specific donation pages

#### 3. Admin Dashboard

The admin dashboard needs these features:

- Better analytics visualizations
- Export functionality for reports
- User permission levels
- Activity logs

#### 4. AI Features Implementation

To implement the optional AI features:

1. Set up connection to a computer vision API (Google Vision, Azure, etc.)
2. Create middleware for processing uploaded images
3. Implement the toggle in admin settings
4. Add UI components to display and edit AI-generated content

### Development Phases

#### Phase 1: Core Features (Current)
- [x] Basic admin panel
- [x] Media management
- [x] Simple donation flow
- [ ] Blog/content management

#### Phase 2: Enhanced Features
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Social media integration
- [ ] Volunteer management

#### Phase 3: Advanced Features
- [ ] AI-powered content generation
- [ ] Mobile app integration
- [ ] Multi-language support
- [ ] Donor portal

---

## Design Principles

- Max width: 500px across all screens
- Fully responsive below 500px
- Clean layout, large buttons, mobile-first form fields
- Prioritize image galleries for animals and success stories

### Responsive Design Implementation

The application implements a mobile-first approach with a maximum width of 500px. For screens wider than 500px, a maintenance page is shown as per requirements.

This is implemented using:

```jsx
// ClientScreenCheck.tsx - Client-side component for screen size detection
'use client';

import { useEffect, useState } from 'react';
import MaintenancePage from './MaintenancePage';

export default function ClientScreenCheck({ children }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!isMounted) return null;
  if (windowWidth > 500) return <MaintenancePage />;
  
  return <>{children}</>;
}
```

---

## Common Issues and Solutions

### MongoDB Connection Issues

If you encounter MongoDB connection errors:

1. Ensure your MongoDB server is running
2. Check that your connection string in `.env.local` is correct
3. Verify network access to MongoDB (especially if using Atlas)

### Image Optimization Issues

If image optimization fails:

1. Ensure Sharp is installed correctly
2. Check for proper write permissions to temp directories
3. Try limiting concurrent processing for large batches

## Contribution Guidelines

1. Create a feature branch for your changes
2. Follow the coding standards
3. Write tests for new features
4. Update documentation as needed
5. Create a pull request with a clear description

---

*Last updated: May 14, 2025*
