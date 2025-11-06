const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="text-xl font-bold mb-2">SlotSwapper</div>
            <p className="text-sm text-muted-foreground">
              Exchange time slots seamlessly with peer-to-peer matching
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 SlotSwapper. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
