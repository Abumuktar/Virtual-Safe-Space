import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { reportSchema, INCIDENT_TYPES, SEVERITY_LEVELS } from '@/lib/validations';
import {
  Shield,
  Calendar,
  MapPin,
  AlertTriangle,
  FileText,
  Send,
  Loader2,
  Lock,
  Info,
} from 'lucide-react';

const severityOptions = [
  { value: 'low' as const, label: 'Low - Minor incident', color: 'text-yellow-600' },
  { value: 'medium' as const, label: 'Medium - Moderate concern', color: 'text-orange-600' },
  { value: 'high' as const, label: 'High - Serious situation', color: 'text-red-600' },
  { value: 'critical' as const, label: 'Critical - Immediate danger', color: 'text-red-700' },
];

const ReportHarassment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    incidentType: '' as typeof INCIDENT_TYPES[number] | '',
    incidentDate: '',
    location: '',
    severity: 'medium' as typeof SEVERITY_LEVELS[number],
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate with zod
    const result = reportSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const validatedData = result.data;
      
      const { error } = await supabase.from('reports').insert({
        user_id: user?.id,
        incident_type: validatedData.incidentType,
        incident_date: validatedData.incidentDate || null,
        location: validatedData.location || null,
        severity: validatedData.severity,
        description: validatedData.description,
        status: 'pending',
      });

      if (error) throw error;

      toast({
        title: 'Report submitted successfully',
        description: 'Our team will review your report and take appropriate action.',
      });

      navigate('/dashboard/my-reports');
    } catch (error: any) {
      console.error('Error submitting report:', error);
      toast({
        title: 'Failed to submit report',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Shield size={16} />
            <span>Confidential Report</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Report an Incident
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Your report is completely confidential. Take your time and share as much as you're comfortable with.
          </p>
        </div>

        {/* Safety Notice */}
        <Card className="border-0 shadow-soft bg-gradient-to-r from-pink/5 to-primary/5">
          <CardContent className="p-4 flex items-start gap-3">
            <Info size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">You are safe here</p>
              <p className="text-muted-foreground">
                All information you share is encrypted and only accessible to our trained team.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-xl flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Incident Details
            </CardTitle>
            <CardDescription>
              Fields marked with * are required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Incident Type */}
              <div className="space-y-2">
                <Label htmlFor="incidentType" className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-muted-foreground" />
                  Type of Incident *
                </Label>
                <Select
                  value={formData.incidentType}
                  onValueChange={(value) => setFormData({ ...formData, incidentType: value as typeof INCIDENT_TYPES[number] })}
                >
                  <SelectTrigger className={`h-12 ${errors.incidentType ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select the type of incident" />
                  </SelectTrigger>
                  <SelectContent>
                    {INCIDENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.incidentType && (
                  <p className="text-sm text-destructive">{errors.incidentType}</p>
                )}
              </div>

              {/* Date and Location Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="incidentDate" className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    When did it happen?
                  </Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                    className={`h-12 ${errors.incidentDate ? 'border-destructive' : ''}`}
                  />
                  {errors.incidentDate && (
                    <p className="text-sm text-destructive">{errors.incidentDate}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin size={16} className="text-muted-foreground" />
                    Where did it happen?
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., School, Home, Online"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={`h-12 ${errors.location ? 'border-destructive' : ''}`}
                    maxLength={255}
                  />
                  {errors.location && (
                    <p className="text-sm text-destructive">{errors.location}</p>
                  )}
                </div>
              </div>

              {/* Severity */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-muted-foreground" />
                  How serious is this situation?
                </Label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) => setFormData({ ...formData, severity: value as typeof SEVERITY_LEVELS[number] })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {severityOptions.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <span className={level.color}>{level.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText size={16} className="text-muted-foreground" />
                  Tell us what happened *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Please describe what happened. Include as many details as you're comfortable sharing. You can also describe how you're feeling and what kind of help you need."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`min-h-[180px] resize-none ${errors.description ? 'border-destructive' : ''}`}
                  maxLength={10000}
                />
                <p className={`text-xs ${formData.description.length < 20 ? 'text-muted-foreground' : 'text-green-600'}`}>
                  {formData.description.length < 20 
                    ? `Minimum 20 characters. Currently: ${formData.description.length}/20`
                    : `${formData.description.length}/10,000 characters`
                  }
                </p>
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              {/* Privacy Notice */}
              <div className="flex items-start gap-3 p-4 bg-teal-light/50 rounded-xl">
                <Lock size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Privacy & Confidentiality</p>
                  <p className="text-muted-foreground">
                    Your identity and information are protected. Our team handles every report with care and discretion. 
                    We will never share your details without your consent.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting || formData.description.length < 20}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Report
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Emergency Notice */}
        <Card className="border-2 border-destructive/20 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle size={24} className="text-destructive flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">In Immediate Danger?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  If you are in immediate danger, please contact your local emergency services immediately.
                  Your safety is the top priority.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ReportHarassment;
