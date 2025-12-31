import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import {
  Plus,
  Search,
  Filter,
  FileText,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  ChevronRight,
  Inbox,
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
}

const MyReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReports(data || []);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user]);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.incident_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          color: 'bg-yellow-100 text-yellow-700',
          icon: Clock,
        };
      case 'under_review':
        return {
          label: 'Under Review',
          color: 'bg-blue-100 text-blue-700',
          icon: AlertCircle,
        };
      case 'resolved':
        return {
          label: 'Resolved',
          color: 'bg-green-100 text-green-700',
          icon: CheckCircle,
        };
      case 'closed':
        return {
          label: 'Closed',
          color: 'bg-gray-100 text-gray-700',
          icon: CheckCircle,
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-700',
          icon: Clock,
        };
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-yellow-100 text-yellow-700';
      case 'medium':
        return 'bg-orange-100 text-orange-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'critical':
        return 'bg-red-200 text-red-800';
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
              My Reports
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your submitted reports
            </p>
          </div>
          <Button asChild variant="hero">
            <Link to="/dashboard/report">
              <Plus size={20} />
              New Report
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 h-11">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-soft animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted rounded-xl" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-muted rounded w-1/3" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="h-4 bg-muted rounded w-1/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredReports.length === 0 ? (
          <Card className="border-0 shadow-soft">
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Inbox size={40} className="text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {searchTerm || statusFilter !== 'all' ? 'No matching reports' : 'No reports yet'}
              </h3>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'When you submit a report, it will appear here for you to track.'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button asChild variant="hero">
                  <Link to="/dashboard/report">
                    <Plus size={20} />
                    Submit Your First Report
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report, index) => {
              const statusConfig = getStatusConfig(report.status);
              const StatusIcon = statusConfig.icon;

              return (
                <Card
                  key={report.id}
                  className="border-0 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-up opacity-0"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-light rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText size={24} className="text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-display font-semibold text-lg text-foreground">
                            {report.incident_type}
                          </h3>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                              {report.severity}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}>
                              <StatusIcon size={12} />
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {report.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(report.created_at).toLocaleDateString()}
                          </span>
                          {report.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {report.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <Link
                        to={`/dashboard/my-reports/${report.id}`}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
                      >
                        <Eye size={16} />
                        View
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyReports;
