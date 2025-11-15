# Testing Checklist

Use this checklist to verify all functionality works correctly before and after deployment.

## Pre-Deployment Testing

### Database Setup
- [ ] Supabase project created
- [ ] Schema SQL executed successfully
- [ ] RLS policies applied
- [ ] Admin user created in Supabase Auth
- [ ] Test connection works

### Local Development
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts successfully
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Environment variables configured

## Functionality Testing

### Admin Authentication
- [ ] Can access `/admin/login`
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials shows error
- [ ] Logout button works
- [ ] Protected routes redirect to login
- [ ] Session persists on page refresh
- [ ] Can't access admin routes without login

### Post Management (Admin)

#### Create Post
- [ ] Can access `/admin/new`
- [ ] Title field accepts input
- [ ] Slug auto-generates from title
- [ ] Slug can be manually edited
- [ ] Content editor works (Tiptap)
- [ ] Rich text formatting works (bold, italic, headings, lists)
- [ ] Excerpt field is optional
- [ ] Published checkbox works
- [ ] "Save Draft" saves as unpublished
- [ ] "Publish" saves as published
- [ ] Success message appears after save
- [ ] Redirects to admin dashboard after save
- [ ] New post appears in dashboard

#### Edit Post
- [ ] Can access `/admin/edit/[slug]`
- [ ] Existing data loads correctly
- [ ] Can update title
- [ ] Can update slug
- [ ] Can update content
- [ ] Can update excerpt
- [ ] Can toggle published status
- [ ] Changes save correctly
- [ ] Reading time updates automatically
- [ ] Updated post reflects changes

#### Delete Post
- [ ] Delete button appears for existing posts
- [ ] Confirmation dialog appears
- [ ] Cancel prevents deletion
- [ ] Confirm deletes post
- [ ] Post removed from dashboard
- [ ] Post removed from public view (if published)

### Public Pages

#### Homepage
- [ ] Loads at `/`
- [ ] Shows all published posts
- [ ] Doesn't show unpublished posts
- [ ] Posts ordered by published date (newest first)
- [ ] Post titles are clickable
- [ ] Excerpts display correctly
- [ ] Dates format correctly
- [ ] Reading time displays
- [ ] Navigation links work
- [ ] RSS feed link works
- [ ] Empty state shows when no posts

#### Individual Post Page
- [ ] Loads at `/[slug]`
- [ ] Shows correct post content
- [ ] Title displays correctly
- [ ] Publication date shows
- [ ] Reading time shows
- [ ] Content renders HTML correctly
- [ ] Back to home link works
- [ ] 404 page shows for invalid slugs
- [ ] Unpublished posts return 404

#### About Page
- [ ] Loads at `/about`
- [ ] Content displays correctly
- [ ] Navigation works

### RSS Feed
- [ ] Accessible at `/feed`
- [ ] Returns valid XML
- [ ] Includes all published posts
- [ ] Post titles in feed
- [ ] Post descriptions in feed
- [ ] Publication dates correct
- [ ] Links are correct

### Sitemap
- [ ] Accessible at `/sitemap.xml`
- [ ] Returns valid XML
- [ ] Includes homepage
- [ ] Includes about page
- [ ] Includes all published posts
- [ ] URLs are correct

## Responsive Design Testing

### Mobile (< 640px)
- [ ] Homepage layout works
- [ ] Post cards readable
- [ ] Navigation accessible
- [ ] Admin dashboard usable
- [ ] Editor usable
- [ ] Forms are accessible
- [ ] Text is readable
- [ ] Buttons are tappable

### Tablet (640px - 1024px)
- [ ] Layout adapts correctly
- [ ] Content is well-spaced
- [ ] Navigation works
- [ ] Forms are usable

### Desktop (> 1024px)
- [ ] Content width is optimal
- [ ] Typography is readable
- [ ] Spacing is generous
- [ ] Hover states work

## Performance Testing

### Page Load Speed
- [ ] Homepage loads < 2 seconds
- [ ] Post pages load < 2 seconds
- [ ] Admin dashboard loads < 2 seconds
- [ ] No layout shift (CLS)
- [ ] Fast First Contentful Paint (FCP)
- [ ] Good Largest Contentful Paint (LCP)

### Core Web Vitals
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

### Network
- [ ] Images load efficiently
- [ ] No unnecessary requests
- [ ] API calls are fast
- [ ] No console errors

## SEO Testing

### Meta Tags
- [ ] Title tags present
- [ ] Description tags present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URLs correct

### Structured Data
- [ ] HTML is semantic
- [ ] Headings hierarchy correct (h1 → h2 → h3)
- [ ] Alt text on images (if any)
- [ ] Proper use of article, time, etc.

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader friendly
- [ ] ARIA labels present
- [ ] Color contrast sufficient
- [ ] No keyboard traps

## Error Handling

### Error Pages
- [ ] 404 page works
- [ ] Error boundary catches errors
- [ ] Error messages are helpful
- [ ] Can recover from errors

### Form Validation
- [ ] Required fields validated
- [ ] Error messages clear
- [ ] Can't submit invalid forms
- [ ] Success messages appear

### Network Errors
- [ ] Handles connection errors
- [ ] Shows appropriate messages
- [ ] Can retry failed operations

## Security Testing

### Authentication
- [ ] Can't bypass login
- [ ] Session expires appropriately
- [ ] Passwords not exposed
- [ ] CSRF protection (Next.js default)

### Data Access
- [ ] Public can't see drafts
- [ ] Public can't access admin routes
- [ ] RLS policies enforced
- [ ] No sensitive data in client

## Browser Compatibility

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Safari iOS
- [ ] Chrome Android
- [ ] Samsung Internet

## Post-Deployment Testing

After deploying to Vercel:

- [ ] Site loads at production URL
- [ ] All environment variables set
- [ ] Database connection works
- [ ] Authentication works
- [ ] All features work as expected
- [ ] Performance is good
- [ ] No console errors
- [ ] SEO tags verified
- [ ] RSS feed works
- [ ] Sitemap works

## Automated Testing (Future)

Consider adding:
- [ ] Unit tests for utilities
- [ ] Integration tests for API routes
- [ ] E2E tests for critical flows
- [ ] Visual regression tests

## Notes

Document any issues found during testing:

1. 
2. 
3. 

## Sign-off

- [ ] All critical tests passed
- [ ] Ready for production
- [ ] Documentation complete
- [ ] Deployment guide reviewed

**Tester:** _________________  
**Date:** _________________  
**Version:** _________________

