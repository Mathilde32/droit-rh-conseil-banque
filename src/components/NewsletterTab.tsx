
import { useState } from 'react';
import { Search, FileText, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Newsletter {
  id: string;
  title: string;
  date: string;
  url: string;
  preview: string;
  type: 'mensuelle' | 'hebdomadaire';
}

const NewsletterTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Newsletters avec dates de cette semaine
  const newsletters: Newsletter[] = [
    {
      id: '1',
      title: 'Newsletter RH Hebdomadaire - Évolutions réglementaires',
      date: '2025-01-13',
      url: '#',
      preview: 'Mise à jour des taux AT/MP 2025 et nouvelles dispositions sur les congés payés...',
      type: 'hebdomadaire'
    },
    {
      id: '2',
      title: 'Newsletter RH - Mise à jour DSN Janvier 2025',
      date: '2025-01-12',
      url: '#',
      preview: 'Modifications importantes dans la déclaration sociale nominative pour la nouvelle année...',
      type: 'mensuelle'
    },
    {
      id: '3',
      title: 'Newsletter RH - Accidents du travail et taux AT/MP',
      date: '2025-01-10',
      url: '#',
      preview: 'Nouveaux taux AT/MP 2025 : secteur bancaire et services supports...',
      type: 'mensuelle'
    },
    {
      id: '4',
      title: 'Newsletter RH - Réglementation temps de travail',
      date: '2025-01-08',
      url: '#',
      preview: 'Nouvelles directives sur l\'organisation du temps de travail et télétravail...',
      type: 'mensuelle'
    },
  ];

  const filteredNewsletters = newsletters.filter(newsletter =>
    newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    newsletter.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Rechercher dans les newsletters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 font-sans border-bdf-blue/20 focus:border-bdf-blue focus:ring-bdf-blue"
        />
      </div>

      {/* Newsletters List */}
      <div className="space-y-4">
        <h2 className="text-xl font-sans font-semibold text-bdf-blue mb-4">
          Archives newsletters (du plus récent au plus ancien)
        </h2>
        
        {filteredNewsletters.map((newsletter) => (
          <Card key={newsletter.id} className="hover:shadow-lg transition-shadow border-bdf-blue/10">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-sans text-bdf-blue flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-bdf-light-blue" />
                  <span>{newsletter.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    newsletter.type === 'hebdomadaire' 
                      ? 'bg-bdf-yellow/20 text-bdf-blue' 
                      : 'bg-bdf-light-blue/20 text-bdf-blue'
                  }`}>
                    {newsletter.type}
                  </span>
                </CardTitle>
                <div className="flex items-center text-sm text-slate-500 font-sans">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(newsletter.date).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 font-sans mb-4">{newsletter.preview}</p>
              <Button 
                variant="outline" 
                className="border-bdf-blue text-bdf-blue hover:bg-bdf-blue hover:text-white font-sans"
              >
                Consulter le PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNewsletters.length === 0 && (
        <div className="text-center py-8">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-sans">Aucune newsletter trouvée pour votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default NewsletterTab;
