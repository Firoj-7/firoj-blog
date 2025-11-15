# Quick Commands to Push to GitHub

After you create your GitHub repository, run these commands:

## Replace YOUR_USERNAME with your GitHub username

```bash
git remote add origin https://github.com/YOUR_USERNAME/firoj-blog.git
git branch -M main
git push -u origin main
```

## Example:
If your GitHub username is `firojansari`, run:
```bash
git remote add origin https://github.com/firojansari/firoj-blog.git
git branch -M main
git push -u origin main
```

## If asked for credentials:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (not your password)
  - Create one at: https://github.com/settings/tokens
  - Select "repo" scope
  - Copy and paste the token

---

**Tell me your GitHub username and I can prepare the exact commands for you!**

