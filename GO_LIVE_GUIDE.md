# 🚀 Go Live Guide - blogfirojansari.com

Complete step-by-step guide to deploy your blog to production TODAY!

## ✅ Pre-Deployment Checklist

Before we start, make sure:
- [x] Your blog works locally (http://localhost:3000)
- [ ] You have a GitHub account
- [ ] Your code is ready
- [ ] You have your Supabase credentials
- [ ] Your domain: blogfirojansari.com (from Hostinger)

---

## Step 1: Push Code to GitHub (5 minutes)

### 1.1 Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit: Personal blog ready for production"
```

### 1.2 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `firoj-blog` (or any name you like)
3. Make it **Private** (recommended) or Public
4. **Don't** initialize with README
5. Click **Create repository**

### 1.3 Push Your Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

---

## Step 2: Deploy to Vercel (10 minutes)

### 2.1 Sign Up / Login to Vercel
1. Go to https://vercel.com
2. Click **Sign Up** (or **Log In** if you have an account)
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub

### 2.2 Import Your Project
1. Click **Add New Project**
2. Find your repository (`firoj-blog` or whatever you named it)
3. Click **Import**

### 2.3 Configure Project
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)

### 2.4 Add Environment Variables
Click **Environment Variables** and add these:

```
NEXT_PUBLIC_SUPABASE_URL
```
Value: Your Supabase project URL (from .env.local)

```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Value: Your Supabase anon key (from .env.local)

```
SUPABASE_SERVICE_ROLE_KEY
```
Value: Your Supabase service role key (from .env.local)

```
NEXT_PUBLIC_SITE_URL
```
Value: `https://blogfirojansari.com` (your domain)

### 2.5 Deploy!
1. Click **Deploy**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://your-project.vercel.app`

**🎉 Your blog is now live on Vercel!**

---

## Step 3: Connect Your Custom Domain (15 minutes)

### 3.1 Add Domain in Vercel
1. Go to your project in Vercel dashboard
2. Click **Settings** tab
3. Click **Domains** in left sidebar
4. Enter: `blogfirojansari.com`
5. Click **Add**

### 3.2 Configure DNS in Hostinger

Vercel will show you DNS records to add. Here's what you need:

#### Option A: Apex Domain (blogfirojansari.com)
If you want the main domain:

1. Go to Hostinger → **Domains** → **blogfirojansari.com**
2. Click **DNS / Name Servers**
3. Add these records:

**Type: A**
- Name: `@`
- Value: `76.76.21.21`
- TTL: 3600

**Type: CNAME** (for www)
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: 3600

#### Option B: Subdomain (blog.blogfirojansari.com)
If you want a subdomain:

**Type: CNAME**
- Name: `blog`
- Value: `cname.vercel-dns.com`
- TTL: 3600

### 3.3 Wait for DNS Propagation
- DNS changes can take 5 minutes to 48 hours
- Usually works within 10-30 minutes
- Vercel will show "Valid Configuration" when ready

### 3.4 Update Environment Variable
Once DNS is configured:
1. Go back to Vercel → **Settings** → **Environment Variables**
2. Update `NEXT_PUBLIC_SITE_URL` to: `https://blogfirojansari.com`
3. **Redeploy** your project

---

## Step 4: Final Configuration (5 minutes)

### 4.1 Update Supabase (if needed)
Your Supabase should work with the new domain. If you have any domain restrictions, update them in Supabase settings.

### 4.2 Test Your Live Site
Visit: **https://blogfirojansari.com**

Check:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Admin login works
- [ ] Can create/edit posts
- [ ] Posts display correctly
- [ ] RSS feed works: `https://blogfirojansari.com/feed`
- [ ] Sitemap works: `https://blogfirojansari.com/sitemap.xml`

---

## Step 5: SSL Certificate (Automatic!)

Vercel automatically provides SSL certificates (HTTPS) for your domain. No action needed!

---

## 🎉 You're Live!

Your blog is now accessible at:
- **https://blogfirojansari.com**

---

## Troubleshooting

### Domain Not Working?
1. Check DNS records in Hostinger match Vercel's requirements
2. Wait a bit longer (DNS can take time)
3. Check Vercel dashboard for any errors

### Build Fails?
1. Check Vercel build logs
2. Make sure all environment variables are set
3. Verify your code has no errors locally

### Can't Access Admin?
1. Make sure `NEXT_PUBLIC_SITE_URL` is set correctly
2. Check Supabase RLS policies
3. Verify admin user exists in Supabase

---

## Next Steps After Going Live

1. **Create Your First Post** - Write a welcome post!
2. **Share Your Blog** - Tell the world!
3. **Set Up Analytics** (optional) - Google Analytics or Vercel Analytics
4. **Backup Regularly** - Export your Supabase data periodically
5. **Monitor Performance** - Use Vercel Analytics

---

## Quick Reference

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Hostinger DNS**: https://hpanel.hostinger.com
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Your Blog**: https://blogfirojansari.com

---

**Let's get you live! 🚀**

