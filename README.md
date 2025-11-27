# Houston Spartans Official Website

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-green?logo=supabase)](https://supabase.com/)

The official website for Houston Spartans - a family-run esports organization dedicated to empowering players and building a strong gaming community in Houston, Texas.

🌐 **Live Site:** [houstonspartans.com](https://houstonspartans.com)

---

## 🎮 About Houston Spartans

Founded in 2023 as a tribute to "Spart," the Houston Spartans support aspiring players in achieving their dreams of breaking into professional esports. As a family-owned organization, we foster a close-knit community where everyone is welcomed as part of the Spartan Nation.

---

## ✨ Features

### 🏠 **Home & About**

- Hero sections with dynamic content
- Organization history and mission
- Team owner profiles with social links
- Brand values and community focus
- Real-time Twitch stream integration

### 📰 **News & Blog**

- Dynamic blog system with rich text editor (TipTap)
- Article management dashboard (admin-only)
- Categories, tags, and featured posts
- Reading time estimation
- Social sharing (Twitter, Discord, Facebook)
- SEO-optimized slugs

### 👥 **Teams**

- Team roster display
- Player profiles with roles
- Social media integration
- Staff directory

### 🎨 **Content Creator Program**

- Inclusive creator recruitment
- Application form with email notifications (Resend API)
- Program benefits and requirements
- Social platform integration

### 🤝 **Partners & Sponsors**

- Partner showcase
- Sponsorship opportunities
- Collaboration information

### 🔐 **Admin Dashboard**

- Secure authentication (Supabase Auth)
- News article CRUD operations
- Rich text editor with image uploads
- User management
- Role-based access control

### 📡 **Twitch Integration**

- Live stream status detection (Twitch API)
- Embedded stream player
- Real-time viewer count
- Game/category display
- Offline state with VOD links

### 📄 **Legal & Compliance**

- Terms & Conditions
- Privacy Policy
- FAQ page
- GDPR-friendly data handling

---

## 🛠️ Tech Stack

### **Core**

- **Framework:** Next.js 15.4 (App Router)
- **Language:** TypeScript 5.x
- **UI Library:** React 19.1
- **Styling:** CSS Modules + Tailwind CSS 4

### **Backend & Database**

- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage (for images)

### **External Services**

- **Email:** Resend API
- **Streaming:** Twitch API
- **Analytics:** (Ready for integration)

### **Rich Text Editor**

- **TipTap** with extensions:
  - Text styling (bold, italic, underline)
  - Colors and highlights
  - Links and images
  - Code blocks
  - Lists and tables

### **Development Tools**

- **Linting:** ESLint (Next.js config)
- **Formatting:** Prettier
- **Git Hooks:** Husky + lint-staged
- **Package Manager:** npm

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm or yarn
- Supabase account
- Twitch Developer account (for stream integration)
- Resend account (for email)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adamsmithdev/houston-spartans.git
   cd houston-spartans
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Resend (Email)
   RESEND_API_KEY=your_resend_api_key
   CONTACT_EMAIL=your_contact_email

   # Twitch API
   TWITCH_CLIENT_ID=your_twitch_client_id
   TWITCH_CLIENT_SECRET=your_twitch_client_secret
   ```

4. **Run database migrations:**
   - Import the SQL schema from `/supabase/migrations` into your Supabase project
   - Set up Row Level Security (RLS) policies

5. **Run the development server:**

   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

---

## 📁 Project Structure

```
houston-spartans/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   ├── about/             # About page
│   │   ├── apply/             # Creator application
│   │   ├── contact/           # Contact page
│   │   ├── news/              # Blog/news section
│   │   ├── teams/             # Teams page
│   │   ├── partners/          # Partners page
│   │   └── ...                # Other pages
│   ├── components/
│   │   ├── admin/             # Admin-only components
│   │   ├── cards/             # Card components
│   │   ├── common/            # Shared components
│   │   ├── forms/             # Form components
│   │   ├── icons/             # Custom SVG icons
│   │   ├── layout/            # Layout components
│   │   ├── sections/          # Page sections
│   │   └── ui/                # UI primitives
│   ├── constants/             # Constants & config
│   ├── contexts/              # React contexts
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilities & helpers
│   │   ├── auth/              # Auth utilities
│   │   ├── supabase/          # Supabase clients
│   │   ├── transforms/        # Data transformers
│   │   └── validators/        # Validation logic
│   ├── styles/                # Global styles
│   ├── types/                 # TypeScript types
│   └── utils/                 # Helper functions
├── public/
│   └── images/                # Static images
├── supabase/                  # Database migrations
├── .env.local.example         # Environment template
└── README.md                  # This file
```

---

## 🔧 Available Scripts

```bash
npm run dev          # Start development server (with Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting
```

---

## 🏗️ Key Features Implementation

### **News Management System**

- Admin dashboard with CRUD operations
- TipTap rich text editor
- Image upload and management
- Category/tag system
- SEO-friendly slugs
- Draft/publish workflow

### **Twitch Live Stream Integration**

- Custom `useTwitchStream` hook
- Real-time status polling (2-minute intervals)
- Embedded Twitch player
- Live/offline state management
- Viewer count and game display
- Configurable channel settings

### **Authentication & Authorization**

- Supabase Auth integration
- Protected admin routes
- Role-based access control
- Secure API endpoints
- User profile management

### **Email Notifications**

- Contact form submissions
- Creator program applications
- HTML email templates
- Error handling and validation

---

## 🎨 Design System

### **Colors**

- **Primary Red:** `#bc1616`
- **Background:** `#0a0a0a` - `#1a1a1a`
- **Text:** `#ffffff`, `#cccccc`, `#b5a5a5`

### **Typography**

- **Font:** System fonts + custom web fonts
- **Heading Styles:** Bold, uppercase, large letter-spacing
- **Highlight Color:** Red accent on headings

### **Components**

- Modular CSS Modules architecture
- Reusable UI components
- Consistent spacing and layout
- Responsive breakpoints (768px, 968px)

---

## 🚢 Deployment

### **Recommended Platform: Vercel**

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### **Environment Variables Checklist:**

- ✅ Supabase credentials
- ✅ Resend API key
- ✅ Twitch API credentials
- ✅ Contact email

### **Production Considerations:**

- Enable Edge Functions for API routes
- Configure custom domain
- Set up analytics
- Enable error tracking (Sentry/similar)

---

## 🤝 Contributing

This is a private project for Houston Spartans. For questions or suggestions, please contact the development team.

---

## 📝 License

© 2025 Houston Spartans. All rights reserved.

---

## 👨‍💻 Developer

**Website by [Adam Smith](https://adamsmith.tech)**

Built with Next.js, TypeScript, and modern web technologies.

---

## 📞 Contact

- **Website:** [houstonspartans.com](https://houstonspartans.com)
- **Email:** Contact form on website
- **Social Media:**
  - [Twitter/X](https://x.com/HTownSpartansGG)
  - [Instagram](https://www.instagram.com/htownspartansgg/)
  - [Facebook](https://www.facebook.com/TheHoustonSpartans)
  - [Linktree](https://linktr.ee/HoustonSpartans)

---

**Built with ❤️ for the Spartan Nation**
