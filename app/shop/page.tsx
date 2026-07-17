import ProductList from "@/components/home/ProductList";

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
        Our <span className="text-primary">Collection</span>
      </h1>
      <ProductList />
    </div>
  );
}