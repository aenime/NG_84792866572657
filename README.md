# 🐾 Animal Welfare NGO Website

## Technology Stack
- **Frontend Framework**: Next.js
- **Database : MongoDB
- **Styling**: Tailwind CSS
- **Deployment**: Render 
- **Content Management**: Custom admin panel
- **Responsive Design**: Mobile-first (max 500px width) above 500px width user showing under Maintenance 
 
## ✅ Core Goals
- Mobile-first design (fixed 500px on wide screens)
- Simple, trustable donation flow (via UPI)
- Easy media management (especially for animal images)
- Smart admin control + optional AI assistance
- Clear calls-to-action: Adopt, Donate, Connect

## 📱 User-Facing Features

| Page | Details |
|------|---------|
| Home | NGO mission, recent success stories, top services |
| Adoption | Animal profiles: name, image, breed, age, status, contact |
| Donation | UPI QR, click-to-pay UPI link, predefined amount buttons |
| Blog & Updates | News, tips, case studies, rescue stories |
| Contact Us | Form (name, email, message), phone number, Google Maps optional |
| Thank You Page | Simple thank you message post-donation or form submission |

## 🛠️ Admin Panel Features

### 📄 Content Management
- Blog post editor (title, content, image, tags)
- Manage success stories with images and text
- Service category management (add/edit/delete)

### 🖼️ Media Management
- Upload: single or bulk
- Assign to service or animal profile
- If bulk → ask for category
- If no category exists → popup for new one
- Option to view all images:
  - Mark as used in post or unused (catalogue)
  - Change image's category
  - Fill full post form for used image (title, description)

### 💸 Donation Settings
- Set UPI ID
- Add/edit predefined amounts
- Upload or regenerate UPI QR code
- Preview donation layout

### 🏢 NGO Profile Management
- Logo upload and management
- Organization details (name, mission statement, contact info)
- Team member profiles and roles
- Social media links and handles

### 📊 Analytics & Marketing
- Facebook Pixel & Google Analytics/Tag Manager code box
- Dashboard: show donation summary, traffic stats (optional phase)

## 🧠 Optional AI Features
- On uploaded image:
  - Suggest title/content based on image recognition (animals, activities)
  - Extract keywords or auto-fill post data
- Toggle switch in Admin: AI Assist ON/OFF

## 🎨 Design Principles
- Max width: 500px across all screens
- Fully responsive below 500px
- Clean layout, large buttons, mobile-first form fields
- Prioritize image galleries for animals and success stories
