import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
           <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              <div className="text-2xl font-bold">SlotSwapper</div>
            </Link>        
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact Support
            </a>
          </div>

          <Link to="/sign-up">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Join Now
           </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
