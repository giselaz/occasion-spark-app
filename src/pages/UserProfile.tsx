import React, { useState } from 'react';
import { useAuth } from '@/store/AuthContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, Star, Settings, LogOut } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Booking, EventModel } from '@/types/event';
import { format } from 'date-fns';

const UserProfile = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
const user ={
  firstName:'admin',
  lastName:'test',
  email:"giselazaimi@gmail.com",
  id:'22',
  accountType:"vendor"
}
  // Mock data - replace with actual API calls
  const mockBookings: Booking[] = [
    {
      id: '1',
      eventId: 'event1',
      userId: user?.id || '',
      attendeeName: user ? `${user.firstName} ${user.lastName}` : 'John Doe',
      attendeeEmail: user?.email || 'john@example.com',
      ticketCount: 2,
      totalAmount: 50,
      paymentStatus: 'completed',
      bookingDate: '2024-01-15',
    },
    {
      id: '2',
      eventId: 'event2',
      userId: user?.id || '',
      attendeeName: user ? `${user.firstName} ${user.lastName}` : 'John Doe',
      attendeeEmail: user?.email || 'john@example.com',
      ticketCount: 1,
      totalAmount: 75,
      paymentStatus: 'completed',
      bookingDate: '2024-01-10',
    },
  ];

  const mockUpcomingEvents: EventModel[] = [
    {
      _id: 'event1',
      name: 'Tech Conference 2024',
      description: 'Annual technology conference featuring the latest innovations',
      fee: 25,
      isFree: false,
      event_type: 'conference',
      start_date: '2024-03-15T09:00:00Z',
      end_date: '2024-03-15T17:00:00Z',
      active: true,
      location: 'San Francisco, CA',
      image: '/api/placeholder/400/200',
      capacity: 500,
      bookedCount: 350,
      vendor: {
        id: 'vendor1',
        name: 'Tech Events Inc',
        description: 'Leading tech event organizer',
        logo: '/api/placeholder/50/50',
      },
      tags: ['technology', 'networking', 'innovation'],
    },
    {
      _id: 'event2',
      name: 'Music Festival',
      description: 'Outdoor music festival with multiple artists',
      fee: 75,
      isFree: false,
      event_type: 'festival',
      start_date: '2024-04-20T14:00:00Z',
      end_date: '2024-04-21T23:00:00Z',
      active: true,
      location: 'Austin, TX',
      image: '/api/placeholder/400/200',
      capacity: 2000,
      bookedCount: 1500,
      vendor: {
        id: 'vendor2',
        name: 'Music Events Co',
        description: 'Professional music event organizer',
        logo: '/api/placeholder/50/50',
      },
      tags: ['music', 'festival', 'outdoor'],
    },
  ];

  const mockPastEvents: EventModel[] = [
    {
      _id: 'event3',
      name: 'Art Gallery Opening',
      description: 'Contemporary art exhibition opening night',
      fee: 15,
      isFree: false,
      event_type: 'exhibition',
      start_date: '2024-01-10T19:00:00Z',
      end_date: '2024-01-10T22:00:00Z',
      active: false,
      location: 'New York, NY',
      image: '/api/placeholder/400/200',
      capacity: 150,
      bookedCount: 120,
      vendor: {
        id: 'vendor3',
        name: 'Art Gallery NYC',
        description: 'Premier contemporary art gallery',
        logo: '/api/placeholder/50/50',
      },
      tags: ['art', 'gallery', 'contemporary'],
    },
  ];

  const getBookingForEvent = (eventId: string) => {
    return mockBookings.find(booking => booking.eventId === eventId);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Please sign in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {user.firstName?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge variant="outline" className="mt-1">
                    {user.accountType}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="upcoming">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your Upcoming Events</h2>
              {mockUpcomingEvents.length === 0 ? (
                <Card className="p-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                  <p className="text-muted-foreground mb-4">You haven't booked any upcoming events yet.</p>
                  <Button>Browse Events</Button>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockUpcomingEvents.map((event) => {
                    const booking = getBookingForEvent(event._id);
                    return (
                      <Card key={event._id} className="overflow-hidden">
                        <div className="aspect-video bg-muted">
                          <img 
                            src={event.image} 
                            alt={event.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{event.name}</h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(event.start_date), 'PPP')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {format(new Date(event.start_date), 'p')}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                            {booking && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {booking.ticketCount} ticket{booking.ticketCount > 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <Badge variant="outline">
                              {booking?.paymentStatus || 'booked'}
                            </Badge>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Past Events */}
          <TabsContent value="past">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Past Events</h2>
              {mockPastEvents.length === 0 ? (
                <Card className="p-8 text-center">
                  <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No past events</h3>
                  <p className="text-muted-foreground">Your event history will appear here.</p>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockPastEvents.map((event) => {
                    const booking = getBookingForEvent(event._id);
                    return (
                      <Card key={event._id} className="overflow-hidden opacity-75">
                        <div className="aspect-video bg-muted">
                          <img 
                            src={event.image} 
                            alt={event.name}
                            className="w-full h-full object-cover grayscale"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{event.name}</h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(event.start_date), 'PPP')}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                            {booking && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {booking.ticketCount} ticket{booking.ticketCount > 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <Badge variant="secondary">Completed</Badge>
                            <Button size="sm" variant="outline">
                              <Star className="w-4 h-4 mr-1" />
                              Rate Event
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Booking History</h2>
              {mockBookings.length === 0 ? (
                <Card className="p-8 text-center">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                  <p className="text-muted-foreground mb-4">You haven't made any bookings yet.</p>
                  <Button>Explore Events</Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <Card key={booking.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">Booking #{booking.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            Booked on {format(new Date(booking.bookingDate), 'PPP')}
                          </p>
                          <div className="mt-2 flex items-center gap-4 text-sm">
                            <span>{booking.ticketCount} tickets</span>
                            <span>${booking.totalAmount}</span>
                            <Badge 
                              variant={booking.paymentStatus === 'completed' ? 'default' : 'secondary'}
                            >
                              {booking.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Tickets
                          </Button>
                          <Button size="sm" variant="outline">
                            Download Receipt
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;