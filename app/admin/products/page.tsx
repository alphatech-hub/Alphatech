// app/admin/products/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true } } },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Products</h1>
          <p className="font-body text-sm text-slate-400 mt-1">{products.length} products in your store</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">PRODUCT</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">CATEGORY</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">PRICE</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">STOCK</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">CONDITION</th>
                <th className="text-right px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center font-body text-sm text-slate-500">
                    No products yet.
                  </td>
                </tr>
              ) : products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-body font-semibold text-sm text-white line-clamp-1">{p.name}</p>
                    <p className="font-mono text-[10px] text-slate-500 mt-0.5">{p.sku ?? "—"}</p>
                  </td>
                  <td className="px-5 py-4 font-body text-sm text-slate-400">{p.category.name}</td>
                  <td className="px-5 py-4 font-display font-bold text-sm text-white">{formatPrice(p.price)}</td>
                  <td className="px-5 py-4">
                    <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                      p.stockQuantity > 5 ? "bg-green-900/50 text-green-400"
                      : p.stockQuantity > 0 ? "bg-yellow-900/50 text-yellow-400"
                      : "bg-red-900/50 text-red-400"
                    }`}>
                      {p.stockQuantity} units
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-slate-400">{p.condition}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
