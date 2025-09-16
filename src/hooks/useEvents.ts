import { EventModel, EventCategory, Booking } from "@/types/event";
// import { mockEvents } from '@/data/events';
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/api/categoryService";
import { getAllEvents, getEventById } from "../api/eventService";
export const useEvents = () => {

  const { data: categories=[] , isLoading:isCategoriesLoading, error:categoriesError } = useQuery<EventCategory[]>({
      queryKey: ["categories"],  // cache key
      queryFn: getAllCategories,
    });
  
    const {data:events=[],isLoading:isEventsLoading,error:eventsError} = useQuery<EventModel[]>({
      queryKey:['events'],
      queryFn:getAllEvents
    })

  return { events, isCategoriesLoading ,categories, isEventsLoading};
};
