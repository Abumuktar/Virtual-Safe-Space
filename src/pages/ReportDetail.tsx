import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageSquare,
  Send,
  Loader2,
  Shield,
  User,
} from 'lucide-react';

interface Report {
  id: string;
  incident_type: string;
  incident_date: string | null;
  location: string | null;
  description: string;
  severity: string;
  status: string;
  created_at: string;
  admin_notes: string | null;
}

interface ReportUpdate {
  id: string;
  message: string;
  is_admin_update: boolean;
  created_at: string;
}

const ReportDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [report, setReport] = useState<Report | null>(null);
  const [updates, setUpdates] = useState<ReportUpdate[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id || !user) return;

      try {
        const { data: reportData, error: reportError } = await supabase
          .from('reports')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .maybeSingle();

        if (reportError) throw reportError;
        if (!reportData) {
          setReport(null);
          return;
        }

        setReport(reportData);

        const { data: updatesData, error: updatesError } = await supabase
          .from('report_updates')
          .select('*')
          .eq('report_id', id)
          .order('created_at', { ascending: true });

        if (updatesError) throw updatesError;
        setUpdates(updatesData || []);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id, user]);

  const handleSendUpdate = async () => {
    if (!newMessage.trim() || !report) return;

    setSending(true);
    try {
      const { error } = await supabase.from('report_updates').insert({
        report_id: report.id,
        user_id: user?.id,
        message: newMessage,
        is_admin_update: false,
      });

      if (error) throw error;

      setUpdates([
        ...updates,
        {
          id: Date.now().toString(),
          message: newMessage,
          is_admin_update: false,
          created_at: new Date().toISOString(),
        },
      ]);
      setNewMessage('');
      toast({
        title: 'Update sent',
        description: 'Your message has been added to the report.',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to send update',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-700', icon: Clock };
      case 'under_review':
        return { label: 'Under Review', color: 'bg-blue-100 text-blue-700', icon: AlertCircle };
      case 'resolved':
        return { label: 'Resolved', color: 'bg-green-100 text-green-700', icon: CheckCircle };
      case 'closed':
        return { label: 'Closed', color: 'bg-gray-100 text-gray-700', icon: CheckCircle };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-700', icon: Clock };
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-yellow-100 text-yellow-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'high': return 'bg-red-100 text-red-700';
      case 'critical': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!report) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Report Not Found</h2>
          <p className="text-muted-foreground mb-6">This report doesn't exist or you don't have access to it.</p>
          <Button asChild variant="hero">
            <Link to="/dashboard/my-reports">
              <ArrowLeft size={20} />
              Back to Reports
            </Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const statusConfig = getStatusConfig(report.status);
  const StatusIcon = statusConfig.icon;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          to="/dashboard/my-reports"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
          Back to My Reports
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${statusConfig.color}`}>
                <StatusIcon size={14} />
                {statusConfig.label}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(report.severity)}`}>
                {report.severity} severity
              </span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {report.incident_type}
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              Reported on {new Date(report.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <FileText size={18} className="text-primary" />
                  Incident Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">{report.description}</p>
              </CardContent>
            </Card>

            {/* Updates / Messages */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <MessageSquare size={18} className="text-primary" />
                  Updates & Messages
                </CardTitle>
                <CardDescription>Communication regarding this report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {updates.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No updates yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {updates.map((update) => (
                      <div
                        key={update.id}
                        className={`p-4 rounded-xl ${
                          update.is_admin_update
                            ? 'bg-primary/5 border border-primary/20'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            update.is_admin_update ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'
                          }`}>
                            {update.is_admin_update ? <Shield size={12} /> : <User size={12} />}
                          </div>
                          <span className="text-sm font-medium">
                            {update.is_admin_update ? 'VSS Team' : 'You'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(update.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-foreground">{update.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Send Update */}
                <div className="pt-4 border-t border-border">
                  <div className="flex gap-3">
                    <Textarea
                      placeholder="Add an update or ask a question..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button
                      onClick={handleSendUpdate}
                      disabled={!newMessage.trim() || sending}
                    >
                      {sending ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                      Send Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Details Card */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="font-display text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Incident Date</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar size={14} className="text-muted-foreground" />
                    {report.incident_date
                      ? new Date(report.incident_date).toLocaleDateString()
                      : 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin size={14} className="text-muted-foreground" />
                    {report.location || 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Report ID</p>
                  <p className="font-mono text-xs text-muted-foreground">{report.id}</p>
                </div>
              </CardContent>
            </Card>

            {/* Admin Notes */}
            {report.admin_notes && (
              <Card className="border-0 shadow-soft bg-primary/5">
                <CardHeader>
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <Shield size={18} className="text-primary" />
                    Team Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{report.admin_notes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportDetail;
