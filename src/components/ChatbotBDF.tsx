
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TypingIndicator from '@/components/TypingIndicator';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  sources?: string[];
}

const ChatbotBDF = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'stip' | 'bdf'>('stip');
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

    // Simulation réponse adaptée au type d'utilisateur
    setTimeout(() => {
      let responseContent = '';
      let sources: string[] = [];

      if (userType === 'stip') {
        responseContent = `**Réponse pour Agent STIP :**

Concernant "${userMessage.content}", voici les informations internes :

En tant qu'agent STIP, vous avez accès aux procédures spécifiques de traitement des dossiers RH. Cette question relève de nos processus internes de gestion des indemnités et prestations.`;
        sources = ['Procédures internes STIP', 'Manuel utilisateur BDF', 'Directives RH internes'];
      } else {
        responseContent = `**Réponse pour Agent BDF :**

Concernant votre question "${userMessage.content}" :

D'après nos ressources RH internes, voici les informations pertinentes pour les agents de la Banque de France. Cette réponse est basée sur l'intranet RH et les accords d'entreprise en vigueur.

**Informations spécifiques aux agents BDF :**
- Accès aux services RH en ligne
- Procédures de demande de congés
- Modalités de mobilité interne`;
        sources = ['Intranet RH BDF', 'Accords d\'entreprise BDF', 'Guide des agents BDF'];
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'assistant',
        timestamp: new Date(),
        sources: sources,
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
      <div className="bg-bdf-dark-blue text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-bdf-yellow rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-bdf-blue" />
            </div>
            <div>
              <h3 className="font-sans font-semibold">Chatbot RH agents Banque de France</h3>
              <p className="text-sm text-blue-100">Assistant pour tous les agents BDF</p>
            </div>
          </div>
          
          {/* User Type Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-sans">Je suis :</span>
            <Select value={userType} onValueChange={(value: 'stip' | 'bdf') => setUserType(value)}>
              <SelectTrigger className="w-32 bg-white text-bdf-blue border-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stip">Agent STIP</SelectItem>
                <SelectItem value="bdf">Agent BDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto p-6 space-y-4" role="log" aria-live="polite">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-16 h-16 text-bdf-blue mx-auto mb-4" />
            <p className="text-lg font-sans text-slate-600">
              Assistant RH pour les agents de la Banque de France
            </p>
            <p className="text-sm text-slate-500 font-sans mt-2">
              {userType === 'stip' 
                ? 'Mode Agent STIP - Accès aux procédures internes' 
                : 'Mode Agent BDF - Informations RH générales'
              }
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
                  : 'bg-bdf-dark-blue mr-3'
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
                  : 'bg-bdf-pearl-blue/20 text-slate-800'
              }`}>
                <div className="whitespace-pre-wrap font-sans leading-relaxed">
                  {message.content}
                </div>
                
                {message.sources && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 mb-2 flex items-center">
                      <Bot className="w-3 h-3 mr-1" />
                      Sources internes :
                    </p>
                    <ul className="space-y-1">
                      {message.sources.map((source, index) => (
                        <li key={index} className="text-xs text-slate-500 font-sans">
                          • {source}
                        </li>
                      ))}
                    </ul>
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
            placeholder="Posez votre question RH..."
            className="flex-1 resize-none font-sans focus:ring-bdf-blue focus:border-bdf-blue"
            rows={2}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-bdf-dark-blue hover:bg-bdf-blue text-white px-6 py-2 rounded-xl self-end"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotBDF;
