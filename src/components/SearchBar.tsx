import { Search, MapPin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SearchBar = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-card rounded-2xl p-6 shadow-strong">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search events, artists, venues..."
              className="pl-10 h-12 border-0 bg-white/50 backdrop-blur-sm focus:bg-white/80 transition-all"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
            <Select>
              <SelectTrigger className="pl-10 h-12 border-0 bg-white/50 backdrop-blur-sm focus:bg-white/80">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="los-angeles">Los Angeles</SelectItem>
                <SelectItem value="chicago">Chicago</SelectItem>
                <SelectItem value="miami">Miami</SelectItem>
                <SelectItem value="san-francisco">San Francisco</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
            <Select>
              <SelectTrigger className="pl-10 h-12 border-0 bg-white/50 backdrop-blur-sm focus:bg-white/80">
                <SelectValue placeholder="When" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="custom">Custom Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button size="lg" className="gradient-primary text-white px-8 h-12 rounded-xl font-semibold hover:shadow-medium transition-all">
            Find Events
          </Button>
        </div>
      </div>
    </div>
  );
};