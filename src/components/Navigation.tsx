import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-poppins font-bold bg-gradient-hero bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              FirstHello
            </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {!isHomePage && (
              <Link to="/dashboard">
                <Button variant="ghost">
                  Dashboard
                </Button>
              </Link>
            )}
            <Button variant="ghost">
              Help
            </Button>
            <Link to="/signin">
              <Button variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;