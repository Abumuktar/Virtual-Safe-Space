import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminManagement from '@/components/admin/AdminManagement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, Users, Clock, CheckCircle, AlertTriangle, Eye, 
  TrendingUp, Activity, BarChart3, Shield, Calendar,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({ total: 0, pending: 0, underReview: 0, resolved: 0 });
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'admins'>('overview');

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
      toast({ title: 'Status updated successfully' });
    } catch (error) {
      toast({ title: 'Error updating status', variant: 'destructive' });
    }
  };

  const statCards = [
    { 
      label: 'Total Reports', 
      value: stats.total, 
      icon: FileText, 
      color: 'text-primary', 
      bg: 'bg-teal-light',
      gradient: 'from-primary/20 to-primary/5',
      trend: '+12%',
      trendUp: true
    },
    { 
      label: 'Pending', 
      value: stats.pending, 
      icon: Clock, 
      color: 'text-amber-600', 
      bg: 'bg-amber-100',
      gradient: 'from-amber-500/20 to-amber-500/5',
      trend: stats.pending > 0 ? 'Action needed' : 'All clear',
      trendUp: stats.pending === 0
    },
    { 
      label: 'Under Review', 
      value: stats.underReview, 
      icon: Activity, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100',
      gradient: 'from-blue-500/20 to-blue-500/5',
      trend: 'In progress',
      trendUp: true
    },
    { 
      label: 'Resolved', 
      value: stats.resolved, 
      icon: CheckCircle, 
      color: 'text-green-600', 
      bg: 'bg-green-100',
      gradient: 'from-green-500/20 to-green-500/5',
      trend: stats.total > 0 ? `${Math.round((stats.resolved / stats.total) * 100)}%` : '0%',
      trendUp: true
    },
  ];

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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink to-primary flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Manage and review all reports</p>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex bg-muted rounded-xl p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'overview' 
                  ? 'bg-card shadow-sm text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BarChart3 size={16} className="inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'admins' 
                  ? 'bg-card shadow-sm text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users size={16} className="inline mr-2" />
              Admins
            </button>
          </div>
        </div>

        {activeTab === 'overview' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {statCards.map((stat, index) => (
                <Card 
                  key={stat.label} 
                  className="border-0 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden group"
                >
                  <CardContent className="p-6 relative">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    
                    <div className="relative flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="font-display text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                        <div className={`flex items-center gap-1 mt-2 text-xs ${stat.trendUp ? 'text-green-600' : 'text-amber-600'}`}>
                          {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          <span>{stat.trend}</span>
                        </div>
                      </div>
                      <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <stat.icon size={28} className={stat.color} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Reports */}
            <Card className="border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="font-display flex items-center gap-2">
                  <FileText size={20} className="text-primary" />
                  Recent Reports
                </CardTitle>
                <Link to="/admin/all-reports">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : recentReports.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <FileText size={32} className="text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No reports yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Reports will appear here when submitted</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentReports.map((report) => (
                      <div 
                        key={report.id} 
                        className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors"
                      >
                        {/* Left: Icon & Info */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            report.severity === 'high' || report.severity === 'critical' 
                              ? 'bg-red-100' 
                              : 'bg-primary/10'
                          }`}>
                            <AlertTriangle size={24} className={
                              report.severity === 'high' || report.severity === 'critical' 
                                ? 'text-red-600' 
                                : 'text-primary'
                            } />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-foreground truncate">{report.incident_type}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date(report.created_at).toLocaleDateString()}
                              </span>
                              {report.severity && (
                                <Badge variant="outline" className={`text-xs ${getSeverityBadge(report.severity)}`}>
                                  {report.severity}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Status & Actions */}
                        <div className="flex items-center gap-3 ml-16 md:ml-0">
                          <Select 
                            value={report.status} 
                            onValueChange={(v) => updateStatus(report.id, v as 'pending' | 'under_review' | 'resolved' | 'closed')}
                          >
                            <SelectTrigger className={`w-36 h-9 text-xs rounded-lg border ${getStatusBadge(report.status)}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="under_review">Under Review</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button asChild size="sm" variant="outline" className="rounded-lg">
                            <Link to={`/admin/reports/${report.id}`}>
                              <Eye size={16} className="mr-1" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <AdminManagement />
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
