import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, FileText, Calendar, MapPin, User, 
  AlertTriangle, Clock, MessageSquare, Send, CheckCircle
} from 'lucide-react';

const AdminReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [report, setReport] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    if (id) {
      fetchReport();
      fetchUpdates();
    }
  }, [id]);

  const fetchReport = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setReport(data);
      setAdminNotes(data.admin_notes || '');
    } catch (error) {
      console.error('Error fetching report:', error);
      toast({ title: 'Error fetching report', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchUpdates = async () => {
    try {
      const { data, error } = await supabase
        .from('report_updates')
        .select('*')
        .eq('report_id', id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setUpdates(data || []);
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  };

  const updateStatus = async (newStatus: 'pending' | 'under_review' | 'resolved' | 'closed') => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      setReport({ ...report, status: newStatus });
      toast({ title: 'Status updated successfully' });
    } catch (error) {
      toast({ title: 'Error updating status', variant: 'destructive' });
    }
  };

  const updateSeverity = async (newSeverity: 'low' | 'medium' | 'high' | 'critical') => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({ severity: newSeverity })
        .eq('id', id);
      
      if (error) throw error;
      setReport({ ...report, severity: newSeverity });
      toast({ title: 'Severity updated successfully' });
    } catch (error) {
      toast({ title: 'Error updating severity', variant: 'destructive' });
    }
  };

  const saveAdminNotes = async () => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({ admin_notes: adminNotes })
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: 'Notes saved successfully' });
    } catch (error) {
      toast({ title: 'Error saving notes', variant: 'destructive' });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('report_updates')
        .insert({
          report_id: id,
          message: newMessage,
          is_admin_update: true,
          user_id: user?.id
        });
      
      if (error) throw error;
      
      setNewMessage('');
      fetchUpdates();
      toast({ title: 'Message sent successfully' });
    } catch (error) {
      toast({ title: 'Error sending message', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      under_review: 'bg-blue-100 text-blue-700 border-blue-200',
      resolved: 'bg-green-100 text-green-700 border-green-200',
      closed: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getSeverityBadge = (severity: string) => {
    const styles = {
      low: 'bg-green-100 text-green-700',
      medium: 'bg-amber-100 text-amber-700',
      high: 'bg-red-100 text-red-700',
      critical: 'bg-red-200 text-red-800',
    };
    return styles[severity as keyof typeof styles] || styles.medium;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!report) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Report not found</p>
          <Button onClick={() => navigate('/admin')} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/admin')}
            className="w-fit"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Report Details
            </h1>
            <p className="text-muted-foreground mt-1">
              ID: {report.id.slice(0, 8)}...
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Info */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} className="text-primary" />
                  Incident Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={getStatusBadge(report.status)}>
                    {report.status?.replace('_', ' ')}
                  </Badge>
                  {report.severity && (
                    <Badge variant="outline" className={getSeverityBadge(report.severity)}>
                      {report.severity} severity
                    </Badge>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={18} className="text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Incident Type</p>
                      <p className="font-medium">{report.incident_type}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Reported On</p>
                      <p className="font-medium">{new Date(report.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {report.incident_date && (
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Incident Date</p>
                        <p className="font-medium">{new Date(report.incident_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                  {report.location && (
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{report.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="bg-muted/50 p-4 rounded-lg text-foreground whitespace-pre-wrap">
                    {report.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Communication */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare size={20} className="text-primary" />
                  Communication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Messages */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {updates.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No messages yet</p>
                  ) : (
                    updates.map((update) => (
                      <div 
                        key={update.id}
                        className={`p-3 rounded-lg ${
                          update.is_admin_update 
                            ? 'bg-primary/10 ml-8' 
                            : 'bg-muted mr-8'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium ${
                            update.is_admin_update ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            {update.is_admin_update ? 'Admin' : 'User'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(update.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{update.message}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Send Message */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                  <Button 
                    onClick={sendMessage} 
                    disabled={sending || !newMessage.trim()}
                    className="px-4"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={report.status} onValueChange={updateStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Severity</label>
                  <Select value={report.severity || 'medium'} onValueChange={updateSeverity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {report.status === 'resolved' && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg text-green-700">
                    <CheckCircle size={18} />
                    <span className="text-sm font-medium">This report has been resolved</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Admin Notes */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Admin Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add private notes about this report..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <Button onClick={saveAdminNotes} variant="outline" className="w-full">
                  Save Notes
                </Button>
              </CardContent>
            </Card>

            {/* Reporter Info */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User size={18} />
                  Reporter
                </CardTitle>
              </CardHeader>
              <CardContent>
                {report.anonymous_id ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center">
                      <User size={24} className="text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Anonymous Report</p>
                    <p className="text-xs text-muted-foreground mt-1">ID: {report.anonymous_id.slice(0, 8)}...</p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                      <User size={24} className="text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Registered User</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminReportDetail;
