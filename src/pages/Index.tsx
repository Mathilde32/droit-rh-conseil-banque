
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import NewsletterTab from '@/components/NewsletterTab';
import ChatbotSTIP from '@/components/ChatbotSTIP';
import ChatbotBDF from '@/components/ChatbotBDF';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chatbot-stip');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl" role="main">
        {/* Welcome Section */}
        <section className="text-center mb-8" aria-labelledby="intro-heading">
          <h1 
            id="intro-heading" 
            className="text-4xl md:text-5xl font-sans font-bold text-bdf-blue mb-4 leading-tight"
          >
            GalimaIA – Votre assistant RH
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 font-sans leading-relaxed max-w-4xl mx-auto">
            Bonjour, je suis GalimaIA, votre assistant RH. En quoi puis-je vous aider aujourd'hui ?
          </p>
        </section>

        {/* Main Interface with Tabs */}
        <section className="mb-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border border-slate-200 rounded-2xl p-2">
              <TabsTrigger 
                value="newsletter" 
                className="font-sans font-medium data-[state=active]:bg-bdf-blue data-[state=active]:text-white rounded-xl"
              >
                📂 Newsletter
              </TabsTrigger>
              <TabsTrigger 
                value="chatbot-stip"
                className="font-sans font-medium data-[state=active]:bg-bdf-blue data-[state=active]:text-white rounded-xl"
              >
                🤖 Chatbot STIP
              </TabsTrigger>
              <TabsTrigger 
                value="chatbot-bdf"
                className="font-sans font-medium data-[state=active]:bg-bdf-blue data-[state=active]:text-white rounded-xl"
              >
                🌐 Chatbot BDF
              </TabsTrigger>
            </TabsList>

            <TabsContent value="newsletter" className="space-y-4">
              <NewsletterTab />
            </TabsContent>

            <TabsContent value="chatbot-stip" className="space-y-4">
              <ChatbotSTIP />
            </TabsContent>

            <TabsContent value="chatbot-bdf" className="space-y-4">
              <ChatbotBDF />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
