import { SearchBar } from "@/components/SearchBar";
import { EventCategories } from "@/components/EventCategories";
import { EventGrid } from "@/components/EventGrid";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Calendar, MapPin } from "lucide-react";
import heroEventImage from "@/assets/hero-event.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
  
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroEventImage})` }}
        >
          <div className="absolute inset-0 gradient-hero opacity-90"></div>
        </div>
        
        <div className="relative z-10 py-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Amazing
              <br />
              <span className="gradient-primary bg-clip-text text-transparent">
                Events Near You
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              From concerts to conferences, find and book tickets for the best events happening in your city
            </p>
            
            <SearchBar />
            
            <div className="flex items-center justify-center gap-8 mt-12 text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>2M+ Attendees</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>50K+ Events</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>200+ Cities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <EventCategories />

      {/* Featured Events */}
      <EventGrid 
        title="Featured Events" 
        subtitle="Hand-picked events just for you"
      />

      {/* Popular Events */}
      <section className="py-16 px-4 bg-muted/30">
        <EventGrid 
          title="Popular This Week" 
          subtitle="See what everyone's talking about"
        />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Your Own Event?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of event organizers who trust EventHub to manage their events
          </p>
          <a href="/create-event">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg font-semibold">
              Start Creating Events
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">EventHub</span>
              </div>
              <p className="text-muted-foreground">
                The world's largest event discovery platform. Find your next favorite event.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Discover</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Browse Events</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Popular Events</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Categories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Organize</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/create-event" className="hover:text-primary transition-colors">Create Event</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;