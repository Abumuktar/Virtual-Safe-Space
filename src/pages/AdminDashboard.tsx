import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Users, Clock, CheckCircle, AlertTriangle, Eye, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({ total: 0, pending: 0, underReview: 0, resolved: 0 });
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: reports } = await supabase.from('reports').select('*').order('created_at', { ascending: false });
        if (reports) {
          setStats({
            total: reports.length,
            pending: reports.filter(r => r.status === 'pending').length,
            underReview: reports.filter(r => r.status === 'under_review').length,
            resolved: reports.filter(r => r.status === 'resolved' || r.status === 'closed').length,
          });
          setRecentReports(reports.slice(0, 5));
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateStatus = async (reportId: string, newStatus: 'pending' | 'under_review' | 'resolved' | 'closed') => {
    try {
      await supabase.from('reports').update({ status: newStatus }).eq('id', reportId);
      setRecentReports(prev => prev.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
      toast({ title: 'Status updated' });
    } catch (error) {
      toast({ title: 'Error updating status', variant: 'destructive' });
    }
  };

  const statCards = [
    { label: 'Total Reports', value: stats.total, icon: FileText, color: 'text-primary', bg: 'bg-teal-light' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Under Review', value: stats.underReview, icon: AlertTriangle, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage and review all reports</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <stat.icon size={24} className={stat.color} />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="font-display">Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : recentReports.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No reports yet</p>
            ) : (
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="flex-1">
                      <p className="font-medium">{report.incident_type}</p>
                      <p className="text-sm text-muted-foreground">{new Date(report.created_at).toLocaleDateString()}</p>
                    </div>
                    <Select value={report.status} onValueChange={(v) => updateStatus(report.id, v as 'pending' | 'under_review' | 'resolved' | 'closed')}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/admin/reports/${report.id}`}><Eye size={16} /></Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
