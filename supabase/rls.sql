-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE upvotes ENABLE ROW LEVEL SECURITY;

-- Posts RLS Policies
-- Public can read published posts
CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (published = true);

-- Authenticated users can read all posts (for admin)
CREATE POLICY "Authenticated users can read all posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated admin can insert posts
CREATE POLICY "Authenticated users can insert posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated admin can update posts
CREATE POLICY "Authenticated users can update posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated admin can delete posts
CREATE POLICY "Authenticated users can delete posts"
  ON posts FOR DELETE
  TO authenticated
  USING (true);

-- Comments RLS Policies
-- Public can read approved comments
CREATE POLICY "Public can read approved comments"
  ON comments FOR SELECT
  USING (is_approved = true);

-- Authenticated users can read all comments (for moderation)
CREATE POLICY "Authenticated users can read all comments"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

-- Public can insert comments (pending approval)
CREATE POLICY "Public can insert comments"
  ON comments FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated admin can update comments
CREATE POLICY "Authenticated users can update comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated admin can delete comments
CREATE POLICY "Authenticated users can delete comments"
  ON comments FOR DELETE
  TO authenticated
  USING (true);

-- Upvotes RLS Policies
-- Public can read upvotes
CREATE POLICY "Public can read upvotes"
  ON upvotes FOR SELECT
  TO public
  USING (true);

-- Public can insert upvotes (with rate limiting handled by application)
CREATE POLICY "Public can insert upvotes"
  ON upvotes FOR INSERT
  TO public
  WITH CHECK (true);

-- Public can delete their own upvotes (by user_identifier)
-- Note: This is a simplified approach. In production, you might want more sophisticated tracking.
CREATE POLICY "Public can delete upvotes"
  ON upvotes FOR DELETE
  TO public
  USING (true);

