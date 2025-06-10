
const Footer = () => {
  return (
    <footer className="bg-bdf-blue text-white py-8" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-bdf-gold rounded-full"></div>
            <div className="w-2 h-2 bg-bdf-gold rounded-full"></div>
            <div className="w-2 h-2 bg-bdf-gold rounded-full"></div>
          </div>
          <p className="font-serif text-sm">
            © Banque de France 2025. Tous droits réservés.
          </p>
          <p className="font-serif text-xs text-blue-200 mt-2">
            Assistant IA développé pour un usage interne - Direction des Ressources Humaines
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
