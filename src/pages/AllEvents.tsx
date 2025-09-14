import { useState } from "react";
import { Search, Filter, Calendar, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "@/components/EventCard";
import musicConcert from "@/assets/music-concert.jpg";
import techConference from "@/assets/tech-conference.jpg";
import artExhibition from "@/assets/art-exhibition.jpg";
import foodFestival from "@/assets/food-festival.jpg";
import fitnessWorkshop from "@/assets/fitness-workshop.jpg";

const AllEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  // Mock events data
  const allEvents = [
    {
      id: "1",
      title: "Summer Music Festival 2024",
      image: musicConcert,
      date: "Jun 15, 2024",
      time: "7:00 PM",
      location: "Central Park, New York",
      price: "$45",
      category: "Music",
      attendees: 1250,
    },
    {
      id: "2",
      title: "Tech Innovation Summit",
      image: techConference,
      date: "Jun 20, 2024",
      time: "9:00 AM",
      location: "Convention Center, San Francisco",
      price: "$120",
      category: "Technology",
      attendees: 800,
    },
    {
      id: "3",
      title: "Modern Art Showcase",
      image: artExhibition,
      date: "Jun 22, 2024",
      time: "6:00 PM",
      location: "Metropolitan Gallery, NYC",
      price: "$25",
      category: "Arts",
      attendees: 350,
    },
    {
      id: "4",
      title: "Gourmet Food Festival",
      image: foodFestival,
      date: "Jun 25, 2024",
      time: "12:00 PM",
      location: "Brooklyn Bridge Park",
      price: "$35",
      category: "Food",
      attendees: 950,
    },
    {
      id: "5",
      title: "Yoga & Wellness Workshop",
      image: fitnessWorkshop,
      date: "Jun 18, 2024",
      time: "8:00 AM",
      location: "Zen Studio, Los Angeles",
      price: "$30",
      category: "Health",
      attendees: 85,
    },
    {
      id: "6",
      title: "Jazz Night Live",
      image: musicConcert,
      date: "Jun 28, 2024",
      time: "8:30 PM",
      location: "Blue Note, Chicago",
      price: "$55",
      category: "Music",
      attendees: 200,
    },
    {
      id: "7",
      title: "Startup Pitch Competition",
      image: techConference,
      date: "Jul 05, 2024",
      time: "2:00 PM",
      location: "Innovation Hub, Austin",
      price: "Free",
      category: "Business",
      attendees: 300,
    },
    {
      id: "8",
      title: "Photography Workshop",
      image: artExhibition,
      date: "Jul 10, 2024",
      time: "10:00 AM",
      location: "Studio Space, Seattle",
      price: "$75",
      category: "Arts",
      attendees: 40,
    }
  ];

  const categories = ["all", "Music", "Technology", "Arts", "Food", "Health", "Business"];
  const locations = ["all", "New York", "San Francisco", "Los Angeles", "Chicago", "Austin", "Seattle"];
  const dateRanges = ["all", "Today", "Tomorrow", "This Week", "This Month", "Next Month"];
  const priceRanges = ["all", "Free", "$1-$25", "$26-$50", "$51-$100", "$100+"];

  // Filter events based on selected criteria
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || event.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSelectedDate("all");
    setPriceRange("all");
  };

  const activeFiltersCount = [selectedCategory, selectedLocation, selectedDate, priceRange]
    .filter(filter => filter !== "all").length;

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
            
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="/events" className="text-primary font-medium">Browse Events</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Create Event</a>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost">Sign In</Button>
              <Button className="gradient-primary text-white">Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Events</h1>
          <p className="text-muted-foreground text-lg">
            Find your next favorite event from {allEvents.length} amazing experiences
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search events, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map(range => (
                  <SelectItem key={range} value={range}>
                    {range === "all" ? "Any Date" : range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map(range => (
                  <SelectItem key={range} value={range}>
                    {range === "all" ? "Any Price" : range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {activeFiltersCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filters ({activeFiltersCount})
              </Button>
            )}
          </div>

          {/* Active Filter Badges */}
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedCategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
              </Badge>
            )}
            {selectedLocation !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {selectedLocation}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedLocation("all")} />
              </Badge>
            )}
            {selectedDate !== "all" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {selectedDate}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDate("all")} />
              </Badge>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredEvents.length} events
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <a href={`/event/${event.id}`} key={event.id}>
                <EventCard {...event} />
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find more events
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Events
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;