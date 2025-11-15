/**
 * Validation utilities for form inputs
 */

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateTitle(title: string): ValidationResult {
  if (!title || !title.trim()) {
    return { valid: false, error: 'Title is required' }
  }
  if (title.trim().length < 3) {
    return { valid: false, error: 'Title must be at least 3 characters' }
  }
  if (title.trim().length > 200) {
    return { valid: false, error: 'Title must be less than 200 characters' }
  }
  return { valid: true }
}

export function validateSlug(slug: string): ValidationResult {
  if (!slug || !slug.trim()) {
    return { valid: false, error: 'Slug is required' }
  }
  // Slug should only contain lowercase letters, numbers, and hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  if (!slugRegex.test(slug)) {
    return {
      valid: false,
      error: 'Slug can only contain lowercase letters, numbers, and hyphens',
    }
  }
  if (slug.length > 100) {
    return { valid: false, error: 'Slug must be less than 100 characters' }
  }
  return { valid: true }
}

export function validateContent(content: string): ValidationResult {
  if (!content || !content.trim()) {
    return { valid: false, error: 'Content is required' }
  }
  // Strip HTML tags for length validation
  const textContent = content.replace(/<[^>]*>/g, '').trim()
  if (textContent.length < 10) {
    return { valid: false, error: 'Content must be at least 10 characters' }
  }
  return { valid: true }
}

export function validateExcerpt(excerpt: string | null | undefined): ValidationResult {
  if (!excerpt) {
    return { valid: true } // Excerpt is optional
  }
  if (excerpt.length > 300) {
    return { valid: false, error: 'Excerpt must be less than 300 characters' }
  }
  return { valid: true }
}

export function validatePostData(data: {
  title: string
  slug?: string
  content: string
  excerpt?: string
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  const titleResult = validateTitle(data.title)
  if (!titleResult.valid) {
    errors.title = titleResult.error || 'Invalid title'
  }

  if (data.slug) {
    const slugResult = validateSlug(data.slug)
    if (!slugResult.valid) {
      errors.slug = slugResult.error || 'Invalid slug'
    }
  }

  const contentResult = validateContent(data.content)
  if (!contentResult.valid) {
    errors.content = contentResult.error || 'Invalid content'
  }

  const excerptResult = validateExcerpt(data.excerpt)
  if (!excerptResult.valid) {
    errors.excerpt = excerptResult.error || 'Invalid excerpt'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

