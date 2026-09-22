import type { User } from "firebase/auth";
import type { Locale } from "@/lib/i18n/types";

export type PaidPlan = "basic" | "pro";
export type PaymentMode = "subscription" | "blik";

// Mirrored from Lectoro/functions/subscription-config.js. Checkout pricing and
// entitlement decisions remain server-owned, never supplied by this client.
export const BILLING_PLANS = {
    basic: { monthlyUsd: 7.99, blikPln: 29.99, cards: 2500, ai: 800, voiceCharacters: 10000 },
    pro: { monthlyUsd: 19.99, blikPln: 79.99, cards: Infinity, ai: Infinity, voiceCharacters: 100000 },
} as const;
const BILLING_URL = "https://europe-west1-extension-eng.cloudfunctions.net";

export async function getBillingUrl(user: User, locale: Locale, purchase?: { plan: PaidPlan; paymentMode: PaymentMode }): Promise<string> {
    const token = await user.getIdToken(true);
    const response = await fetch(`${BILLING_URL}/${purchase ? "createStripeCheckoutSession" : "createStripePortalSession"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(purchase ? { ...purchase, lang: locale } : {}),
    });
    const data = await response.json().catch(() => ({}));
    // The existing backend redirects an active subscriber to the billing portal.
    if (!response.ok && !(response.status === 409 && data.url)) {
        throw new Error(data.error || (locale === "pl" ? "Nie udało się otworzyć płatności. Spróbuj ponownie." : "Could not open checkout. Please try again."));
    }
    const url = new URL(data.url);
    if (url.protocol !== "https:" || !["checkout.stripe.com", "billing.stripe.com"].includes(url.hostname)) {
        throw new Error(locale === "pl" ? "Nieprawidłowy adres płatności." : "Invalid checkout URL.");
    }
    return url.href;
}
