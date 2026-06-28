// app/account/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SignOutButton from "@/components/account/SignOutButton";
import { Package, Wrench, FileText, User } from "lucide-react";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  // middleware.ts already guarantees session exists here, but check defensively
  if (!session) return null;

  const [orderCount, repairCount] = await Promise.all([
    prisma.order.count({ where: { userId: session.user.id } }),
    prisma.repair.count({ where: { userId: session.user.id } }),
  ]);

  const cards = [
    { icon: Package, label: "Orders", value: orderCount, href: "/account/orders" },
    { icon: Wrench, label: "Repairs", value: repairCount, href: "/account/repairs" },
    { icon: FileText, label: "Invoices", value: orderCount, href: "/account/orders" },
  ];

  return (
    <main className="bg-slate-50 min-h-[70vh] py-12">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900">Hi, {session.user.name}</h1>
            <p className="font-body text-sm text-slate-500">{session.user.email}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {cards.map((c) => (
            <Link key={c.label} href={c.href} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
              <c.icon className="h-5 w-5 text-blue-700 mb-3" />
              <p className="font-display font-bold text-2xl text-slate-900">{c.value}</p>
              <p className="font-body text-sm text-slate-500 mt-1">{c.label}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
