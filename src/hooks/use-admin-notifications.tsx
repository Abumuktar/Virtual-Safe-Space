import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  type: 'new_report' | 'status_change' | 'new_message';
  reportId: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

export function useAdminNotifications() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isAdmin) return;

    // Subscribe to new reports
    const channel = supabase
      .channel('admin-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'reports',
        },
        (payload) => {
          const newReport = payload.new as any;
          const notification: Notification = {
            id: `report-${newReport.id}`,
            type: 'new_report',
            reportId: newReport.id,
            message: `New ${newReport.severity || 'medium'} priority report: ${newReport.incident_type}`,
            createdAt: new Date(),
            read: false,
          };

          setNotifications((prev) => [notification, ...prev.slice(0, 9)]);
          setUnreadCount((prev) => prev + 1);

          // Show toast notification
          toast({
            title: '🔔 New Report Submitted',
            description: notification.message,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'report_updates',
        },
        (payload) => {
          const update = payload.new as any;
          if (!update.is_admin_update) {
            const notification: Notification = {
              id: `update-${update.id}`,
              type: 'new_message',
              reportId: update.report_id,
              message: 'New message on a report',
              createdAt: new Date(),
              read: false,
            };

            setNotifications((prev) => [notification, ...prev.slice(0, 9)]);
            setUnreadCount((prev) => prev + 1);

            toast({
              title: '💬 New Message',
              description: 'A user has sent a new message on their report.',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, toast]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
}
