# Personal Blog Platform

A minimalist personal blogging platform inspired by Sam Altman's blog, built with Next.js 14+, Supabase, and Tailwind CSS.

## ✨ Features

- 🎨 **Clean, Minimalist Design** - Focus on typography and content
- 📝 **Rich Text Editor** - Powered by Tiptap with formatting options
- 🔐 **Admin Authentication** - Secure admin panel with Supabase Auth
- 📊 **Full CMS** - Create, edit, delete, and publish posts
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🔍 **SEO Optimized** - Meta tags, Open Graph, sitemap, RSS feed
- ⚡ **Fast Performance** - Optimized for Core Web Vitals
- 🗄️ **PostgreSQL Database** - Powered by Supabase
- 🔒 **Row Level Security** - Secure data access with RLS policies
- ♿ **Accessible** - WCAG compliant with proper ARIA labels

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Rich Text Editor**: Tiptap
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- Git (for version control)
- Vercel account (for deployment)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd FirojBlog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Set Up Database

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the SQL from `supabase/schema.sql` to create tables
4. Run the SQL from `supabase/rls.sql` to set up Row Level Security policies

### 5. Create Admin User

1. Go to **Authentication > Users** in your Supabase dashboard
2. Click **Add User** or **Invite User**
3. Create a user with email and password
4. This user will be your admin account

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Accessing Admin Panel

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Log in with your admin credentials
3. You'll be redirected to the admin dashboard

### Creating a Post

1. Click **+ New Post** in the admin dashboard
2. Fill in the title, content, and optional excerpt
3. The slug will auto-generate from the title (you can edit it)
4. Use the rich text editor to format your content
5. Click **Publish** to make it live or **Save Draft** to save it for later

### Editing a Post

1. Click **Edit** next to any post in the admin dashboard
2. Make your changes
3. Click **Save Draft** or **Publish** to save

### Deleting a Post

1. Click **Edit** on the post you want to delete
2. Click the **Delete** button
3. Confirm the deletion

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin routes (protected)
│   ├── [slug]/            # Dynamic post pages
│   ├── about/             # About page
│   ├── feed/              # RSS feed
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Sitemap generation
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Layout.tsx         # Main layout
│   ├── AdminLayout.tsx    # Admin layout
│   ├── PostCard.tsx       # Post card component
│   ├── PostList.tsx       # Post list component
│   ├── PostEditor.tsx     # Post editor
│   ├── Editor.tsx         # Rich text editor
│   └── ...
├── lib/                   # Utility functions
│   ├── actions/          # Server actions
│   ├── supabase/         # Supabase clients
│   ├── utils.ts          # Helper functions
│   └── validation.ts     # Form validation
├── supabase/             # Database files
│   ├── schema.sql        # Database schema
│   └── rls.sql           # RLS policies
└── types/                # TypeScript types
```

## 🧪 Testing

See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for a comprehensive testing checklist.

### Quick Test

1. ✅ Can create, edit, and delete posts as admin
2. ✅ Public can only see published posts
3. ✅ Responsive on mobile, tablet, desktop
4. ✅ SEO tags properly set
5. ✅ Fast page loads
6. ✅ Authentication works correctly
7. ✅ Drafts save properly
8. ✅ Reading time calculates accurately
9. ✅ Links and navigation work
10. ✅ Proper error messages

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy!

## 📚 Documentation

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) - Testing checklist

## 🔧 Configuration

### Customization

- **Site Name**: Update in `app/layout.tsx` and `components/Layout.tsx`
- **Colors**: Modify `tailwind.config.ts` and CSS variables in `globals.css`
- **Typography**: Adjust in `app/globals.css`
- **Content Width**: Change `max-w-3xl` in layout components

## 🐛 Troubleshooting

### Database Connection Issues
- Verify Supabase URL and keys are correct
- Check that you've run both SQL scripts
- Ensure RLS policies are set up

### Authentication Issues
- Make sure you've created a user in Supabase Auth
- Check that RLS policies allow authenticated access
- Verify environment variables are loaded

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript types are correct
- Verify Next.js version compatibility

## 📝 License

ISC

## 🙏 Acknowledgments

- Inspired by Sam Altman's blog design
- Built with Next.js, Supabase, and Tailwind CSS

## 📞 Support

For issues and questions:
- Check the documentation files
- Review Supabase logs
- Check Vercel deployment logs
- Review browser console for errors

---

**Built with ❤️ using Next.js, Supabase, and Tailwind CSS**
