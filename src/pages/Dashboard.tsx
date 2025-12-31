import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shield,
} from 'lucide-react';

interface ReportStats {
  total: number;
  pending: number;
  underReview: number;
  resolved: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ReportStats>({
    total: 0,
    pending: 0,
    underReview: 0,
    resolved: 0,
  });
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch user's reports
        const { data: reports, error } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Calculate stats
        const statsData: ReportStats = {
          total: reports?.length || 0,
          pending: reports?.filter((r) => r.status === 'pending').length || 0,
          underReview: reports?.filter((r) => r.status === 'under_review').length || 0,
          resolved: reports?.filter((r) => r.status === 'resolved' || r.status === 'closed').length || 0,
        };

        setStats(statsData);
        setRecentReports(reports?.slice(0, 3) || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const statCards = [
    {
      label: 'Total Reports',
      value: stats.total,
      icon: FileText,
      color: 'text-primary',
      bgColor: 'bg-teal-light',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      label: 'Under Review',
      value: stats.underReview,
      icon: AlertCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'under_review':
        return 'bg-blue-100 text-blue-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Welcome back
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your reports and activities.
            </p>
          </div>
          <Button asChild variant="hero" size="lg">
            <Link to="/dashboard/report">
              <Plus size={20} />
              New Report
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => (
            <Card
              key={stat.label}
              className="border-0 shadow-soft animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon size={24} className={stat.color} />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions & Recent Reports */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="font-display text-xl">Quick Actions</CardTitle>
              <CardDescription>Get help or submit a new report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link
                to="/dashboard/report"
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-all group"
              >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Plus size={24} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Submit New Report</h3>
                  <p className="text-sm text-muted-foreground">Report an incident safely and confidentially</p>
                </div>
                <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                to="/dashboard/my-reports"
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all group"
              >
                <div className="w-12 h-12 bg-pink-light rounded-xl flex items-center justify-center">
                  <FileText size={24} className="text-pink" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">View My Reports</h3>
                  <p className="text-sm text-muted-foreground">Track the status of your submissions</p>
                </div>
                <ArrowRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="font-display text-xl">Recent Reports</CardTitle>
              <CardDescription>Your latest submissions</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentReports.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield size={32} className="text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No reports yet</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/dashboard/report">Submit your first report</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <Link
                      key={report.id}
                      to={`/dashboard/my-reports/${report.id}`}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 bg-teal-light rounded-lg flex items-center justify-center">
                        <FileText size={20} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{report.incident_type}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(report.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status.replace('_', ' ')}
                      </span>
                    </Link>
                  ))}
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/dashboard/my-reports">
                      View All Reports
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Safety Notice */}
        <Card className="border-0 shadow-soft bg-gradient-to-r from-primary/5 to-pink/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">Your Safety is Our Priority</h3>
                <p className="text-sm text-muted-foreground">
                  All reports are handled with complete confidentiality. Our trained team reviews each case carefully 
                  and takes appropriate action to ensure your safety and well-being.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
