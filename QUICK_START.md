# Quick Start Guide

## 🚀 See Your Blog Right Now!

### Step 1: Start the Development Server

The server should already be running! If not, run:
```bash
npm run dev
```

### Step 2: Open Your Browser

Visit: **http://localhost:3000**

### What You'll See:

#### Without Database Setup:
- ✅ Beautiful homepage layout
- ✅ Navigation menu
- ✅ "No posts yet" message
- ✅ Clean, minimalist design
- ⚠️ Posts won't load (database not connected yet)

#### With Database Setup:
- ✅ All published posts
- ✅ Post cards with titles, excerpts, dates
- ✅ Full blog functionality

## 📋 To See Full Functionality:

### Option A: Quick Preview (UI Only)
1. Open http://localhost:3000
2. You'll see the beautiful homepage design
3. Navigate to `/about` to see the about page
4. Check `/admin/login` to see the login page

### Option B: Full Setup (With Database)
1. **Set up Supabase:**
   - Create account at https://supabase.com
   - Create new project
   - Copy your project URL and API keys

2. **Create `.env.local` file:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Set up database:**
   - Go to Supabase SQL Editor
   - Run `supabase/schema.sql`
   - Run `supabase/rls.sql`

4. **Create admin user:**
   - Go to Authentication > Users
   - Add user with email/password

5. **Restart dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

6. **Create your first post:**
   - Visit http://localhost:3000/admin/login
   - Log in with your admin credentials
   - Click "+ New Post"
   - Write and publish your first post!

## 🎨 What You'll See on Each Page:

### Homepage (`/`)
- Clean header with site title
- Navigation links (Home, About, RSS Feed)
- List of published blog posts
- Each post shows:
  - Title (clickable)
  - Excerpt
  - Publication date
  - Reading time
- Footer with copyright

### Post Page (`/[slug]`)
- Large, readable title
- Publication date and reading time
- Full post content with rich formatting
- Back to home link

### About Page (`/about`)
- Simple about page
- Customizable content

### Admin Dashboard (`/admin`)
- List of all posts (published and drafts)
- Status indicators
- Edit/View links
- "+ New Post" button

### Admin Editor (`/admin/new` or `/admin/edit/[slug]`)
- Title input
- Auto-generating slug
- Rich text editor with formatting toolbar
- Excerpt field
- Publish checkbox
- Save/Publish buttons

## 🎯 Quick Test Checklist:

Even without database, you can test:
- [x] Homepage loads
- [x] Navigation works
- [x] About page loads
- [x] Admin login page loads
- [x] 404 page works (try `/invalid-slug`)
- [x] Responsive design (resize browser)
- [x] Clean, minimalist design

## 💡 Tips:

1. **Check the console** - If you see Supabase connection errors, you need to set up `.env.local`

2. **Mobile preview** - Open browser dev tools (F12) and toggle device toolbar to see mobile view

3. **Design details** - Notice the:
   - Clean typography
   - Generous whitespace
   - Subtle hover effects
   - Focus states for accessibility

4. **Performance** - Pages should load instantly!

## 🐛 Troubleshooting:

**Server won't start?**
- Make sure port 3000 is available
- Check for TypeScript errors: `npm run build`

**Can't see posts?**
- Database not set up yet (expected!)
- Set up Supabase to see real posts

**Styling looks off?**
- Make sure Tailwind compiled: Check for CSS in browser dev tools

---

**Ready to see it?** Open http://localhost:3000 in your browser! 🎉

