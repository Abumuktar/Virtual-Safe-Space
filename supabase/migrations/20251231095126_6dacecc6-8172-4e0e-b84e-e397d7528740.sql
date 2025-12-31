-- Fix 1: Update has_role function to validate caller can only check their own role
-- Or allow admins to check any role (for admin dashboard functionality)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      -- Security: Only allow checking own role OR if caller is already an admin
      AND (
        _user_id = auth.uid() 
        OR EXISTS (
          SELECT 1 FROM public.user_roles 
          WHERE user_id = auth.uid() AND role = 'admin'
        )
      )
  )
$$;

-- Fix 2: Add database constraints for input validation on reports table
ALTER TABLE public.reports 
  ADD CONSTRAINT reports_incident_type_length CHECK (char_length(incident_type) <= 100),
  ADD CONSTRAINT reports_location_length CHECK (location IS NULL OR char_length(location) <= 255),
  ADD CONSTRAINT reports_description_length CHECK (char_length(description) BETWEEN 20 AND 10000),
  ADD CONSTRAINT reports_admin_notes_length CHECK (admin_notes IS NULL OR char_length(admin_notes) <= 5000);

-- Add constraints for report_updates table
ALTER TABLE public.report_updates
  ADD CONSTRAINT report_updates_message_length CHECK (char_length(message) BETWEEN 1 AND 5000);

-- Add check constraint for valid incident types
ALTER TABLE public.reports
  ADD CONSTRAINT reports_incident_type_valid CHECK (
    incident_type IN (
      'Physical Harassment',
      'Verbal Harassment', 
      'Cyberbullying',
      'Sexual Harassment',
      'Discrimination',
      'Neglect',
      'Emotional Abuse',
      'Domestic Violence',
      'Other'
    )
  );