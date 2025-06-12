
import { Building2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200" role="banner">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo Banque de France */}
            <div className="flex items-center justify-center w-20 h-20">
              <img 
                src="/lovable-uploads/3bc9e671-13a7-4b40-a25d-ea8c4c0465fa.png" 
                alt="Banque de France"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-sans font-bold text-bdf-blue">
                Banque de France
              </h1>
              <p className="text-sm text-slate-600 font-sans">
                Service des Traitements, Indemnités et Prestations
              </p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-bdf-yellow rounded-full"></div>
              <span className="text-sm text-slate-600 font-sans">GalimaIA Assistant RH</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
