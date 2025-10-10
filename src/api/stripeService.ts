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

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
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

export const createPaymentIntent = async (
  data: CreateCheckoutRequest
): Promise<string> => {
  try {
    const response: AxiosResponse<PaymentIntentResponse> = await axiosInstance.post(
      "/stripe/create-payment-intent",
      data
    );
    return response.data.clientSecret;
  } catch (err) {
    console.error("Error creating payment intent:", err);
    throw new Error("Failed to create payment intent");
  }
};
