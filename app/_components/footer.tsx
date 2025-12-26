const Footer = () => {
  return (
    <footer className="border-t-2 border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-12 w-12" />
          </div>

          <div className="flex items-center gap-6 md:gap-14 text-md text-muted-foreground">
            <a href="#" className="hover:text-teal-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-teal-600 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-teal-600 transition-colors">
              Contact
            </a>
          </div>

          <p className="text-md text-muted-foreground">
            © {new Date().getFullYear()} Logofy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
