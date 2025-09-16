import { type EventCategory } from "@/types/event";
import { axiosInstance } from "../lib/utils";
import { type AxiosResponse } from "axios";

export const getAllCategories = async (): Promise<EventCategory[]> => {
  try {
    const response: AxiosResponse<EventCategory[]> = await axiosInstance.get(
      "/categories"
    );
    const categories = response.data;
    
    const categoriesWithImages = await Promise.all(
      categories.map(async (category) => {
        const image = await getCategoryImage(category._id);
        return image.trim().length > 0 ? { ...category, image } : category;
      })
    );
    return categoriesWithImages;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getCategoryImage = async (
  categoryId: string
): Promise<string | undefined> => {
  try {
    const res = await axiosInstance.get(`/categories/logo/${categoryId}`, {
      responseType: "blob",
    });

    return await blobToDataURL(res.data);
  } catch (err) {
    console.log("error fetching category image", err);
     return '';
}
};

const blobToDataURL = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); // Data URL
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
