
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import TypingIndicator from '@/components/TypingIndicator';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  sources?: Array<{
    title: string;
    url: string;
    date: string;
    theme: string;
  }>;
  actionSuggestion?: string;
}

const ChatbotSTIP = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulation réponse IA avec sources STIP
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `**Réponse réglementaire :**

Concernant votre question "${userMessage.content}", voici les dernières informations réglementaires :

Les dispositions récentes du Code du travail précisent que les modalités de traitement des congés ont été mises à jour selon les derniers décrets.

**Sources consultées :**`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: [
          {
            title: 'Code du travail, art. L3141-1',
            url: 'https://legifrance.gouv.fr',
            date: '2024-12-01',
            theme: 'Congés / Absences / Temps de travail'
          },
          {
            title: 'Bulletin Officiel des Impôts',
            url: 'https://bofip.impots.gouv.fr',
            date: '2024-11-15',
            theme: 'Paie / Cotisations / DSN'
          }
        ],
        actionSuggestion: 'Vérifiez le barème IJSS du mois en cours'
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-bdf-blue text-white px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-bdf-yellow rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-bdf-blue" />
          </div>
          <div>
            <h3 className="font-sans font-semibold">Chatbot métier STIP</h3>
            <p className="text-sm text-blue-100">Veille réglementaire RH/Paie</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto p-6 space-y-4" role="log" aria-live="polite">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="w-16 h-16 text-bdf-blue mx-auto mb-4" />
            <p className="text-lg font-sans text-slate-600">
              Posez-moi vos questions sur la veille réglementaire RH/Paie
            </p>
            <p className="text-sm text-slate-500 font-sans mt-2">
              Je consulte les newsletters et sources officielles (Légifrance, URSSAF, etc.)
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-slate-200 ml-3' 
                  : 'bg-bdf-blue mr-3'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-slate-600" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              
              <div className={`rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-slate-100 text-slate-800'
                  : 'bg-bdf-light-blue/10 text-slate-800'
              }`}>
                <div className="whitespace-pre-wrap font-sans leading-relaxed">
                  {message.content}
                </div>
                
                {message.sources && (
                  <div className="mt-4 space-y-2">
                    {message.sources.map((source, index) => (
                      <div key={index} className="border border-bdf-blue/20 rounded-lg p-3 bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline" className="text-xs border-bdf-blue/50 text-bdf-blue">
                            {source.theme}
                          </Badge>
                          <span className="text-xs text-slate-500">{source.date}</span>
                        </div>
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-bdf-blue hover:text-bdf-dark-blue text-sm font-medium"
                        >
                          {source.title}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {message.actionSuggestion && (
                  <div className="mt-3 p-3 bg-bdf-yellow/20 rounded-lg border border-bdf-yellow/30">
                    <p className="text-sm font-sans">
                      <strong>Action suggérée :</strong> {message.actionSuggestion}
                    </p>
                  </div>
                )}
                
                <p className="text-xs text-slate-400 mt-2">
                  {message.timestamp.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="border-t border-slate-200 p-6">
        <div className="flex space-x-4">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez-moi votre question"
            className="flex-1 resize-none font-sans focus:ring-bdf-blue focus:border-bdf-blue"
            rows={2}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-bdf-blue hover:bg-bdf-dark-blue text-white px-6 py-2 rounded-xl self-end"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSTIP;
