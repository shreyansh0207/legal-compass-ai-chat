import { useState } from "react";
import { Star, MessageCircle, CreditCard, ExternalLink, Clock } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LawyerCardProps {
  id: string;
  name: string;
  specialization: string;
  image: string;
  rating: number;
  experience: number;
  availability: string;
  contactInfo?: {
    phone: string;
    email: string;
    availability: string;
  };
}

const LawyerCard = ({ 
  id, 
  name, 
  specialization, 
  image, 
  rating, 
  experience,
  availability,
  contactInfo
}: LawyerCardProps) => {
  const [isPaid, setIsPaid] = useState(!!contactInfo);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  
  const handlePayment = () => {
    setTimeout(() => {
      setIsPaid(true);
      setPaymentDialogOpen(false);
    }, 1500);
  };

  const isAvailableNow = availability.toLowerCase().includes("available now");

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[3/2] w-full overflow-hidden relative">
        <img 
          src={image} 
          alt={`Photo of ${name}`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge 
            variant={isAvailableNow ? "secondary" : "outline"} 
            className={`${isAvailableNow ? 'bg-green-500 text-white' : ''}`}
          >
            <Clock className="mr-1 h-3 w-3" />
            {availability}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="mt-1">{specialization}</CardDescription>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-0">
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="secondary">{experience} Years Experience</Badge>
          <Badge variant="outline">Top Rated</Badge>
        </div>
        
        {isPaid && contactInfo && (
          <div className="mt-4 p-3 bg-secondary rounded-md">
            <h4 className="text-sm font-medium mb-2">Contact Information</h4>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Phone:</span> {contactInfo.phone}</p>
              <p><span className="font-medium">Email:</span> {contactInfo.email}</p>
              <p><span className="font-medium">Availability:</span> {contactInfo.availability}</p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4">
        <Button variant="outline" size="sm">
          <MessageCircle className="mr-2 h-4 w-4" />
          Message Lawyer
        </Button>
        
        {!isPaid ? (
          <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay & Book Advice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book a Paid Consultation</DialogTitle>
                <DialogDescription>
                  Get access to {name}'s contact information and schedule a consultation.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Consultation Fee</span>
                    <span className="font-medium">$99.00</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    One-time payment for direct contact and consultation scheduling.
                  </p>
                </div>
                
                <div className="flex items-center justify-center p-4">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" 
                    alt="Stripe" 
                    className="h-8 mx-2"
                  />
                  <span className="mx-2 text-muted-foreground">or</span>
                  <img 
                    src="https://razorpay.com/assets/razorpay-glyph.svg" 
                    alt="Razorpay" 
                    className="h-8 mx-2"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePayment}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay $99.00
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Button size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default LawyerCard;
