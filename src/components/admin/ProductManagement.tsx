import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Loader2, Upload, Image as ImageIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string | null;
  specifications: string | null;
  price: number | null;
  in_stock: boolean;
  image_url: string | null;
}

const categories = [
  "Sprayers",
  "Pumps & Irrigation",
  "Engines",
  "Spare Parts & Accessories",
  "Power Tools",
  "Others",
];

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    specifications: "",
    price: "",
    in_stock: true,
    image_url: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error fetching products:", error);
        throw error;
      }
      setProducts(data || []);
    } catch (error: unknown) {
      console.error("Error fetching products:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load products";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a JPG, JPEG, PNG, WebP, or GIF image",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File, productName: string): Promise<string | null> => {
    if (!file) return null;

    try {
      setUploadingImage(true);
      setUploadProgress(0);

      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${productName.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        // If bucket doesn't exist, try to create it (requires admin privileges)
        if (error.message.includes('bucket')) {
          toast({
            title: "Storage bucket not found",
            description: "Please create a 'product-images' bucket in Supabase Storage",
            variant: "destructive",
          });
        }
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setUploadProgress(100);
      return urlData.publicUrl;
    } catch (error: any) {
      console.error("Image upload error:", error);
      throw new Error(`Failed to upload image: ${error.message}`);
    } finally {
      setUploadingImage(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error("Product name is required");
      }
      if (!formData.category) {
        throw new Error("Category is required");
      }

      // Validate and parse price
      let priceValue: number | null = null;
      if (formData.price && formData.price.trim() !== "") {
        const parsedPrice = parseFloat(formData.price);
        if (isNaN(parsedPrice)) {
          throw new Error("Invalid price value. Please enter a valid number.");
        }
        priceValue = parsedPrice;
      }

      // Upload image if selected
      let imageUrl = formData.image_url;
      if (selectedFile) {
        const uploadedUrl = await uploadImage(selectedFile, formData.name);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const productData = {
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim() || null,
        specifications: formData.specifications.trim() || null,
        price: priceValue,
        in_stock: formData.in_stock,
        image_url: imageUrl || null,
      };

      console.log("Submitting product data:", productData);

      if (editingProduct) {
        console.log("Updating product:", editingProduct.id);
        const { data, error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id)
          .select();

        if (error) {
          console.error("Supabase update error:", error);
          throw error;
        }
        console.log("Update result:", data);
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        console.log("Inserting new product");
        const { data, error } = await supabase
          .from("products")
          .insert(productData)
          .select();

        if (error) {
          console.error("Supabase insert error:", error);
          throw error;
        }
        console.log("Insert result:", data);
        toast({ title: "Success", description: "Product added successfully" });
      }

      setDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      console.error("Detailed error:", error);

      let errorMessage = "Failed to save product. ";
      
      if (error?.message) {
        errorMessage += error.message;
      } else if (typeof error === 'string') {
        errorMessage += error;
      }

      toast({
        title: "Error saving product",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description || "",
      specifications: product.specifications || "",
      price: product.price?.toString() || "",
      in_stock: product.in_stock,
      image_url: product.image_url || "",
    });
    if (product.image_url) {
      setImagePreview(product.image_url);
    }
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;
      toast({ title: "Success", description: "Product deleted successfully" });
      fetchProducts();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      specifications: "",
      price: "",
      in_stock: true,
      image_url: "",
    });
    setEditingProduct(null);
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    disabled={submitting || uploadingImage}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                    disabled={submitting || uploadingImage}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  disabled={submitting || uploadingImage}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specifications">Specifications</Label>
                <Textarea
                  id="specifications"
                  value={formData.specifications}
                  onChange={(e) =>
                    setFormData({ ...formData, specifications: e.target.value })
                  }
                  rows={2}
                  disabled={submitting || uploadingImage}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    disabled={submitting || uploadingImage}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Product Image</Label>
                  <div className="space-y-2">
                    <Input
                      id="image"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleImageSelect}
                      disabled={submitting || uploadingImage}
                      ref={fileInputRef}
                    />
                    <p className="text-xs text-muted-foreground">
                      Supported: JPG, JPEG, PNG, WebP, GIF (Max 5MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative rounded-lg overflow-hidden border border-border bg-muted max-w-xs">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-48 object-cover"
                  />
                  {!submitting && !uploadingImage && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                        <p className="text-sm">Uploading...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {uploadingImage && uploadProgress > 0 && (
                <div className="space-y-1">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Uploading image... {uploadProgress}%
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="in_stock"
                  checked={formData.in_stock}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, in_stock: checked })
                  }
                  disabled={submitting || uploadingImage}
                />
                <Label htmlFor="in_stock">In Stock</Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1" disabled={submitting || uploadingImage}>
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingProduct ? "Updating..." : "Adding..."}
                    </>
                  ) : uploadingImage ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading Image...
                    </>
                  ) : (
                    <>
                      {editingProduct ? "Update Product" : "Add Product"}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                  disabled={submitting || uploadingImage}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              {product.image_url && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%23e2e8f0' width='200' height='200'/%3E%3Ctext fill='%2394a3b8' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              )}
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {product.category}
              </p>
            </CardHeader>
            <CardContent>
              {product.description && (
                <p className="text-sm mb-2">{product.description}</p>
              )}
              {product.price && (
                <p className="text-lg font-bold text-primary">
                  ₹{product.price}
                </p>
              )}
              <p className="text-sm mt-2">
                Status:{" "}
                <span
                  className={
                    product.in_stock ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.in_stock ? "In Stock" : "Out of Stock"}
                </span>
              </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(product)}
                className="flex-1"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(product.id)}
                className="flex-1"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No products yet. Click "Add Product" to create your first product.
        </div>
      )}
    </div>
  );
};
