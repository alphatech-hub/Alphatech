// app/api/repairs/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const repairSchema = z.object({
  deviceType: z.string().min(1, "Select a device type"),
  brandModel: z.string().optional(),
  problemDescription: z.string().min(10, "Please describe the problem in more detail"),
  photos: z.array(z.string()).optional(),
  preferredDate: z.string().min(1, "Select a preferred date"),
  preferredTime: z.string().min(1, "Select a preferred time"),
  // Contact info (for guest bookings)
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
});

function generateTicketNumber() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  const hex = Math.random().toString(16).substring(2, 5).toUpperCase();
  return `ALP-RP-${year}-${random}${hex}`;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const parsed = repairSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const {
      deviceType, brandModel, problemDescription,
      photos, preferredDate, preferredTime,
      name, email, phone,
    } = parsed.data;

    const ticketNumber = generateTicketNumber();

    // Create the repair ticket
    const repair = await prisma.repair.create({
      data: {
        ticketNumber,
        userId: session?.user?.id ?? null,
        deviceType,
        brandModel,
        problemDescription,
        photos: photos ?? [],
        status: "RECEIVED",
      },
    });

    // Create a linked appointment
    await prisma.appointment.create({
      data: {
        userId: session?.user?.id ?? null,
        type: "REPAIR_DROPOFF",
        preferredDate: new Date(preferredDate),
        preferredTime,
        status: "PENDING",
        notes: `Repair ticket: ${ticketNumber} | Contact: ${name} | ${email} | ${phone}`,
      },
    });

    return NextResponse.json(
      { ticketNumber, repairId: repair.id, status: repair.status },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Repair booking error:", err);
    return NextResponse.json(
      { error: err.message ?? "Failed to create repair booking" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const repairs = await prisma.repair.findMany({
      where: session.user.role === "ADMIN" ? {} : { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(repairs);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch repairs" }, { status: 500 });
  }
}
