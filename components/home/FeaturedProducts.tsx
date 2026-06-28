// components/home/FeaturedProducts.tsx
import Link from "next/link";
import { ChevronRight, Laptop } from "lucide-react";

// Placeholder data — once Phase 3 (database + store) is built, this will
// be replaced with a real fetch from the products table.
type Product = {
  name: string;
  price: string;
  tag: "New" | "Refurbished" | "Custom";
  gradient: string;
};

const PRODUCTS: Product[] = [
  { name: "Alphatech Ryzen 7 Custom Build", price: "₦1,250,000", tag: "Custom", gradient: "from-blue-100 to-slate-100" },
  { name: "Dell Latitude 7420", price: "₦480,000", tag: "Refurbished", gradient: "from-slate-100 to-blue-100" },
  { name: "Logitech MX Master 3S", price: "₦65,000", tag: "New", gradient: "from-blue-100 to-slate-100" },
  { name: "1TB NVMe SSD", price: "₦42,000", tag: "New", gradient: "from-slate-100 to-blue-100" },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs text-blue-700 tracking-widest">THE STORE</p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 mt-2">Featured products</h2>
          </div>
          <Link href="/store" className="hidden sm:flex items-center gap-1 text-blue-700 font-body font-semibold text-sm">
            Shop all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-36 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                <Laptop className="h-10 w-10 text-blue-700/40" />
              </div>
              <div className="p-4">
                <span className="font-mono text-[10px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded">{p.tag}</span>
                <h3 className="font-body font-semibold text-sm text-slate-900 mt-2 leading-snug">{p.name}</h3>
                <p className="font-display font-bold text-blue-800 mt-2">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
