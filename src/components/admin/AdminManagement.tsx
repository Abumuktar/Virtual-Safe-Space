import { useState } from 'react';
import { UserPlus, Trash2, Shield, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

interface Admin {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

const AdminManagement = () => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          user_id,
          role,
          created_at,
          profiles!inner (
            id,
            email,
            full_name
          )
        `)
        .eq('role', 'admin');

      if (error) throw error;

      const adminList = data?.map((item: any) => ({
        id: item.user_id,
        email: item.profiles.email,
        full_name: item.profiles.full_name,
        created_at: item.created_at,
      })) || [];

      setAdmins(adminList);
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingAdmin(true);

    try {
      // Find user by email
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email', newAdminEmail)
        .maybeSingle();

      if (profileError) throw profileError;

      if (!profile) {
        toast({
          title: 'User Not Found',
          description: 'No user exists with this email. They need to sign up first.',
          variant: 'destructive',
        });
        setAddingAdmin(false);
        return;
      }

      // Check if already admin
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', profile.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (existingRole) {
        toast({
          title: 'Already Admin',
          description: 'This user is already an administrator.',
          variant: 'destructive',
        });
        setAddingAdmin(false);
        return;
      }

      // Update role to admin
      const { error: updateError } = await supabase
        .from('user_roles')
        .update({ role: 'admin' })
        .eq('user_id', profile.id);

      if (updateError) throw updateError;

      toast({
        title: 'Admin Added',
        description: `${newAdminEmail} is now an administrator.`,
      });

      setNewAdminEmail('');
      setDialogOpen(false);
      fetchAdmins();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add admin.',
        variant: 'destructive',
      });
    } finally {
      setAddingAdmin(false);
    }
  };

  const handleRemoveAdmin = async (adminId: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} as admin?`)) return;

    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: 'user' })
        .eq('user_id', adminId);

      if (error) throw error;

      toast({
        title: 'Admin Removed',
        description: `${email} is no longer an administrator.`,
      });

      fetchAdmins();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to remove admin.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-display flex items-center gap-2">
          <Shield size={20} className="text-primary" />
          Admin Management
        </CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <UserPlus size={16} />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Administrator</DialogTitle>
              <DialogDescription>
                Enter the email of an existing user to grant them admin privileges.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAdmin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">User Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="user@example.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  The user must have an existing account to be made an admin.
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={addingAdmin}>
                  {addingAdmin ? (
                    <Loader2 size={16} className="animate-spin mr-2" />
                  ) : (
                    <UserPlus size={16} className="mr-2" />
                  )}
                  Add Admin
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : admins.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No administrators found</p>
        ) : (
          <div className="space-y-3">
            {admins.map((admin) => (
              <div
                key={admin.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink to-primary flex items-center justify-center text-white font-medium">
                    {admin.full_name?.[0] || admin.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {admin.full_name || 'No Name'}
                    </p>
                    <p className="text-sm text-muted-foreground">{admin.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveAdmin(admin.id, admin.email)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminManagement;
