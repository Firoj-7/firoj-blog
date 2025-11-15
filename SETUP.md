# Setup Guide

This guide will walk you through setting up your personal blog platform.

## Step 1: Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Note down your project URL and API keys from Settings > API

## Step 2: Database Setup

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the SQL from `supabase/schema.sql` to create all tables
4. Run the SQL from `supabase/rls.sql` to set up Row Level Security policies

## Step 3: Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important**: 
- Never commit `.env.local` to version control
- The service role key should only be used server-side (it bypasses RLS)

## Step 4: Create Admin User

1. Go to **Authentication > Users** in your Supabase dashboard
2. Click **Add User** or **Invite User**
3. Create a user with email and password
4. This user will be your admin account

## Step 5: Install Dependencies

```bash
npm install
```

## Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 7: Access Admin Panel

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Log in with your admin credentials
3. You'll be redirected to the admin dashboard

## Step 8: Create Your First Post

1. Click **+ New Post** in the admin dashboard
2. Fill in the title, content, and optional excerpt
3. Click **Publish** to make it live or **Save Draft** to save it for later

## Troubleshooting

### Database Connection Issues
- Verify your Supabase URL and keys are correct
- Check that you've run both SQL scripts (schema.sql and rls.sql)

### Authentication Issues
- Make sure you've created a user in Supabase Auth
- Check that RLS policies are correctly set up
- Verify your environment variables are loaded (restart dev server after changes)

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check that TypeScript types are correct
- Verify Next.js version compatibility

## Production Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add all environment variables in Vercel dashboard
4. Update `NEXT_PUBLIC_SITE_URL` to your production domain
5. Deploy!

### Environment Variables for Production

Make sure to set these in your production environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (your production domain)

## Security Notes

- Never expose your `SUPABASE_SERVICE_ROLE_KEY` in client-side code
- Keep your `.env.local` file secure and never commit it
- Regularly update your dependencies for security patches
- Use strong passwords for admin accounts

