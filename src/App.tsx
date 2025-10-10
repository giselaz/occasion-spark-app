import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/store/AuthContext";
import Index from "./pages/Index";
import AllEvents from "./pages/AllEvents";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingSuccess from "./pages/BookingSuccess";
import BookingCancel from "./pages/BookingCancel";

const queryClient = new QueryClient();
export const protectedRoutes = [
  { path: "/dashboard", element: <UserProfile /> },
  { path: "/create-event", element: <CreateEvent /> },
];
const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route element={<ProtectedRoute />}>
              {protectedRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/booking/success" element={<BookingSuccess/>} />
            <Route path="/booking/cancel" element={<BookingCancel/>} />
             <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
