import { useState, useEffect, useCallback } from "react";
import { Search, X, FileText, Users, BookOpen, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "page" | "faq" | "resource" | "action";
  href: string;
  icon: typeof FileText;
}

const searchData: SearchResult[] = [
  // Pages
  { id: "1", title: "Home", description: "Return to the main page", category: "page", href: "/", icon: FileText },
  { id: "2", title: "About Us", description: "Learn about Virtual Safe Space", category: "page", href: "/#about", icon: Users },
  { id: "3", title: "Our Mission", description: "Our vision and mission for child protection", category: "page", href: "/#mission", icon: FileText },
  { id: "4", title: "Focus Areas", description: "Explore our key focus areas", category: "page", href: "/#focus", icon: FileText },
  { id: "5", title: "How It Works", description: "Learn how to use our platform", category: "page", href: "/#how-it-works", icon: FileText },
  { id: "6", title: "Resources", description: "Educational resources and guides", category: "page", href: "/resources", icon: BookOpen },
  { id: "7", title: "Our Team", description: "Meet the VSS team", category: "page", href: "/team", icon: Users },
  { id: "8", title: "Privacy Policy", description: "How we protect your data", category: "page", href: "/privacy", icon: FileText },
  { id: "9", title: "Terms of Service", description: "Our terms and conditions", category: "page", href: "/terms", icon: FileText },
  
  // Actions
  { id: "10", title: "Report Harassment", description: "Submit a confidential report", category: "action", href: "/signup", icon: FileText },
  { id: "11", title: "Create Account", description: "Sign up for Virtual Safe Space", category: "action", href: "/signup", icon: Users },
  { id: "12", title: "Login", description: "Access your dashboard", category: "action", href: "/login", icon: Users },
  
  // FAQs
  { id: "13", title: "Is my report confidential?", description: "Yes, your identity and information are encrypted and secure", category: "faq", href: "/#faq", icon: HelpCircle },
  { id: "14", title: "Can I report anonymously?", description: "Yes, you can create an anonymous account", category: "faq", href: "/#faq", icon: HelpCircle },
  { id: "15", title: "What happens after I submit a report?", description: "Our team reviews and responds within 24-48 hours", category: "faq", href: "/#faq", icon: HelpCircle },
  
  // Resources
  { id: "16", title: "Child Safety Guide", description: "How to recognize and prevent abuse", category: "resource", href: "/resources", icon: BookOpen },
  { id: "17", title: "Mental Health Resources", description: "Support for emotional wellbeing", category: "resource", href: "/resources", icon: BookOpen },
  { id: "18", title: "Parent's Guide", description: "How parents can protect their children", category: "resource", href: "/resources", icon: BookOpen },
];

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchModal = ({ open, onOpenChange }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  const handleSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered);
  }, []);

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  const handleSelect = (result: SearchResult) => {
    onOpenChange(false);
    handleClear();
    
    if (result.href.startsWith("/#")) {
      const element = document.querySelector(result.href.replace("/", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(result.href);
    }
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const getCategoryColor = (category: SearchResult["category"]) => {
    switch (category) {
      case "page":
        return "bg-primary/10 text-primary";
      case "action":
        return "bg-pink/10 text-pink";
      case "faq":
        return "bg-accent/10 text-accent";
      case "resource":
        return "bg-teal/10 text-teal";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Virtual Safe Space</DialogTitle>
        </DialogHeader>
        
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search size={20} className="text-muted-foreground flex-shrink-0" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, resources, FAQs..."
            className="border-0 bg-transparent text-lg focus-visible:ring-0 placeholder:text-muted-foreground/60"
            autoFocus
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="h-8 w-8 flex-shrink-0"
            >
              <X size={16} />
            </Button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <Search size={40} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No results found</p>
              <p className="text-sm">Try searching for pages, FAQs, or resources</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full flex items-start gap-4 p-3 rounded-lg hover:bg-muted/80 transition-colors text-left group"
                >
                  <div className={`p-2 rounded-lg ${getCategoryColor(result.category)}`}>
                    <result.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {result.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {result.description}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(result.category)} capitalize`}>
                    {result.category}
                  </span>
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">Quick Links</p>
              <div className="grid grid-cols-2 gap-2">
                {searchData.slice(0, 6).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/80 transition-colors text-left"
                  >
                    <item.icon size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t border-border bg-muted/30 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono">↵</kbd>
              to select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono">esc</kbd>
              to close
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border font-mono">K</kbd>
            to search
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
