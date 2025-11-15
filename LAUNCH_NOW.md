# 🚀 Launch Your Blog - Step by Step Guide

Follow these steps to get your blog live at **blogfirojansari.com**!

---

## ✅ Step 1: Create GitHub Repository (5 minutes)

### 1.1 Go to GitHub
1. Open https://github.com/new in your browser
2. If not logged in, sign up/login with your GitHub account

### 1.2 Create Repository
- **Repository name**: `firoj-blog` (or any name you like)
- **Description**: "My personal blog" (optional)
- **Visibility**: Choose **Private** (recommended) or **Public**
- **IMPORTANT**: Do NOT check "Add a README file"
- **IMPORTANT**: Do NOT add .gitignore or license
- Click **Create repository**

### 1.3 Copy Your Repository URL
After creating, GitHub will show you a page with commands. You'll see a URL like:
```
https://github.com/YOUR_USERNAME/firoj-blog.git
```
**Copy this URL** - you'll need it in the next step!

---

## ✅ Step 2: Push Code to GitHub (2 minutes)

### 2.1 In Your Terminal (Cursor/VS Code)
Run these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/firoj-blog.git
git branch -M main
git push -u origin main
```

**Example:**
If your username is `firojansari`, the command would be:
```bash
git remote add origin https://github.com/firojansari/firoj-blog.git
git branch -M main
git push -u origin main
```

### 2.2 Enter GitHub Credentials
- If asked for username: Enter your GitHub username
- If asked for password: Use a **Personal Access Token** (not your password)
  - Go to: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Select "repo" scope
  - Copy the token and use it as password

### 2.3 Verify
Go back to your GitHub repository page - you should see all your files!

---

## ✅ Step 3: Deploy to Vercel (10 minutes)

### 3.1 Sign Up/Login to Vercel
1. Go to https://vercel.com
2. Click **Sign Up** (or **Log In**)
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub

### 3.2 Import Your Project
1. Click **Add New Project** (or **Import Project**)
2. Find your repository: `firoj-blog` (or whatever you named it)
3. Click **Import**

### 3.3 Configure Project
- **Framework Preset**: Next.js (should be auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 3.4 Add Environment Variables
**IMPORTANT**: Click **Environment Variables** and add these 4 variables:

**Variable 1:**
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: (Copy from your `.env.local` file)
- **Environment**: Production, Preview, Development (check all)

**Variable 2:**
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: (Copy from your `.env.local` file)
- **Environment**: Production, Preview, Development (check all)

**Variable 3:**
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: (Copy from your `.env.local` file)
- **Environment**: Production, Preview, Development (check all)

**Variable 4:**
- **Name**: `NEXT_PUBLIC_SITE_URL`
- **Value**: `https://blogfirojansari.com`
- **Environment**: Production, Preview, Development (check all)

### 3.5 Deploy!
1. Click **Deploy** button
2. Wait 2-3 minutes for build to complete
3. You'll see: **"Congratulations! Your project has been deployed"**
4. You'll get a URL like: `https://firoj-blog.vercel.app`

**🎉 Your blog is now live on Vercel!**

---

## ✅ Step 4: Connect Your Custom Domain (15 minutes)

### 4.1 Add Domain in Vercel
1. In your Vercel project, click **Settings** tab
2. Click **Domains** in the left sidebar
3. Enter: `blogfirojansari.com`
4. Click **Add**

### 4.2 Vercel Will Show DNS Records
Vercel will display DNS records you need to add. You'll see something like:

**For apex domain (blogfirojansari.com):**
- Type: A
- Name: @
- Value: `76.76.21.21`

**For www subdomain:**
- Type: CNAME
- Name: www
- Value: `cname.vercel-dns.com`

### 4.3 Add DNS Records in Hostinger
1. Go to https://hpanel.hostinger.com
2. Login to your Hostinger account
3. Go to **Domains** → **blogfirojansari.com**
4. Click **DNS / Name Servers** or **DNS Zone Editor**

5. **Add A Record:**
   - **Type**: A
   - **Name**: @ (or leave blank)
   - **Value**: `76.76.21.21`
   - **TTL**: 3600 (or default)
   - Click **Add** or **Save**

6. **Add CNAME Record (for www):**
   - **Type**: CNAME
   - **Name**: www
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: 3600 (or default)
   - Click **Add** or **Save**

### 4.4 Wait for DNS Propagation
- DNS changes can take **10 minutes to 48 hours**
- Usually works within **10-30 minutes**
- Vercel will show **"Valid Configuration"** when ready
- You can check status in Vercel → Settings → Domains

### 4.5 Update Environment Variable
Once DNS is configured:
1. Go to Vercel → **Settings** → **Environment Variables**
2. Make sure `NEXT_PUBLIC_SITE_URL` is set to: `https://blogfirojansari.com`
3. If you changed it, **Redeploy** your project

---

## ✅ Step 5: Test Your Live Site! (5 minutes)

Visit: **https://blogfirojansari.com**

### Checklist:
- [ ] Homepage loads correctly
- [ ] Sidebar shows "Firoj Ansari"
- [ ] Navigation works
- [ ] Can access `/admin/login`
- [ ] Can log in with admin credentials
- [ ] Can create/edit posts
- [ ] Posts display correctly
- [ ] RSS feed works: `https://blogfirojansari.com/feed`
- [ ] Sitemap works: `https://blogfirojansari.com/sitemap.xml`

---

## 🎉 Congratulations!

Your blog is now live at **https://blogfirojansari.com**!

---

## 🆘 Troubleshooting

### Build Fails?
- Check Vercel build logs
- Make sure all environment variables are set
- Verify your code has no errors

### Domain Not Working?
- Wait longer (DNS can take time)
- Check DNS records in Hostinger match Vercel's requirements
- Verify in Vercel dashboard for any errors

### Can't Access Admin?
- Make sure `NEXT_PUBLIC_SITE_URL` is set correctly
- Check Supabase RLS policies
- Verify admin user exists in Supabase

---

## 📝 Next Steps After Launch

1. **Create Your First Post** - Write a welcome post!
2. **Share Your Blog** - Tell the world!
3. **Update Twitter Link** - Add your actual X/Twitter username
4. **Add Analytics** (optional) - Google Analytics or Vercel Analytics
5. **Keep Improving** - Use Cursor AI to make changes anytime!

---

**Let's get you live! Start with Step 1! 🚀**

