import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { UserFormData } from "@/lib/UserValidation";
import {
  type UseFormRegister,
  type FieldErrors,
} from "react-hook-form";

interface CreateVendorProps {
  register: UseFormRegister<UserFormData>;
  errors: FieldErrors<UserFormData>;

}
function CreateVendor({ register, errors, }: CreateVendorProps) {
  return (
    <div className="space-y-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
      <h3 className="font-bold   mb-3">Vendor Information</h3>

      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName">Company/Organization Name</Label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="companyName"
            type="text"
            placeholder="Your company name"
            className="pl-10 h-12"
            {...register("vendor.name")}
          />
          {errors.vendor?.name?.message && <p className="text-red-500">{errors.vendor.name.message}</p>}
        </div>
      </div>
      {/* Business Type and Phone*/}
      <div className="grid grid-cols-1 gap-3">
        {/* <Select 
                value='event-planing' 
                // onValueChange={(value) => handleInputChange("businessType", value)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="event-planning">Event Planning</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="venue">Venue</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="nonprofit">Non-Profit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
          </div> */}
        <div className="space-y-2">
          <Label htmlFor="vendor.description">Company Description</Label>
          <Textarea
            id="vendor.description"
            placeholder="Briefly describe your business and type of events..."
            maxLength={300}
            {...register("vendor.description")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendor.logo">Add Your Business Logo </Label>
          <Input type="file" id="vendor.logo" {...register('vendor.logo')}/>
        </div>
      </div>
    </div>
  );
}

export default CreateVendor;
