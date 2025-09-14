import { Music, Briefcase, Palette, Utensils, Dumbbell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "music", name: "Music", icon: Music, color: "bg-gradient-to-r from-pink-500 to-rose-500" },
  { id: "business", name: "Business", icon: Briefcase, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "arts", name: "Arts", icon: Palette, color: "bg-gradient-to-r from-purple-500 to-indigo-500" },
  { id: "food", name: "Food & Drink", icon: Utensils, color: "bg-gradient-to-r from-orange-500 to-red-500" },
  { id: "health", name: "Health", icon: Dumbbell, color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { id: "charity", name: "Charity", icon: Heart, color: "bg-gradient-to-r from-red-500 to-pink-500" },
];

export const EventCategories = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
          <p className="text-muted-foreground text-lg">Discover events that match your interests</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant="outline"
                className="h-24 flex-col gap-2 border-2 hover:border-primary/50 hover:shadow-soft transition-all group"
              >
                <div className={`p-3 rounded-full ${category.color} group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};