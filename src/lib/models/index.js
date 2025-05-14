import mongoose from 'mongoose';

// NGO Settings Schema
const ngoSettingsSchema = new mongoose.Schema({
  name: String,
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
  donor_name: String,
  donor_phone: String,
  amount: Number,
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
  app_name: String,
  upi_id: String,
  display_name: String,
  qr_code: String,
  active: {
    type: Boolean,
    default: true
  },
  app_logo: String,
  app_color: String,
  display_order: Number
});

// Pages Schema
const pageSchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true
  },
  title: String,
  content: String,
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Services Schema
const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  slug: {
    type: String,
    unique: true
  },
  image: String,
  show_in_menu: {
    type: Boolean,
    default: true
  }
});

// Posts Schema
const postSchema = new mongoose.Schema({
  title: String,
  slug: {
    type: String,
    unique: true
  },
  content: String,
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
  filename: String,
  original_filename: String,
  path: String,
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

// User Schema for Admin Authentication
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

// Initialize models with mongoose
const NGOSettings = mongoose.models.NGOSettings || mongoose.model('NGOSettings', ngoSettingsSchema);
const Donation = mongoose.models.Donation || mongoose.model('Donation', donationSchema);
const UPIDetail = mongoose.models.UPIDetail || mongoose.model('UPIDetail', upiDetailsSchema);
const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

export {
  NGOSettings,
  Donation,
  UPIDetail,
  Page,
  Service,
  Post,
  Media,
  User
};
