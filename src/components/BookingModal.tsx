import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { EventModel } from "@/types/event";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import { createCheckoutSession } from "@/api/stripeService";
import { useToast } from "@/hooks/use-toast";

interface BookingModalProps {
  event: EventModel;
  children: React.ReactNode;
}

export const BookingModal = ({ event, children }: BookingModalProps) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const totalAmount = event.fee * ticketCount;

  const handleBookNow = async () => {
    setIsProcessing(true);
    try {
      const checkoutUrl = await createCheckoutSession({
        eventId: event._id,
        eventName: event.name,
        ticketCount,
        pricePerTicket: event.fee,
        attendeeName,
        attendeeEmail,
      });

      window.location.href = checkoutUrl;
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "Unable to create checkout session. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book Event Tickets</DialogTitle>
          <DialogDescription>
            Complete your booking for {event.name}
          </DialogDescription>
        </DialogHeader>

        {/* Event Summary */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold">{event.name}</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{event.start_date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Booking Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={attendeeName}
              onChange={(e) => setAttendeeName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={attendeeEmail}
              onChange={(e) => setAttendeeEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tickets">Number of Tickets</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
              >
                -
              </Button>
              <Input
                id="tickets"
                type="number"
                min="1"
                value={ticketCount}
                onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTicketCount(ticketCount + 1)}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Pricing Summary */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Ticket Price</span>
            <span>${event.fee}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Quantity</span>
            <span>{ticketCount}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={handleBookNow}
            disabled={!attendeeName || !attendeeEmail || isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Redirecting...
              </>
            ) : (
              "Book Now"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};