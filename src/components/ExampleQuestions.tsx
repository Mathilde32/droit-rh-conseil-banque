
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface ExampleQuestionsProps {
  onQuestionSelect: (question: string) => void;
}

const ExampleQuestions = ({ onQuestionSelect }: ExampleQuestionsProps) => {
  const questions = [
    "Quel est le délai légal de réponse à une candidature ?",
    "Un agent peut-il télétravailler depuis l'étranger ?",
    "Quelle est la durée maximale d'un CDD ?",
    "Comment procéder à une mutation interne ?",
    "Quels sont les congés pour événements familiaux ?",
    "Peut-on refuser une formation obligatoire ?"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {questions.map((question, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => onQuestionSelect(question)}
          className="h-auto p-4 text-left justify-start font-serif text-slate-700 hover:bg-blue-50 hover:border-bdf-blue hover:text-bdf-blue transition-all duration-200 rounded-xl border-slate-200"
          aria-label={`Sélectionner la question: ${question}`}
        >
          <MessageCircle className="w-5 h-5 mr-3 text-bdf-blue flex-shrink-0" />
          <span className="leading-relaxed">{question}</span>
        </Button>
      ))}
    </div>
  );
};

export default ExampleQuestions;
