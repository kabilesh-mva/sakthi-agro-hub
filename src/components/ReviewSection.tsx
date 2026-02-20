import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star, Send, User, MessageSquare, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  created_at: string;
}

const ReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [allReviewsOpen, setAllReviewsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  });
  const { toast } = useToast();

  // Fetch reviews from database
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    
    // Real-time validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    // Additional email validation - check for common disposable email domains
    const disposableDomains = ['tempmail.com', 'throwaway.com', 'fakeemail.com', 'mailinator.com', 'guerrillamail.com'];
    const emailDomain = formData.email.split('@')[1]?.toLowerCase();
    if (disposableDomains.includes(emailDomain)) {
      toast({
        title: "Invalid Email",
        description: "Please use a permanent email address",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("reviews").insert({
        name: formData.name,
        email: formData.email,
        rating: formData.rating,
        comment: formData.comment,
      });

      if (error) throw error;

      toast({
        title: "Thank You!",
        description: "Your review has been submitted successfully.",
      });

      setDialogOpen(false);
      setFormData({ name: "", email: "", rating: 5, comment: "" });
      fetchReviews(); // Refresh the reviews list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-[#F9A300] text-[#F9A300]"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#dcfce7] to-[#f0fdf4]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E7A3C] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[#2E7D32] max-w-2xl mx-auto">
            Read reviews from farmers, dealers, and retailers who trust Sakthi Agro
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="text-center p-6 bg-[#f0fdf4] rounded-xl shadow-sm border border-[#dcfce7]">
            <div className="text-4xl font-bold text-[#2E7D32] mb-2">
              {reviews.length > 0
                ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                : "0"
              }
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(
                reviews.length > 0
                  ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
                  : 0
              )}
            </div>
            <div className="text-[#2E7D32] text-sm">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-[#f0fdf4] rounded-xl shadow-sm border border-[#dcfce7]">
            <div className="text-4xl font-bold text-[#2E7D32] mb-2">{reviews.length}+</div>
            <div className="text-[#2E7D32] text-sm">Happy Customers</div>
          </div>
          <div className="text-center p-6 bg-[#f0fdf4] rounded-xl shadow-sm border border-[#dcfce7]">
            <div className="text-4xl font-bold text-[#2E7D32] mb-2">
              {reviews.length > 0
                ? Math.round((reviews.filter(r => r.rating === 5).length / reviews.length) * 100)
                : 0
            }%
            </div>
            <div className="text-[#2E7D32] text-sm">Positive Reviews</div>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-[#2E7D32] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#2E7D32]">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-[#f0fdf4] rounded-xl border border-[#dcfce7]">
            <MessageSquare className="h-16 w-16 text-[#86efac] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1E7A3C] mb-2">No reviews yet</h3>
            <p className="text-[#2E7D32] mb-6">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.slice(0, 6).map((review) => (
              <div
                key={review.id}
                className="bg-[#f0fdf4] rounded-xl p-6 shadow-sm border border-[#dcfce7] hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1E7A3C]">
                        {review.name}
                      </div>
                      <div className="text-xs text-[#2E7D32]">
                        {new Date(review.created_at).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                        })}
                      </div>
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-[#2E7D32] leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        )}

        {/* View All Reviews & Write Review Buttons */}
        <div className="text-center flex flex-wrap justify-center gap-4">
          {/* View All Reviews Button */}
          <Dialog open={allReviewsOpen} onOpenChange={setAllReviewsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#f0fdf4] border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#dcfce7] px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all">
                <MessageSquare className="mr-2 h-5 w-5" />
                View All Reviews ({reviews.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between text-[#1E7A3C]">
                  <span>All Customer Reviews</span>
                  <button
                    onClick={() => setAllReviewsOpen(false)}
                    className="p-1 hover:bg-[#dcfce7] rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-[#2E7D32]" />
                  </button>
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="flex-1 pr-4 mt-4 max-h-[60vh]">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-[#f0fdf4] rounded-xl p-5 border border-[#dcfce7]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center text-white font-bold text-lg">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-[#1E7A3C]">
                              {review.name}
                            </div>
                            <div className="text-xs text-[#2E7D32]">
                              {new Date(review.created_at).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-[#2E7D32] leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* Write Review Button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                <MessageSquare className="mr-2 h-5 w-5" />
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle className="text-[#1E7A3C]">Share Your Experience</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2E7D32]">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-[#86efac]" />
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="pl-10 border-[#dcfce7] focus:border-[#2E7D32]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2E7D32]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-[#86efac]" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleEmailChange}
                      className={`pl-10 border-[#dcfce7] focus:border-[#2E7D32] ${
                        emailError ? "border-red-500" : ""
                      }`}
                      required
                    />
                  </div>
                  {emailError && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <span>⚠️</span> {emailError}
                    </p>
                  )}
                  {!emailError && formData.email && (
                    <p className="text-xs text-[#2E7D32] flex items-center gap-1">
                      <span>✅</span> Email format is valid
                    </p>
                  )}
                  <p className="text-xs text-[#2E7D32]">
                    We'll verify this email to ensure authentic reviews
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2E7D32]">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.rating
                              ? "fill-[#F9A300] text-[#F9A300]"
                              : "fill-[#dcfce7] text-[#dcfce7]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2E7D32]">
                    Your Review
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-[#86efac]" />
                    <Textarea
                      placeholder="Share your experience with Sakthi Agro..."
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                      className="pl-10 min-h-[120px] border-[#dcfce7] focus:border-[#2E7D32]"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-[#2E7D32] hover:bg-[#1B5E20]"
                    disabled={submitting}
                  >
                    {submitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Review
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    disabled={submitting}
                    className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#dcfce7]"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
