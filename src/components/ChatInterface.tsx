import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardFooter } from "@/components/ui/card";
import { generateResponse, ChatMessage as AIChatMessage } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  category: string;
  welcomeMessage: string;
}

const ChatInterface = ({ category, welcomeMessage }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: welcomeMessage }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (input.trim() === "" || isLoading) return;
    
    const userMessage = input.trim();
    setInput("");
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    
    try {
      // Convert messages to format expected by the AI service
      // Only send the last 5 messages to avoid token limits
      const recentMessages = messages.slice(-5);
      const messageHistory: AIChatMessage[] = recentMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the new user message
      messageHistory.push({
        role: 'user',
        content: userMessage
      });
      
      // Call the AI service
      const response = await generateResponse(messageHistory, category);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.message.content 
      }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again later.",
        variant: "destructive",
      });
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm sorry, I encountered an error while processing your request. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-secondary rounded-lg shadow-md">
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
        <h3 className="text-lg font-medium">{category} Legal Assistant</h3>
        <p className="text-sm opacity-80">Ask any questions related to {category.toLowerCase()} law</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div 
            key={i} 
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-white border border-border"
              }`}
            >
              <div className="flex items-center mb-1">
                {message.role === "user" ? (
                  <>
                    <span className="font-medium text-sm">You</span>
                    <User className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4 mr-1" />
                    <span className="font-medium text-sm">Legal Assistant</span>
                  </>
                )}
              </div>
              <div className="text-sm whitespace-pre-line">{message.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-border rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center">
                <Bot className="h-4 w-4 mr-1" />
                <span className="font-medium text-sm">Legal Assistant</span>
              </div>
              <div className="flex items-center mt-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="ml-2 text-sm">Generating response...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <CardFooter className="bg-white p-4 border-t">
        <div className="flex items-center w-full gap-2">
          <Textarea 
            placeholder={`Type your ${category.toLowerCase()} law question...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button 
            onClick={handleSend} 
            disabled={input.trim() === "" || isLoading}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};

export default ChatInterface;
