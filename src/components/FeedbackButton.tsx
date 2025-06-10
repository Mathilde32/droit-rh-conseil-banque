
import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    // Here you would normally send the feedback to your backend
    console.log('Feedback submitted:', feedback);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setFeedback('');
    }, 2000);
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-bdf-gold hover:bg-bdf-gold/90 text-bdf-blue shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        aria-label="Donner mon avis"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-serif text-bdf-blue">
                Donner mon avis
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isSubmitted ? (
                <>
                  <p className="text-sm text-slate-600 font-serif">
                    Votre retour nous aide à améliorer l'assistant IA RH.
                  </p>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Partagez votre expérience, suggestions d'amélioration..."
                    className="min-h-[100px] font-serif"
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSubmit}
                      disabled={!feedback.trim()}
                      className="bg-bdf-blue hover:bg-bdf-blue/90 text-white flex-1"
                    >
                      Envoyer
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-green-600 font-serif font-semibold">
                    Merci pour votre retour !
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
