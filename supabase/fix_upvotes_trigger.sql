-- Fix the upvotes_count trigger to use SECURITY DEFINER
-- This allows the trigger to update the posts table even when RLS is enabled
-- The trigger runs with the permissions of the function creator (database owner)

-- Drop and recreate the function with SECURITY DEFINER
DROP FUNCTION IF EXISTS update_upvotes_count() CASCADE;

CREATE OR REPLACE FUNCTION update_upvotes_count()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET upvotes_count = upvotes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET upvotes_count = upvotes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Recreate the trigger
CREATE TRIGGER update_post_upvotes_count
  AFTER INSERT OR DELETE ON upvotes
  FOR EACH ROW EXECUTE FUNCTION update_upvotes_count();

