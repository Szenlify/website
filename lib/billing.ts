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

const BILLING_ERRORS: Record<Locale, { checkout: string; invalidUrl: string }> = {
    pl: { checkout: "Nie udało się otworzyć płatności. Spróbuj ponownie.", invalidUrl: "Nieprawidłowy adres płatności." },
    en: { checkout: "Could not open checkout. Please try again.", invalidUrl: "Invalid checkout URL." },
    de: { checkout: "Zahlungsseite konnte nicht geöffnet werden. Bitte erneut versuchen.", invalidUrl: "Ungültige Zahlungsadresse." },
    es: { checkout: "No se pudo abrir la pasarela de pago. Inténtalo de nuevo.", invalidUrl: "URL de pago no válida." },
    fr: { checkout: "Impossible d'ouvrir la page de paiement. Veuillez réessayer.", invalidUrl: "URL de paiement non valide." },
    it: { checkout: "Impossibile aprire la pagina di pagamento. Riprova.", invalidUrl: "URL di pagamento non valido." },
    cs: { checkout: "Platební bránu se nepodařilo otevřít. Zkuste to znovu.", invalidUrl: "Neplatná platební adresa." },
    nl: { checkout: "Kan kassa niet openen. Probeer het opnieuw.", invalidUrl: "Ongeldige afreken-URL." },
    pt: { checkout: "Não foi possível abrir o checkout. Tente novamente.", invalidUrl: "URL de checkout inválida." },
    ja: { checkout: "決済画面を開けませんでした。もう一度お試しください。", invalidUrl: "無効な決済URLです。" },
    ko: { checkout: "결제 화면을 열 수 없습니다. 다시 시도해 주세요.", invalidUrl: "잘못된 결제 URL입니다." },
};

export async function getBillingUrl(user: User, locale: Locale, purchase?: { plan: PaidPlan; paymentMode: PaymentMode }): Promise<string> {
    const token = await user.getIdToken(true);
    const err = BILLING_ERRORS[locale] || BILLING_ERRORS.en;
    const response = await fetch(`${BILLING_URL}/${purchase ? "createStripeCheckoutSession" : "createStripePortalSession"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(purchase ? { ...purchase, lang: locale } : {}),
    });
    const data = await response.json().catch(() => ({}));
    // The existing backend redirects an active subscriber to the billing portal.
    if (!response.ok && !(response.status === 409 && data.url)) {
        throw new Error(data.error || err.checkout);
    }
    const url = new URL(data.url);
    if (url.protocol !== "https:" || !["checkout.stripe.com", "billing.stripe.com"].includes(url.hostname)) {
        throw new Error(err.invalidUrl);
    }
    return url.href;
}
