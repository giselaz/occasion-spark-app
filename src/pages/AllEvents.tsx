import { useEffect, useState } from "react";
import { Search, Filter, Calendar, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "@/components/EventCard";
import { useEvents } from "@/hooks/useEvents";
import { useSearchParams } from "react-router-dom";
const AllEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [searchParams] = useSearchParams();
  const searchCategory = searchParams.get('category') || "";

  useEffect(()=>{
    if(searchCategory.trim() !=='')
    {
      setSelectedCategory(searchCategory);
    }
  },[searchCategory]);
  
  const {events ,categories } = useEvents();
  // Mock events data
 const filterCategories = [{id:"all",name:"All"},...categories.map(category => ({
  id: category._id,
  name: category.name,
}))];
  const locations = ["all", "New York", "San Francisco", "Los Angeles", "Chicago", "Austin", "Seattle"];
  const dateRanges = ["all", "Today", "Tomorrow", "This Week", "This Month", "Next Month"];
  const priceRanges = ["all", "Free", "$1-$25", "$26-$50", "$51-$100", "$100+"];

  // Filter events based on selected criteria
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || event.category.filter(category=>(category._id === selectedCategory))
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
            Find your next favorite event from {events.length} amazing experiences
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
                {filterCategories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.id === "all" ? "All Categories" : category.name}
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
              <a href={`/event/${event._id}`} key={event._id}>
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