# Animal Welfare NGO Website - Project Documentation

## 1. Introduction

This document outlines the features and structure for a website designed for an Animal Welfare Non-Governmental Organization (NGO). The platform will facilitate donations, showcase the NGO's work through posts and media, and provide a comprehensive admin panel for managing content and operations.

## 2. Core Features

- **Public-facing Site**: Information about the NGO, its mission, and how to help
- **Donation System**: Secure online donations via credit card, PayPal, etc.
- **Content Management**: Admin panel to manage posts, media, and donations
- **User Authentication**: Secure login for admin and potentially donors
- **Dynamic Theming**: Customizable appearance based on NGO branding

## 3. Dynamic Content and Theming

The website will feature dynamic content such as blog posts, media galleries, and donation records. Theming will be dynamic, allowing the NGO to customize the site's appearance.

## 4. Technical Implementation with Next.js

### 4.1. Project Structure

```
animal-welfare-ngo/
├── public/
│   ├── favicon.ico
│   ├── images/
│   └── uploads/  (optional local storage for development)
├── src/
│   ├── app/
│   │   ├── page.js                 # Home page
│   │   ├── donate/
│   │   │   └── page.js             # Donation page
│   │   ├── posts/
│   │   │   ├── page.js             # All posts
│   │   │   └── [slug]/page.js      # Single post
│   │   ├── about/
│   │   │   └── page.js             # About Us page
│   │   ├── privacy-policy/
│   │   │   └── page.js             # Privacy Policy page
│   │   ├── terms-conditions/
│   │   │   └── page.js             # Terms & Conditions page
│   │   ├── admin/
│   │   │   ├── page.js             # Admin dashboard
│   │   │   ├── donors/page.js      # Donor management
│   │   │   ├── media/page.js       # Media management
│   │   │   ├── posts/page.js       # Posts management
│   │   │   ├── services/page.js    # Services management
│   │   │   ├── payment-settings/
│   │   │   │   └── page.js         # Payment settings (UPI, etc.)
│   │   │   └── profile/page.js     # NGO profile management
│   │   └── layout.js               # Root layout
│   ├── components/
│   │   ├── common/                 # Shared components
│   │   │   ├── Navigation.jsx      # Main navigation menu
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   └── PostCard.jsx        # Standardized post design component
│   │   ├── admin/                  # Admin panel components
│   │   ├── donation/               # Donation components
│   │   └── home/                   # Home page components
│   ├── lib/
│   │   ├── db.js                   # Database connection
│   │   └── utils.js                # Utility functions
│   ├── hooks/
│   │   └── useNGOData.js           # Custom hook for NGO data
│   └── styles/
│       └── globals.css             # Global styles
├── prisma/                         # Database schema (if using Prisma)
│   └── schema.prisma
├── middleware.js                   # Next.js middleware for admin protection
├── .env                            # Environment variables
├── .env.local                      # Local environment variables
├── next.config.js                  # Next.js configuration
└── package.json                    # Project dependencies
```

### 4.2. Key Next.js Features Implementation

#### 4.2.1. Frontend (App Router)
- **App Router**: Using Next.js 13+ App Router for routing and layouts
- **Server Components**: Leverage React Server Components for improved performance
- **Client Components**: Use client components for interactive elements
- **Static Site Generation (SSG)**: For public pages like home, services listings
- **Incremental Static Regeneration (ISR)**: For posts that update periodically  
- **Server Actions**: For form submissions and data mutations

#### 4.2.2. Backend Features
- **API Routes**: Build serverless API endpoints in `app/api/` for:
  - Donation record management (status tracking only, not processing)
  - Media upload/management
  - Post CRUD operations
  - Service management
  - NGO profile management
  - Authentication

#### 4.2.3. Database and Storage
- **Database**: MongoDB for flexible document-based storage
  - Use Mongoose ODM for schema validation and data modeling
  - Implement MongoDB Atlas for cloud-hosted solution
- **Media Storage**: 
  - Development: Local file system with Next.js public directory
  - Production: Cloud storage like AWS S3, Cloudinary, or Vercel Blob Storage
  
#### 4.2.4. Authentication
- **NextAuth.js**: For secure admin authentication
- **Middleware**: Protect admin routes from unauthorized access

#### 4.2.5. Forms and Validation
- **React Hook Form**: For form handling
- **Zod**: For schema validation

### 4.3. Key Implementation Details

#### Services Display
- Services created in the admin panel will automatically display in the main navigation menu
- Each service will have its own dedicated page with relevant content and media
- Services will be stored in the database and dynamically fetched for display

