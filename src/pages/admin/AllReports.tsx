import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, Eye, AlertTriangle, Calendar, Search, Filter, 
  ChevronLeft, ChevronRight, Download
} from 'lucide-react';

const AllReports = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<any[]>([]);
  const [filteredReports, setFilteredReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, statusFilter, severityFilter]);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({ title: 'Error fetching reports', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];
    
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.incident_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }
    
    if (severityFilter !== 'all') {
      filtered = filtered.filter(r => r.severity === severityFilter);
    }
    
    setFilteredReports(filtered);
    setCurrentPage(1);
  };

  const updateStatus = async (reportId: string, newStatus: 'pending' | 'under_review' | 'resolved' | 'closed') => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({ status: newStatus })
        .eq('id', reportId);
      
      if (error) throw error;
      
      setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
      toast({ title: 'Status updated successfully' });
    } catch (error) {
      toast({ title: 'Error updating status', variant: 'destructive' });
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

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink to-primary flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              All Reports
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <AlertTriangle size={16} className="mr-2" />
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : paginatedReports.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <FileText size={32} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No reports found</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {paginatedReports.map((report) => (
                  <div 
                    key={report.id} 
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
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
                        <p className="text-sm text-muted-foreground truncate">{report.description}</p>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AllReports;
