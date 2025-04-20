
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MessageCircle } from 'lucide-react';

interface Answer {
  _id: string;
  lawyerId: string;
  lawyerName: string;
  answer: string;
  createdAt: string;
}

interface FAQ {
  _id: string;
  userId: string;
  userName: string;
  question: string;
  answers: Answer[];
  createdAt: string;
}

const FAQ = () => {
  const { user } = useAuth();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingFaqs, setFetchingFaqs] = useState(true);
  
  // For answering questions
  const [isAnswerDialogOpen, setIsAnswerDialogOpen] = useState(false);
  const [currentFaqId, setCurrentFaqId] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [answerLoading, setAnswerLoading] = useState(false);
  
  // Fetch all FAQs
  useEffect(() => {
    fetchFaqs();
  }, []);
  
  const fetchFaqs = async () => {
    try {
      setFetchingFaqs(true);
      const response = await fetch('/api/faq');
      
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error('Failed to load questions');
    } finally {
      setFetchingFaqs(false);
    }
  };
  
  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to ask a question');
      return;
    }
    
    if (!question.trim()) {
      toast.error('Question cannot be empty');
      return;
    }
    
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('/api/faq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ question })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post question');
      }
      
      const newFaq = await response.json();
      setFaqs([newFaq, ...faqs]);
      setQuestion('');
      toast.success('Question posted successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to post question');
    } finally {
      setLoading(false);
    }
  };
  
  const openAnswerDialog = (faqId: string) => {
    setCurrentFaqId(faqId);
    setAnswer('');
    setIsAnswerDialogOpen(true);
  };
  
  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || user.role !== 'Lawyer') {
      toast.error('Only lawyers can answer questions');
      return;
    }
    
    if (!answer.trim()) {
      toast.error('Answer cannot be empty');
      return;
    }
    
    try {
      setAnswerLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`/api/faq/${currentFaqId}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answer })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post answer');
      }
      
      const data = await response.json();
      
      // Update the local state
      setFaqs(faqs.map(faq => {
        if (faq._id === currentFaqId) {
          return {
            ...faq,
            answers: [...faq.answers, data.answer]
          };
        }
        return faq;
      }));
      
      setIsAnswerDialogOpen(false);
      toast.success('Answer posted successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to post answer');
    } finally {
      setAnswerLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-2">
            Ask your legal questions and get answers from professional lawyers
          </p>
        </div>
        
        {user && (
          <Card>
            <CardHeader>
              <CardTitle>Ask a Question</CardTitle>
              <CardDescription>
                Your question will be visible to all lawyers on the platform
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleAskQuestion}>
              <CardContent>
                <Textarea
                  placeholder="Enter your legal question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Posting...' : 'Ask Question'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
        
        {!user && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-4">
                <h3 className="font-semibold text-lg">Please Sign In</h3>
                <p className="text-muted-foreground mt-2">
                  You need to login to ask questions or post answers
                </p>
                <Button className="mt-4" onClick={() => window.location.href = '/auth'}>
                  Sign In / Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Questions</h2>
          
          {fetchingFaqs ? (
            <div className="text-center p-8">Loading questions...</div>
          ) : faqs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p>No questions have been asked yet. Be the first to ask!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq._id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                        <CardDescription>
                          Asked by {faq.userName} on {formatDate(faq.createdAt)}
                        </CardDescription>
                      </div>
                      {user && user.role === 'Lawyer' && (
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => openAnswerDialog(faq._id)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Answer
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {faq.answers.length === 0 ? (
                      <p className="text-muted-foreground italic">
                        No answers yet.
                      </p>
                    ) : (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="answers">
                          <AccordionTrigger>
                            {faq.answers.length} {faq.answers.length === 1 ? 'Answer' : 'Answers'}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 mt-2">
                              {faq.answers.map((answer, index) => (
                                <div key={answer._id} className="bg-muted p-4 rounded-md">
                                  <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>{answer.lawyerName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex justify-between">
                                        <p className="font-medium">{answer.lawyerName}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {formatDate(answer.createdAt)}
                                        </p>
                                      </div>
                                      <p className="mt-2">{answer.answer}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={isAnswerDialogOpen} onOpenChange={setIsAnswerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Answer this Question</DialogTitle>
            <DialogDescription>
              Your answer will be publicly visible to all users
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitAnswer}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Write your answer here..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={5}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAnswerDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={answerLoading}>
                {answerLoading ? 'Posting...' : 'Post Answer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FAQ;
