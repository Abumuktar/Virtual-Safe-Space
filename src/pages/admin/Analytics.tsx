import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, TrendingUp, Users, FileText, 
  Calendar, ArrowUpRight, ArrowDownRight, PieChart
} from 'lucide-react';

const Analytics = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    underReview: 0,
    resolved: 0,
    thisMonth: 0,
    lastMonth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data: reports } = await supabase.from('reports').select('*');
      
      if (reports) {
        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

        setStats({
          total: reports.length,
          pending: reports.filter(r => r.status === 'pending').length,
          underReview: reports.filter(r => r.status === 'under_review').length,
          resolved: reports.filter(r => r.status === 'resolved' || r.status === 'closed').length,
          thisMonth: reports.filter(r => new Date(r.created_at) >= thisMonthStart).length,
          lastMonth: reports.filter(r => {
            const date = new Date(r.created_at);
            return date >= lastMonthStart && date <= lastMonthEnd;
          }).length,
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const monthlyChange = stats.lastMonth > 0 
    ? ((stats.thisMonth - stats.lastMonth) / stats.lastMonth * 100).toFixed(1)
    : stats.thisMonth > 0 ? '100' : '0';

  const resolutionRate = stats.total > 0 
    ? ((stats.resolved / stats.total) * 100).toFixed(1)
    : '0';

  const cards = [
    {
      title: 'Total Reports',
      value: stats.total,
      icon: FileText,
      color: 'text-primary',
      bg: 'bg-teal-light',
      description: 'All time reports',
    },
    {
      title: 'This Month',
      value: stats.thisMonth,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      trend: Number(monthlyChange),
      description: 'vs last month',
    },
    {
      title: 'Resolution Rate',
      value: `${resolutionRate}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-100',
      description: 'Cases resolved',
    },
    {
      title: 'Pending Action',
      value: stats.pending,
      icon: Users,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      description: 'Requires attention',
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink to-primary flex items-center justify-center">
              <BarChart3 size={20} className="text-white" />
            </div>
            Analytics
          </h1>
          <p className="text-muted-foreground mt-1">Overview of platform activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card) => (
            <Card key={card.title} className="border-0 shadow-soft hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                    <p className="font-display text-3xl md:text-4xl font-bold text-foreground">{card.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {card.trend !== undefined && (
                        <>
                          {card.trend >= 0 ? (
                            <ArrowUpRight size={14} className="text-green-600" />
                          ) : (
                            <ArrowDownRight size={14} className="text-red-600" />
                          )}
                          <span className={`text-xs ${card.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {Math.abs(card.trend)}%
                          </span>
                        </>
                      )}
                      <span className="text-xs text-muted-foreground">{card.description}</span>
                    </div>
                  </div>
                  <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center`}>
                    <card.icon size={28} className={card.color} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Status Distribution */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart size={20} className="text-primary" />
                Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'Pending', value: stats.pending, color: 'bg-amber-500' },
                  { label: 'Under Review', value: stats.underReview, color: 'bg-blue-500' },
                  { label: 'Resolved', value: stats.resolved, color: 'bg-green-500' },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: stats.total > 0 ? `${(item.value / stats.total) * 100}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Resolution Time</p>
                    <p className="text-2xl font-bold text-foreground">2.5 days</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp size={24} className="text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-bold text-foreground">98%</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users size={24} className="text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">User Satisfaction</p>
                    <p className="text-2xl font-bold text-foreground">4.8/5</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <FileText size={24} className="text-pink" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
