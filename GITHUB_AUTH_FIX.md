# Fix GitHub Authentication

## The Problem
Windows has cached credentials for a different GitHub account (`online-we`). We need to use your correct account (`Firoj-7`).

## Solution: Use Personal Access Token

### Step 1: Create Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `firoj-blog-deploy`
4. Select expiration: **90 days** (or No expiration)
5. **Check these scopes:**
   - ✅ `repo` (Full control of private repositories)
6. Click **"Generate token"**
7. **COPY THE TOKEN** - you'll only see it once! It looks like: `ghp_xxxxxxxxxxxxxxxxxxxx`

### Step 2: Try Pushing Again
When you run `git push`, it will ask for:
- **Username**: `Firoj-7`
- **Password**: Paste your Personal Access Token (not your GitHub password!)

---

## Alternative: Use GitHub Desktop or GitHub CLI

If tokens are confusing, you can:
1. Use **GitHub Desktop** app (easier GUI)
2. Or use **GitHub CLI** (`gh auth login`)

---

## Quick Fix Command

After creating your token, run:
```bash
git push -u origin main
```

When prompted:
- Username: `Firoj-7`
- Password: `YOUR_PERSONAL_ACCESS_TOKEN`