#### Standardized Post Design
- A reusable `PostCard` component will be created that maintains consistent design across the site
- The component will display:
  - Featured image
  - Title
  - Brief excerpt
  - Publication date
  - Category/service tag
- The same component will be used on the home page, post listing pages, and related posts sections

#### Payment Integration
- **UPI Payment Flow**:
  - No backend payment processing - direct redirection to mobile payment apps
  - **Separate UPI Configuration for Each Payment App**:
    - Admin panel will have dedicated sections for each payment app (Google Pay, PhonePe, Paytm)
    - Each app configuration includes:
      - UPI ID specific to that app
      - Custom display name for that app
      - QR code upload specifically for that app
      - Toggle to enable/disable individual payment apps
  - **Payment Selection UI**:
    - Donation page will display separate buttons/cards for each enabled payment app
    - Each payment option will be visually distinct with the app's logo and branding
    - When user selects a specific app (e.g., Google Pay):
      - They see only the UPI details and QR code for Google Pay
      - Deep link is configured specifically for the selected app
  - When user initiates donation:
    1. User first enters donation amount and personal details
    2. User then selects their preferred payment app from the options
    3. System displays the QR code and UPI ID specific to the selected app
    4. User is redirected to the selected mobile app with pre-filled UPI details
    5. Transaction is recorded as "pending" in the system
    6. Admin manually verifies payments received to their UPI accounts
    7. Admin sends manual confirmation message to users
    8. Admin updates transaction status in the admin panel
  - System will maintain a log of all pending and confirmed donations
  - Donation summary dashboard will show pending vs. confirmed transactions

#### Manual Payment Verification Process
- Admin dashboard will prominently display pending donations that need verification
- Each pending donation will include:
  - Transaction date and time
  - Donor details (name, contact information)
  - Amount
  - Reference ID (if provided by donor)
- Admin will have options to:
  - Mark donation as "Verified"
  - Send confirmation message to donor
  - Request additional information from donor
  - Cancel/reject the donation record

#### Static Pages
- **About Us Page**: Information about the NGO, its mission, team, and history
- **Privacy Policy Page**: Detailed privacy policy to comply with data protection regulations
- **Terms & Conditions Page**: Rules, regulations, and terms of service
- These pages will be editable from the admin panel using a rich text editor

#### Database Schema Updates
- MongoDB Collections:
  - `donations`: Document structure for donation records
    - `_id`: MongoDB ObjectId
    - `donor_name`: String
    - `donor_phone`: String
    - `amount`: Number
    - `reference_id`: String (optional)
    - `status`: String ("pending", "verified", "cancelled")
    - `admin_notes`: String
    - `created_at`: Date
    - `verified_at`: Date
  - `upi_details`: Document structure for UPI payment information
    - `_id`: MongoDB ObjectId
    - `app_name`: String (e.g., "Google Pay", "PhonePe")
    - `upi_id`: String
    - `display_name`: String
    - `active`: Boolean
  - `pages`: Document structure for static page content
    - `_id`: MongoDB ObjectId
    - `slug`: String
    - `title`: String
    - `content`: String (rich text)
    - `updated_at`: Date
  - `services`: Document structure for services
    - `_id`: MongoDB ObjectId
    - `title`: String
    - `description`: String
    - `slug`: String
    - `image`: String (URL)
    - `show_in_menu`: Boolean

## 5. Development and Deployment

### 5.1. Development Environment
- Node.js 18+ and npm/yarn/pnpm
- MongoDB:
  - Local MongoDB instance for development
  - MongoDB Atlas account for staging/production
- Environment variables for sensitive information

### 5.2. Deployment Options
- **Vercel**: Preferred platform for Next.js applications
- **Alternatives**: Netlify, AWS Amplify, or self-hosted on a Node.js server

### 5.3. CI/CD
- GitHub Actions or similar for automated testing and deployment
- Environment-specific configuration for staging and production

## 6. Future Enhancements

- Progressive Web App (PWA) functionality
- Email notification system for new donations
- Integration with social media APIs for automatic post sharing
- Advanced reporting and analytics dashboard
- SMS notifications for donation confirmation
- Multi-language support for international reach

## 7. Database Schema Implementation Guide with MongoDB Compass

##### 1. Installing and Setting Up MongoDB Compass

