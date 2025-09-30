import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from '@/store/AuthContext';
function Navigation() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="relative z-20 bg-white/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              <Link to='/'>EventHub</Link>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/events"
              className="text-foreground hover:text-primary transition-colors"
            >
              Browse Events
            </Link>
            <Link
              to="/create-event"
              className="text-foreground hover:text-primary transition-colors"
            >
              Create Event
            </Link>
            <Link
              to="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Help
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                {" "}
                <Link to="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button className="gradient-primary text-white hover:shadow-medium transition-all">
                    Sign Up
                  </Button>
                </Link>
              </>
            ):
            <Link className="bg-primary  p-2 text-primary-foreground hover:bg-primary/90 rounded-sm" to='/dashboard'>
              Dashboard
            </Link>
          }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
