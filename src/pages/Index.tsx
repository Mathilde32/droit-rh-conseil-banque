
import { useState } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import ExampleQuestions from '@/components/ExampleQuestions';
import FeedbackButton from '@/components/FeedbackButton';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl" role="main">
        {/* Introduction Section */}
        <section className="text-center mb-12" aria-labelledby="intro-heading">
          <h1 
            id="intro-heading" 
            className="text-4xl md:text-5xl font-serif font-bold text-bdf-blue mb-6 leading-tight"
          >
            Assistant juridique RH
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 font-serif leading-relaxed max-w-3xl mx-auto">
            Posez vos questions RH. Notre assistant IA vous répond avec rigueur et fiabilité.
          </p>
        </section>

        {/* Chat Interface */}
        <section className="mb-12" aria-labelledby="chat-heading">
          <h2 id="chat-heading" className="sr-only">Interface de discussion</h2>
          <ChatInterface selectedQuestion={selectedQuestion} onQuestionProcessed={() => setSelectedQuestion('')} />
        </section>

        {/* Example Questions */}
        <section aria-labelledby="examples-heading">
          <h2 id="examples-heading" className="text-2xl font-serif font-semibold text-bdf-blue mb-6 text-center">
            Questions fréquentes
          </h2>
          <ExampleQuestions onQuestionSelect={handleQuestionSelect} />
        </section>
      </main>

      <FeedbackButton />
      <Footer />
    </div>
  );
};

export default Index;