1. **Download MongoDB Compass**:
   - Visit [MongoDB Compass download page](https://www.mongodb.com/try/download/compass)
   - Choose your operating system and download the installer
   - Follow the installation instructions

2. **Connect to MongoDB**:
   - Open MongoDB Compass
   - Use the connection string format: `mongodb+srv://username:password@cluster0.example.mongodb.net/`
   - Click "Connect"

3. **Create the Database**:
   - Click "Create Database"
   - Database Name: `animal-welfare-db`
   - Collection Name: `ngo_settings` (first collection to create)
   - Click "Create Database"

##### 2. Creating Collections and Document Structures

**Collection: `ngo_settings`**

1. Click on the database name (`animal-welfare-db`)
2. Click "CREATE COLLECTION"
3. Enter collection name: `ngo_settings`
4. Click "Create"
5. Click on the collection to view it
6. Click "ADD DATA" → "Insert Document"
7. Add the following JSON structure:
```json
{
  "name": "Animal Welfare NGO",
  "logo": "/images/logo.png",
  "address": "123 Main Street, City, Country",
  "phone": "+1234567890",
  "email": "contact@example.org",
  "colors": {
    "main": "#4CAF50",
    "base": "#FFFFFF",
    "secondary": "#2196F3"
  },
  "social_media": {
    "facebook": "https://facebook.com/example",
    "twitter": "https://twitter.com/example"
  }
}
```
8. Click "Insert"

**Repeat the process for each of the following collections:**

**Collection: `donations`**

Document structure:
```json
{
  "donor_name": "John Doe",
  "donor_phone": "+1234567890",
  "amount": 1000,
  "reference_id": "UPI123456",
  "status": "pending",
  "admin_notes": "",
  "created_at": {"$date": "2023-07-15T10:30:00Z"},
  "verified_at": null
}
```

**Collection: `upi_details`**

Document structure:
```json
{
  "app_name": "Google Pay",
  "upi_id": "example@gpay",
  "display_name": "Animal Welfare - GPay",
  "qr_code": "/uploads/qr-codes/gpay.png",
  "active": true,
  "app_logo": "/images/payment-icons/gpay.png",
  "app_color": "#4285F4",
  "display_order": 1
}
```

Example documents for different payment apps:
```json
{
  "app_name": "PhonePe",
  "upi_id": "example@ybl",
  "display_name": "Animal Welfare - PhonePe",
  "qr_code": "/uploads/qr-codes/phonepe.png",
  "active": true,
  "app_logo": "/images/payment-icons/phonepe.png",
  "app_color": "#5f259f",
  "display_order": 2
}
```

```json
{
  "app_name": "Paytm",
  "upi_id": "example@paytm",
  "display_name": "Animal Welfare - Paytm",
  "qr_code": "/uploads/qr-codes/paytm.png",
  "active": true,
  "app_logo": "/images/payment-icons/paytm.png",
  "app_color": "#00BAF2",
  "display_order": 3
}
```

**Collection: `pages`**

Document structure:
```json
{
  "slug": "about-us",
  "title": "About Us",
  "content": "<h1>About Our NGO</h1><p>We are dedicated to animal welfare...</p>",
  "updated_at": {"$date": "2023-07-10T14:20:00Z"}
}
```

**Collection: `services`**

Document structure:
```json
{
  "title": "Animal Rescue",
  "description": "We provide emergency rescue services for injured animals.",
  "slug": "animal-rescue",
  "image": "/uploads/services/rescue.jpg",
  "show_in_menu": true
}
```

**Collection: `posts`**

Document structure:
```json
{
  "title": "Recent Rescue Operation",
  "slug": "recent-rescue-operation",
  "content": "<p>Our team successfully rescued 5 dogs from...</p>",
  "featured_image": "/uploads/posts/rescue-operation.jpg",
  "author": "Admin",
  "published_at": {"$date": "2023-07-05T09:15:00Z"},
  "tags": ["rescue", "dogs"],
  "is_published": true
}
```

**Collection: `media`**

Document structure:
```json
{
  "filename": "dog-rescue.jpg",
  "original_filename": "IMG_12345.jpg",
  "path": "/uploads/media/dog-rescue.jpg",
  "type": "image/jpeg",
  "size": 1024000,
  "service_id": {"$oid": "60d21b4667d0d8992e610c85"},
  "uploaded_at": {"$date": "2023-07-01T11:30:00Z"}
}
```

##### 3. Creating Indexes for Better Performance

For each collection, create appropriate indexes:

**Collection: `donations`**
1. Click on the collection
2. Click "Indexes" tab
3. Click "CREATE INDEX"
4. Field name: `status`, Index type: `1` (ascending)
5. Click "Create"
6. Repeat for `created_at` field

**Collection: `posts`**
1. Create index on `slug` field (for faster lookups)
2. Create index on `published_at` field (for sorting)

**Collection: `services`**
1. Create index on `slug` field
2. Create index on `show_in_menu` field

##### 4. Basic Queries in MongoDB Compass

**Find all pending donations:**
1. Navigate to `donations` collection
2. Click "FILTER" field
3. Enter: `{ "status": "pending" }`
4. Click "Find"

**Find recent posts:**
1. Navigate to `posts` collection
2. Click "FILTER" field
3. Enter: `{ "is_published": true }`
4. Click "SORT" field
5. Enter: `{ "published_at": -1 }`
6. Click "Find"

**View services in menu:**
1. Navigate to `services` collection
2. Click "FILTER" field
3. Enter: `{ "show_in_menu": true }`
4. Click "Find"

##### 5. Data Export and Import

**Exporting Data:**
1. Click on a collection
2. Click "Collection" dropdown in the menu bar
3. Select "Export Collection"
4. Choose format (JSON, CSV) and file location
5. Click "Export"

**Importing Data:**
1. Click on a collection
2. Click "Collection" dropdown in the menu bar
3. Select "Import Data"
4. Choose your file
5. Click "Import"

##### 6. Updating Documents

**Update NGO Settings:**
1. Navigate to `ngo_settings` collection
2. Find the document
3. Click the edit icon (pencil)
4. Make changes to the JSON
5. Click "Update"

**Mark a Donation as Verified:**
1. Navigate to `donations` collection
2. Find the document with filter `{ "status": "pending", "donor_name": "John Doe" }`
3. Click the edit icon
4. Change `"status": "pending"` to `"status": "verified"`
5. Set `"verified_at"` to current date using `{"$date": "YYYY-MM-DDTHH:MM:SSZ"}`
6. Click "Update"

##### 7. UPI Payment Implementation Details

**Admin UI for UPI Configuration:**

1. **Payment Settings Page Structure**:
   - Top section: Global payment settings (enable/disable all UPI payments, default messages)
   - App-specific sections: Separate configuration cards for each payment app
   
2. **Per-App Configuration Interface**:
   - Each payment app has its own form section:
     - App name (fixed: "Google Pay", "PhonePe", "Paytm")
     - UPI ID field specific to that app
     - Display name field
     - QR Code upload
     - Toggle to enable/disable just this specific app
     - Display order number (to control the order of appearance)
     - Color picker for app-specific styling (optional)

3. **Donation Page Implementation**:
   - Step 1: User enters donation amount and personal details
   - Step 2: User sees payment method selection with separate cards for each UPI option
   - Each card displays:
     - App logo and name
     - Custom styling based on the app's brand color
   - Step 3: After selecting a specific payment app, user sees:
     - Only the QR code for the selected app
     - UPI ID for manual entry
     - "Pay Now" button that opens the selected app
     - Option to go back and choose a different payment method

4. **Deep Link Implementation for Each App**:
   - **Google Pay**: `upi://pay?pa=[UPI_ID]&pn=[NAME]&am=[AMOUNT]&cu=INR&tn=[REFERENCE]`
   - **PhonePe**: `phonepe://pay?pa=[UPI_ID]&pn=[NAME]&am=[AMOUNT]&cu=INR&tn=[REFERENCE]`
   - **Paytm**: `paytmmp://pay?pa=[UPI_ID]&pn=[NAME]&am=[AMOUNT]&cu=INR&tn=[REFERENCE]`
   
   **Dynamic QR Code Generation**:
   - Generate QR codes dynamically that embed:
     - UPI ID from database
     - Exact donation amount entered by user
     - NGO name as payee name
     - Reference ID for transaction tracking
   - Use a library like `qrcode` to generate QR codes on-the-fly
   - QR codes will update automatically when amount changes
   - Each payment app gets a separate generated QR code with its specific UPI ID
   
   **QR Code Download Options**:
   - Include "Download QR Code" button next to each payment option
   - Allow users to download QR as PNG image with app name and amount in filename
   - Include "Share QR Code" functionality for mobile devices
   - Provide an option to "Print QR Code" for physical reference
   - When generating downloadable QR codes, include:
     - NGO logo as an overlay or watermark
     - Amount and payment reference details printed below the QR
     - Simple instructions for how to use the QR code

5. **Fallback Mechanisms**:
   - If deep linking fails, display clear instructions for manual payment
   - Prominently show QR code that can be scanned with any UPI app
   - Display reference ID that user should include in their payment