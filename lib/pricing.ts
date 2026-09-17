import type { Locale } from "@/lib/i18n/types";

export interface PlanPrice {
    amount: number;
    formatted: string;
}

export interface LocalePricing {
    currency: string;
    symbol: string;
    plans: {
        free: PlanPrice;
        basic: PlanPrice;
        pro: PlanPrice;
    };
}

export const LOCALIZED_PRICES = Object.freeze({
    pl: {
        currency: "PLN",
        symbol: "zł",
        plans: {
            free: {
                amount: 0,
                formatted: "0 zł",
            },
            basic: {
                amount: 29.99,
                formatted: "29,99 zł",
            },
            pro: {
                amount: 79.99,
                formatted: "79,99 zł",
            },
        },
    },
    en: {
        currency: "USD",
        symbol: "$",
        plans: {
            free: {
                amount: 0,
                formatted: "$0",
            },
            basic: {
                amount: 7.99,
                formatted: "$7.99",
            },
            pro: {
                amount: 19.99,
                formatted: "$19.99",
            },
        },
    },
    de: {
        currency: "EUR",
        symbol: "€",
        plans: {
            free: {
                amount: 0,
                formatted: "0 €",
            },
            basic: {
                amount: 6.99,
                formatted: "6,99 €",
            },
            pro: {
                amount: 19.99,
                formatted: "19,99 €",
            },
        },
    },
    es: {
        currency: "EUR",
        symbol: "€",
        plans: {
            free: {
                amount: 0,
                formatted: "0 €",
            },
            basic: {
                amount: 6.99,
                formatted: "6,99 €",
            },
            pro: {
                amount: 19.99,
                formatted: "19,99 €",
            },
        },
    },
    nl: {
        currency: "EUR",
        symbol: "€",
        plans: {
            free: {
                amount: 0,
                formatted: "0 €",
            },
            basic: {
                amount: 6.99,
                formatted: "6,99 €",
            },
            pro: {
                amount: 19.99,
                formatted: "19,99 €",
            },
        },
    },
    fr: {
        currency: "EUR",
        symbol: "€",
        plans: {
            free: {
                amount: 0,
                formatted: "0 €",
            },
            basic: {
                amount: 6.99,
                formatted: "6,99 €",
            },
            pro: {
                amount: 19.99,
                formatted: "19,99 €",
            },
        },
    },
    it: {
        currency: "EUR",
        symbol: "€",
        plans: {
            free: {
                amount: 0,
                formatted: "0 €",
            },
            basic: {
                amount: 6.99,
                formatted: "6,99 €",
            },
            pro: {
                amount: 19.99,
                formatted: "19,99 €",
            },
        },
    },
    ja: {
        currency: "JPY",
        symbol: "¥",
        plans: {
            free: {
                amount: 0,
                formatted: "¥0",
            },
            basic: {
                amount: 1200,
                formatted: "¥1,200",
            },
            pro: {
                amount: 3000,
                formatted: "¥3,000",
            },
        },
    },
    ko: {
        currency: "KRW",
        symbol: "₩",
        plans: {
            free: {
                amount: 0,
                formatted: "₩0",
            },
            basic: {
                amount: 11000,
                formatted: "₩11,000",
            },
            pro: {
                amount: 27000,
                formatted: "₩27,000",
            },
        },
    },
    cs: {
        currency: "CZK",
        symbol: "Kč",
        plans: {
            free: {
                amount: 0,
                formatted: "0 Kč",
            },
            basic: {
                amount: 199,
                formatted: "199 Kč",
            },
            pro: {
                amount: 499,
                formatted: "499 Kč",
            },
        },
    },
    pt: {
        currency: "BRL",
        symbol: "R$",
        plans: {
            free: {
                amount: 0,
                formatted: "R$ 0",
            },
            basic: {
                amount: 39.9,
                formatted: "R$ 39,90",
            },
            pro: {
                amount: 99.9,
                formatted: "R$ 99,90",
            },
        },
    },
} as const satisfies Record<Locale, LocalePricing>);

export function getLocalizedPricing(locale?: string): LocalePricing {
    if (!locale) return LOCALIZED_PRICES.en;
    const key = locale.toLowerCase().split("-")[0] as Locale;
    return LOCALIZED_PRICES[key] || LOCALIZED_PRICES.en;
}
