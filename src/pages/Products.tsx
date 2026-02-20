import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, MessageCircle, Users, Star, Filter, X, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  in_stock: boolean | null;
  created_at: string;
  rating?: number;
  updated_at?: string;
  specifications?: string | null;
}

const Products = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Sprayers", "Pumps", "Engines", "Spare Parts", "Others"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts((data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        description: item.description,
        price: typeof item.price === 'number' ? item.price : (typeof item.price === 'string' ? parseFloat(item.price) : null),
        image_url: item.image_url,
        in_stock: item.in_stock,
        created_at: item.created_at,
        rating: item.rating || 4.5,
        updated_at: item.updated_at,
        specifications: item.specifications
      })));
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === "All"
    ? products
    : selectedCategory === "Others"
      ? products.filter(product => 
          !["Sprayers", "Pumps", "Engines", "Spare Parts"].includes(product.category)
        )
      : products.filter(product => product.category === selectedCategory);

  const groupedProducts = categories
    .filter(cat => cat !== "All")
    .map(category => ({
      category,
      items: category === "Others"
        ? filteredProducts.filter(p => 
            !["Sprayers", "Pumps", "Engines", "Spare Parts"].includes(p.category)
          )
        : filteredProducts.filter(p => p.category === category)
    }))
    .filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-14 md:pt-16 lg:pt-20">

      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6">{t("products_hero_title")}</h1>
            <p className="text-lg sm:text-xl opacity-90 mb-6">
              {t("products_hero_subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{t("products_rating_text")}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                <Users className="h-4 w-4" />
                <span>{t("products_farmers_served")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 flex-wrap justify-between">
            <div className="flex items-center gap-4 flex-wrap justify-center flex-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="h-5 w-5" />
                <span className="font-medium">Filter by Category:</span>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all duration-300"
                    size="sm"
                  >
                    {category}
                    {selectedCategory === category && category !== "All" && (
                      <X className="ml-2 h-4 w-4" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory("All");
                      }} />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-3 text-sm text-muted-foreground">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            groupedProducts.map((group, idx) => (
              <div key={idx} className="mb-12 sm:mb-16">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold">{group.category}</h2>
                  <span className="ml-auto bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {group.items.length} items
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {group.items.map((item) => (
                    <Card key={item.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-[#FF6F00] overflow-hidden group">
                      {/* Product Image */}
                      <div className="aspect-square bg-secondary overflow-hidden">
                        <img 
                          src={item.image_url || '/placeholder-product.png'} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-product.png';
                          }}
                        />
                      </div>

                      <CardContent className="p-6 pt-6 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold line-clamp-1">{item.name}</h3>
                          <div className="flex items-center gap-1 bg-[#E8F5E9] px-2 py-1 rounded text-xs font-medium text-[#2E7D32]">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">{item.description || 'No description available'}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{item.price !== null ? `₹${item.price}` : 'Price on request'}</span>
                          {item.in_stock === false && (
                            <span className="text-xs text-red-500 font-medium">Out of Stock</span>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-2 p-6 pt-0">
                        <Button 
                          size="sm" 
                          variant="default" 
                          asChild 
                          className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white flex items-center justify-center gap-1 mb-2"
                          disabled={!item.in_stock}
                        >
                          <a href="tel:+919443600205" className="flex items-center justify-center gap-1 w-full">
                            <Phone className="h-4 w-4" />
                            {t("product_cta_call")}
                          </a>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          asChild 
                          className="w-full border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] flex items-center justify-center gap-1 mb-2"
                          disabled={!item.in_stock}
                        >
                          <a 
                            href={`https://wa.me/919443600205?text=${encodeURIComponent(`Inquiry about ${item.name} - ${item.price !== null ? `₹${item.price}` : 'Price on request'}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1 w-full"
                          >
                            <MessageCircle className="h-4 w-4" />
                            {t("product_cta_whatsapp")}
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Products Available</h3>
              <p className="text-muted-foreground mb-6">
                {selectedCategory === "All" 
                  ? "No products have been added yet. Please check back later or contact us for inquiries."
                  : `No products found in the ${selectedCategory} category.`}
              </p>
              <Button asChild>
                <a href="tel:+919443600205">Contact Us</a>
              </Button>
            </div>
          )}
        </div>
      </section>
      </div>


      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Products;
