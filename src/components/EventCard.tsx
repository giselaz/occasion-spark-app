import { Calendar, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  attendees: number;
}

export const EventCard = ({ 
  title, 
  image, 
  date, 
  time, 
  location, 
  price, 
  category, 
  attendees 
}: EventCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-card">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground font-medium">
            {category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-semibold text-foreground">
            {price}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>{date} • {time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Users className="w-4 h-4" />
            <span>{attendees} attendees</span>
          </div>
        </div>
      </div>
    </Card>
  );
};