// app/api/repairs/[ticket]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: { ticket: string } }
) {
  try {
    const repair = await prisma.repair.findUnique({
      where: { ticketNumber: params.ticket.toUpperCase() },
      select: {
        ticketNumber: true,
        deviceType: true,
        brandModel: true,
        problemDescription: true,
        status: true,
        estimatedCost: true,
        finalCost: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!repair) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json(repair);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch ticket" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { ticket: string } }
) {
  // Admin/technician only — update repair status
  try {
    const body = await req.json();
    const repair = await prisma.repair.update({
      where: { ticketNumber: params.ticket.toUpperCase() },
      data: {
        status: body.status,
        estimatedCost: body.estimatedCost,
        finalCost: body.finalCost,
        technicianId: body.technicianId,
      },
    });
    return NextResponse.json(repair);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update repair" }, { status: 500 });
  }
}
