import { useState, useEffect } from "react";
import { EventModel, EventCategory, Booking } from "@/types/event";
// import { mockEvents } from '@/data/events';
import { getAllEvents } from "../api/eventService";
export const useEvents = () => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Error in fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // empty dependency array -> runs only once

  // Simulate API calls with localStorage persistence
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    const savedBookings = localStorage.getItem("bookings");

    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  return { events, bookings, loading };
};
