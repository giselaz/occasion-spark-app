import { axiosInstance } from "@/lib/utils";
import { AxiosResponse } from "axios";

export interface CreateCheckoutRequest {
  eventId: string;
  eventName: string;
  ticketCount: number;
  pricePerTicket: number;
  attendeeName: string;
  attendeeEmail: string;
}

export interface CheckoutResponse {
  sessionId: string;
  url: string;
}

export const createCheckoutSession = async (
  data: CreateCheckoutRequest
): Promise<string> => {
  try {
    const response: AxiosResponse<CheckoutResponse> = await axiosInstance.post(
      "booking/bookEvent",
      data
    );
    return response.data.url;
  } catch (err) {
    console.error("Error creating checkout session:", err);
    throw new Error("Failed to create checkout session");
  }
};
