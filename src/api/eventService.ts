import { EventModel } from "@/types/event";
import { axiosInstance} from "../lib/utils";
import { AxiosResponse } from "axios";

export const getAllEvents = async (): Promise<EventModel[]>=> { 
  try {
    const response: AxiosResponse<EventModel[]> = await axiosInstance.get("/events");
    const events =  response.data;
    const eventsWithImages = await Promise.all(
      events.map(async (event) => {
        const image = await getEventImage(event._id);
        const isFree = event.fee == 0;
        event.isFree = isFree;
        if(image.trim().length != 0)
        {
           return { ...event, image };
        }
        return event;
      })
    );
            
      return eventsWithImages;
  } catch (err) {
    console.log("Error fetching events:", err);
    return [];
  }
};


 const getEventImage = async (eventId:string): Promise<string | undefined> => {
    try {
      const res = await axiosInstance.get(`/events/${eventId}/image`, {
        responseType: "blob",
      });

      return await blobToDataURL(res.data);
    } catch (err) {
      console.log("error fetching image", err);
      return '';
    }
};

const blobToDataURL = (blob:Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); // Data URL
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
