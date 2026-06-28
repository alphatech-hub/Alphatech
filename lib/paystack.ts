// lib/paystack.ts
// Paystack API helper functions.
// All calls use the secret key (server-side only — never exposed to the browser).

const PAYSTACK_BASE = "https://api.paystack.co";
const SECRET = process.env.PAYSTACK_SECRET_KEY!;

function paystackHeaders() {
  return {
    Authorization: `Bearer ${SECRET}`,
    "Content-Type": "application/json",
  };
}

// Initialize a payment transaction
// Returns { authorization_url, access_code, reference }
export async function initializeTransaction({
  email,
  amountKobo, // Paystack uses kobo (1 NGN = 100 kobo)
  reference,
  metadata,
  callbackUrl,
}: {
  email: string;
  amountKobo: number;
  reference: string;
  metadata?: Record<string, any>;
  callbackUrl: string;
}) {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: paystackHeaders(),
    body: JSON.stringify({
      email,
      amount: amountKobo,
      reference,
      metadata,
      callback_url: callbackUrl,
      currency: "NGN",
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Paystack initialization failed");
  }

  const data = await res.json();
  return data.data as {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

// Verify a transaction by reference
// Returns the full transaction object from Paystack
export async function verifyTransaction(reference: string) {
  const res = await fetch(
    `${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: paystackHeaders() }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Paystack verification failed");
  }

  const data = await res.json();
  return data.data as {
    status: string; // "success" | "failed" | "abandoned"
    reference: string;
    amount: number; // in kobo
    customer: { email: string };
    metadata: Record<string, any>;
  };
}
