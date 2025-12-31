import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, CheckCircle, XCircle, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type DialogType = "confirm" | "success" | "error" | "warning" | "info";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: DialogType;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  showCancel?: boolean;
}

const typeConfig: Record<DialogType, { icon: React.ElementType; iconClass: string; bgClass: string }> = {
  confirm: { icon: Info, iconClass: "text-primary", bgClass: "bg-primary/10" },
  success: { icon: CheckCircle, iconClass: "text-green-600", bgClass: "bg-green-100" },
  error: { icon: XCircle, iconClass: "text-destructive", bgClass: "bg-destructive/10" },
  warning: { icon: AlertTriangle, iconClass: "text-yellow-600", bgClass: "bg-yellow-100" },
  info: { icon: Info, iconClass: "text-blue-600", bgClass: "bg-blue-100" },
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  type = "confirm",
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  showCancel = true,
}: ConfirmationDialogProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md animate-scale-in">
        <AlertDialogHeader className="flex flex-col items-center text-center gap-4">
          <div className={cn("w-16 h-16 rounded-full flex items-center justify-center", config.bgClass)}>
            <Icon size={32} className={config.iconClass} />
          </div>
          <AlertDialogTitle className="font-display text-xl">{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-muted-foreground">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-4">
          {showCancel && (
            <AlertDialogCancel onClick={handleCancel} disabled={loading} className="w-full sm:w-auto">
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className={cn(
              "w-full sm:w-auto",
              type === "error" && "bg-destructive hover:bg-destructive/90",
              type === "success" && "bg-green-600 hover:bg-green-700",
              type === "warning" && "bg-yellow-600 hover:bg-yellow-700"
            )}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Hook for easier usage
import { useState, useCallback } from "react";

interface UseConfirmationOptions {
  type?: DialogType;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

export function useConfirmation() {
  const [state, setState] = useState<{
    open: boolean;
    options: UseConfirmationOptions | null;
    resolve: ((confirmed: boolean) => void) | null;
    loading: boolean;
  }>({
    open: false,
    options: null,
    resolve: null,
    loading: false,
  });

  const confirm = useCallback((options: UseConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({ open: true, options, resolve, loading: false });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    state.resolve?.(true);
    setState((prev) => ({ ...prev, open: false }));
  }, [state.resolve]);

  const handleCancel = useCallback(() => {
    state.resolve?.(false);
    setState((prev) => ({ ...prev, open: false }));
  }, [state.resolve]);

  const DialogComponent = state.options ? (
    <ConfirmationDialog
      open={state.open}
      onOpenChange={(open) => {
        if (!open) handleCancel();
      }}
      type={state.options.type}
      title={state.options.title}
      description={state.options.description}
      confirmText={state.options.confirmText}
      cancelText={state.options.cancelText}
      showCancel={state.options.showCancel}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      loading={state.loading}
    />
  ) : null;

  return { confirm, DialogComponent };
}
