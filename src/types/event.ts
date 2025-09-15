import { Interface } from "readline";

export interface EventModel {
  _id: string;
  name: string; 
  description: string;
  category?: EventCategory;
  fee: number;
  isFree?:boolean;
  event_type: string;
  start_date: string;
  end_date: string;
  active:boolean;
  location?: string;
  image: string;
  capacity?: number;
  bookedCount?: number;
  vendor: Vendor;
  tags?: string[];
}

// export interface EventCategory  {
//   id:string;
//   name:string;
//   image:string;
//   description?: string;
// }
export interface Vendor{
  id:string;
  name:string;
  description?:string;
  logo:string;
}
export type EventCategory = 
  | 'music' 
  | 'tech' 
  | 'career' 
  | 'wellness' 
  | 'fitness';

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketCount: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  bookingDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}