import mongoose from 'mongoose';

// NGO Settings Schema
const ngoSettingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  address: String,
  phone: String,
  email: String,
  colors: {
    main: String,
    base: String,
    secondary: String
  },
  social_media: {
    facebook: String,
    twitter: String,
    instagram: String
  }
});

// Donations Schema
const donationSchema = new mongoose.Schema({
  donor_name: { type: String, required: true },
  donor_phone: { type: String, required: true },
  amount: { type: Number, required: true },
  reference_id: String,
  status: {
    type: String,
    enum: ['pending', 'verified', 'cancelled'],
    default: 'pending'
  },
  admin_notes: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  verified_at: Date
});

// UPI Details Schema
const upiDetailsSchema = new mongoose.Schema({
  app_name: { type: String, required: true },
  upi_id: { type: String, required: true },
  display_name: { type: String, required: true },
  qr_code: String,
  active: {
    type: Boolean,
    default: true
  },
  app_logo: String,
  app_color: String,
  display_order: { type: Number, default: 0 }
});

// Pages Schema
const pageSchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: true
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Services Schema
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  image: String,
  show_in_menu: {
    type: Boolean,
    default: true
  }
});

// Posts Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  content: { type: String, required: true },
  featured_image: String,
  author: String,
  published_at: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  is_published: {
    type: Boolean,
    default: false
  }
});

// Media Schema
const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  original_filename: String,
  path: { type: String, required: true },
  type: String,
  size: Number,
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  uploaded_at: {
    type: Date,
    default: Date.now
  }
});

// User Schema (for admin authentication)
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Initialize models with mongoose, checking if they already exist
export const NGOSettings = mongoose.models.NGOSettings || mongoose.model('NGOSettings', ngoSettingsSchema);
export const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);
export const UPIDetail = mongoose.models.UPIDetail || mongoose.model('UPIDetail', upiDetailsSchema);
export const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);
export const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);
