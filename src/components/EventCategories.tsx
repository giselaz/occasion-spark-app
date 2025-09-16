import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { type EventCategory } from "@/types/event";
import { getAllCategories } from "@/api/categoryService";

export const EventCategories = () => {
  const { data: categories=[] , isLoading, error } = useQuery<EventCategory[]>({
    queryKey: ["categories"],  // cache key
    queryFn: getAllCategories,
  });
 if (isLoading) return <p>Loading...</p>;
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
          <p className="text-muted-foreground text-lg">Discover events that match your interests</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.image;
            return (
              <Button
                key={category._id}
                variant="outline"
                className="h-24 flex-col gap-2 border-2 hover:border-primary/50 hover:shadow-soft transition-all group"
              >
                <div className={`p-3 rounded-full  group-hover:scale-110 transition-transform`}>
                  <img src={IconComponent}/>
                    {/* <IconComponent className="w-6 h-6 text-white" /> */}
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