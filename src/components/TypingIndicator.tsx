
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[80%] items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-bdf-blue flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        
        <div className="bg-blue-50 rounded-2xl px-4 py-3">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-slate-600 font-serif">L'assistant réfléchit</span>
            <div className="flex space-x-1 ml-2">
              <div className="w-2 h-2 bg-bdf-blue rounded-full typing-indicator"></div>
              <div className="w-2 h-2 bg-bdf-blue rounded-full typing-indicator" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-bdf-blue rounded-full typing-indicator" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
