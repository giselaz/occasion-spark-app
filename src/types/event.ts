export interface EventModel {
  _id: string;
  name: string; 
  description: string;
  category?: EventCategory[];
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

export interface EventCategory  {
  _id:string;
  name:string;
  image:string;
  description?: string;
}
export interface Vendor{
  id:string;
  name:string;
  description?:string;
  logo:string;
}
// export type EventCategory = 
//   | 'music' 
//   | 'tech' 
//   | 'career' 
//   | 'wellness' 
//   | 'fitness';

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
  _id: string;
  name: string;
  surname: string;
  email: string;
  password:string;
  isVerified:boolean;
  role: Role;
};

export interface UserRegistration{
  user:User;
  vendor:Partial<Vendor>;
}
export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  // user: User;
}
export interface LoginRequest {
  email:string;
  password:string;
}

export type Role = "admin" | "vendor" | "organizer" | "user";

export interface Error {
  error: string;
}

export interface Success {
  message: string;
}