
import { Building2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200" role="banner">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo placeholder */}
            <div className="flex items-center justify-center w-16 h-16 bg-bdf-blue rounded-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-bdf-blue">
                Banque de France
              </h1>
              <p className="text-sm text-slate-600 font-serif">
                Direction des Ressources Humaines
              </p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-bdf-gold rounded-full"></div>
              <span className="text-sm text-slate-600 font-serif">Assistant IA RH</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
