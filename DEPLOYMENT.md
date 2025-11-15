# Deployment Guide

This guide will walk you through deploying your personal blog platform to production.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Supabase project set up
- Domain name (optional)

## Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Personal blog platform"
```

2. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name it (e.g., `personal-blog`)
   - Don't initialize with README, .gitignore, or license

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Connect to Vercel

1. Go to [Vercel](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

## Step 3: Add Environment Variables

In Vercel project settings, add these environment variables:

### Required Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### How to Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings > API**
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### Setting NEXT_PUBLIC_SITE_URL

- For Vercel preview: `https://your-project.vercel.app`
- For custom domain: `https://yourdomain.com`

## Step 4: Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `https://your-project.vercel.app`

## Step 5: Test Deployment

### Public Pages
- [ ] Homepage loads correctly
- [ ] Published posts are visible
- [ ] Individual post pages work
- [ ] About page loads
- [ ] RSS feed is accessible at `/feed`
- [ ] Sitemap is accessible at `/sitemap.xml`

### Admin Panel
- [ ] Can access `/admin/login`
- [ ] Can log in with admin credentials
- [ ] Can create new posts
- [ ] Can edit existing posts
- [ ] Can delete posts
- [ ] Drafts save correctly
- [ ] Published posts appear on homepage

### Functionality
- [ ] Reading time calculates correctly
- [ ] Slugs generate automatically
- [ ] SEO meta tags are present
- [ ] Open Graph tags work
- [ ] Mobile responsive
- [ ] Fast page loads

## Step 6: Set Up Custom Domain (Optional)

1. In Vercel project settings, go to **Domains**
2. Add your domain (e.g., `blog.yourdomain.com`)
3. Follow Vercel's DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` to your custom domain
5. Redeploy

### DNS Configuration

Add these DNS records to your domain provider:

**For apex domain (yourdomain.com):**
- Type: A
- Name: @
- Value: 76.76.21.21

**For subdomain (blog.yourdomain.com):**
- Type: CNAME
- Name: blog
- Value: cname.vercel-dns.com

## Step 7: Post-Deployment Checklist

### Security
- [ ] Environment variables are set correctly
- [ ] Service role key is not exposed in client-side code
- [ ] RLS policies are active in Supabase
- [ ] Admin routes are protected

### Performance
- [ ] Pages load quickly (< 3 seconds)
- [ ] Images are optimized
- [ ] No console errors
- [ ] Core Web Vitals are good

### SEO
- [ ] Meta tags are present
- [ ] Open Graph tags work (test with [Open Graph Debugger](https://www.opengraph.xyz/))
- [ ] Sitemap is accessible
- [ ] Robots.txt is configured
- [ ] RSS feed works

### Functionality
- [ ] All CRUD operations work
- [ ] Authentication works
- [ ] Rich text editor works
- [ ] Responsive on all devices
- [ ] Error pages work

## Troubleshooting

### Build Fails

**Error: Environment variables not found**
- Make sure all required env vars are set in Vercel
- Redeploy after adding variables

**Error: Database connection failed**
- Verify Supabase URL and keys
- Check Supabase project is active
- Verify RLS policies allow public reads

### Pages Not Loading

**404 on all routes**
- Check Next.js build output
- Verify `next.config.js` is correct
- Check for TypeScript errors

**Admin login not working**
- Verify Supabase Auth is enabled
- Check user exists in Supabase
- Verify middleware is working

### Performance Issues

**Slow page loads**
- Enable Vercel Analytics
- Check image optimization
- Review bundle size
- Use Next.js Image component for images

## Monitoring

### Vercel Analytics
- Enable in project settings
- Monitor page views and performance
- Track Core Web Vitals

### Supabase Dashboard
- Monitor database usage
- Check API request logs
- Review authentication logs

## Updates and Maintenance

### Updating the Site

1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Vercel automatically deploys

### Database Migrations

If you need to update the database schema:

1. Update `supabase/schema.sql`
2. Run SQL in Supabase SQL Editor
3. Test locally
4. Deploy code changes

## Support

For issues:
- Check Vercel deployment logs
- Check Supabase logs
- Review browser console
- Check Next.js documentation

## Production Best Practices

1. **Never commit `.env.local`** - Use Vercel environment variables
2. **Use strong admin passwords** - Enable 2FA if possible
3. **Regular backups** - Export Supabase data regularly
4. **Monitor usage** - Watch for unexpected traffic or errors
5. **Keep dependencies updated** - Run `npm audit` regularly
6. **Use HTTPS** - Vercel provides this automatically
7. **Set up error tracking** - Consider Sentry or similar

## Next Steps

- Set up custom domain
- Configure email notifications
- Add analytics (Google Analytics, Plausible, etc.)
- Set up automated backups
- Configure CDN for static assets
- Add monitoring and alerting

