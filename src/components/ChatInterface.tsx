
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import TypingIndicator from '@/components/TypingIndicator';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  sources?: string[];
}

interface ChatInterfaceProps {
  selectedQuestion: string;
  onQuestionProcessed: () => void;
}

const ChatInterface = ({ selectedQuestion, onQuestionProcessed }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedQuestion) {
      setInputValue(selectedQuestion);
      onQuestionProcessed();
    }
  }, [selectedQuestion, onQuestionProcessed]);

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

    // Simulate AI response with realistic delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Merci pour votre question concernant "${userMessage.content}". 

En tant qu'assistant juridique RH de la Banque de France, je peux vous informer que cette question relève du cadre réglementaire français en matière de droit du travail.

**Réponse détaillée :**
Selon les dispositions du Code du travail et les accords internes de la Banque de France, voici les éléments juridiques pertinents à votre question.

Cette réponse est basée sur la réglementation en vigueur et les accords collectifs applicables au sein de l'institution.`,
        sender: 'assistant',
        timestamp: new Date(),
        sources: ['Code du travail, art. L1221-20', 'Accord Banque de France 2023', 'Doctrine RH interne'],
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
          <div className="w-10 h-10 bg-bdf-gold rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-bdf-blue" />
          </div>
          <div>
            <h3 className="font-serif font-semibold">Assistant IA RH – Banque de France</h3>
            <p className="text-sm text-blue-100">Assistance juridique en temps réel</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto p-6 space-y-4" role="log" aria-live="polite" aria-label="Conversation">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="w-16 h-16 text-bdf-blue mx-auto mb-4" />
            <p className="text-lg font-serif text-slate-600">
              Bonjour, je suis votre assistant IA RH. En quoi puis-je vous aider aujourd'hui ?
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
                  : 'bg-blue-50 text-slate-800'
              }`}>
                <div className="whitespace-pre-wrap font-serif leading-relaxed">
                  {message.content}
                </div>
                
                {message.sources && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 mb-2 flex items-center">
                      <FileText className="w-3 h-3 mr-1" />
                      Sources :
                    </p>
                    <ul className="space-y-1">
                      {message.sources.map((source, index) => (
                        <li key={index} className="text-xs text-slate-500 font-serif">
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
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez votre question juridique RH..."
            className="flex-1 resize-none font-serif focus:ring-bdf-blue focus:border-bdf-blue"
            rows={2}
            disabled={isLoading}
            aria-label="Saisir votre question"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-bdf-blue hover:bg-bdf-blue/90 text-white px-6 py-2 rounded-xl self-end"
            aria-label="Envoyer le message"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
