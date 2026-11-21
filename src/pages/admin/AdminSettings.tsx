import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, Bell, Shield, Mail, Globe, Save, 
  Building, Users, Key, Database
} from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Virtual Safe Space',
    siteDescription: 'Protecting youth across Africa',
    supportEmail: 'virtualsafespace2025@gmail.com',
    helplineNumber: '0810 303 8196',
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newReportAlert: true,
    statusChangeAlert: true,
    dailyDigest: false,
    weeklyReport: true,
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '60',
    ipWhitelisting: false,
    auditLogging: true,
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: 'Settings saved successfully' });
    setSaving(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink to-primary flex items-center justify-center">
                <Settings size={20} className="text-white" />
              </div>
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">Manage your application settings</p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-muted p-1 h-auto flex-wrap">
            <TabsTrigger value="general" className="gap-2">
              <Building size={16} />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell size={16} />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield size={16} />
              Security
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe size={20} className="text-primary" />
                  Site Information
                </CardTitle>
                <CardDescription>
                  Basic information about your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="helpline">Helpline Number</Label>
                  <Input
                    id="helpline"
                    value={generalSettings.helplineNumber}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, helplineNumber: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail size={20} className="text-primary" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Configure when and how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">New Report Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when a new report is submitted</p>
                  </div>
                  <Switch
                    checked={notificationSettings.newReportAlert}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, newReportAlert: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Status Change Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when a report status changes</p>
                  </div>
                  <Switch
                    checked={notificationSettings.statusChangeAlert}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, statusChangeAlert: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Daily Digest</p>
                    <p className="text-sm text-muted-foreground">Receive a daily summary of all activities</p>
                  </div>
                  <Switch
                    checked={notificationSettings.dailyDigest}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, dailyDigest: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Weekly Report</p>
                    <p className="text-sm text-muted-foreground">Receive a weekly analytics report</p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReport}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, weeklyReport: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key size={20} className="text-primary" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security options for the admin panel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Audit Logging</p>
                    <p className="text-sm text-muted-foreground">Log all admin actions for security review</p>
                  </div>
                  <Switch
                    checked={securitySettings.auditLogging}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, auditLogging: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">IP Whitelisting</p>
                    <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</p>
                  </div>
                  <Switch
                    checked={securitySettings.ipWhitelisting}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, ipWhitelisting: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                    className="max-w-xs"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-soft border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Database size={20} />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions that affect your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-red-800">Export All Data</p>
                    <p className="text-sm text-red-600">Download all reports and user data</p>
                  </div>
                  <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
