import { useParams } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, Share2, Heart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import techConference from "@/assets/tech-conference.jpg";
import { useQuery } from "@tanstack/react-query"; 
import { EventModel } from "@/types/event";
import { getEventById } from "@/api/eventService";

const EventDetails = () => {
  const { id } = useParams(); 
  const {data:event,isLoading,error} = useQuery<EventModel>({
  queryKey:['single_event',id],
  queryFn:()=> getEventById(id)
});
if(isLoading)
{
  return<> Event is loading...</>
}
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="text-xl font-bold">EventHub</span>
            </a>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="gradient-primary text-white">
                Get Tickets - ${event.fee}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-6 left-6 text-white">
          <Badge variant="secondary" className="mb-3">
            <ul>
              {event.category.map(cat => (
                <li>{cat.name}</li>
              ))}
              
            </ul>
          </Badge>
          <h1 className="text-4xl font-bold mb-2">{event.name}</h1>
          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{event.start_date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {event.description}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </Card>

            {/* Tags */}
            {/* <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card> */}

            {/* Organizer */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3">Organizer</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {event.vendor.name}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{event.vendor.name}</p>
                  <p className="text-sm text-muted-foreground">Event Organizer</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Card */}
            <Card className="p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  ${event.fee}
                </div>
                <p className="text-muted-foreground">per ticket</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{event.start_date}</p>
                    <p className="text-sm text-muted-foreground">{event.end_date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  {/* <div>
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-sm text-muted-foreground">{event.address}</p>
                  </div> */}
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <div>
                    {/* <p className="font-medium">{event.attendees} attending</p>
                    <p className="text-sm text-muted-foreground">
                      {event.maxAttendees - event.attendees} spots left
                    </p> */}
                  </div>
                </div>
              </div>

              <Button className="w-full gradient-primary text-white text-lg py-3 mb-3">
                Get Tickets
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </Card>

            {/* Related Events */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Similar Events</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <img 
                    src={techConference} 
                    alt="Tech Summit"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Tech Innovation Summit</h4>
                    <p className="text-xs text-muted-foreground">Jun 20, 2024</p>
                    <p className="text-xs text-primary font-medium">$120</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;