import clsx from "clsx";
import { EventCard } from "./EventCard";
import { Link } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";
import { useEffect } from "react";
// const events = [
//   {
//     id: "1",
//     title: "Summer Music Festival 2024",
//     image: musicConcert,
//     date: "Jun 15, 2024",
//     time: "7:00 PM",
//     location: "Central Park, New York",
//     price: "$45",
//     category: "Music",
//     attendees: 1250,
//   },
//   {
//     id: "2",
//     title: "Tech Innovation Summit",
//     image: techConference,
//     date: "Jun 20, 2024",
//     time: "9:00 AM",
//     location: "Convention Center, San Francisco",
//     price: "$120",
//     category: "Technology",
//     attendees: 800,
//   },
//   {
//     id: "3",
//     title: "Modern Art Showcase",
//     image: artExhibition,
//     date: "Jun 22, 2024",
//     time: "6:00 PM",
//     location: "Metropolitan Gallery, NYC",
//     price: "$25",
//     category: "Arts",
//     attendees: 350,
//   },
//   {
//     id: "4",
//     title: "Gourmet Food Festival",
//     image: foodFestival,
//     date: "Jun 25, 2024",
//     time: "12:00 PM",
//     location: "Brooklyn Bridge Park",
//     price: "$35",
//     category: "Food",
//     attendees: 950,
//   },
//   {
//     id: "5",
//     title: "Yoga & Wellness Workshop",
//     image: fitnessWorkshop,
//     date: "Jun 18, 2024",
//     time: "8:00 AM",
//     location: "Zen Studio, Los Angeles",
//     price: "$30",
//     category: "Health",
//     attendees: 85,
//   },
//   {
//     id: "6",
//     title: "Jazz Night Live",
//     image: musicConcert,
//     date: "Jun 28, 2024",
//     time: "8:30 PM",
//     location: "Blue Note, Chicago",
//     price: "$55",
//     category: "Music",
//     attendees: 200,
//   },
// ];

interface EventGridProps {
  title: string;
  subtitle?: string;
}

export const EventGrid = ({ title, subtitle }: EventGridProps) => {
  const { categories, events,isCategoriesLoading, } = useEvents();

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link to={`/event/${event._id}`} key={event._id}>
              <EventCard {...event} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};