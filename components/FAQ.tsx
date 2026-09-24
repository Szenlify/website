import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import type { Dict } from "@/lib/i18n/types";
import { HelpCircle } from "lucide-react";

interface FAQProps {
    dict: Pick<Dict, "faq">;
}

export default function FAQ({ dict }: FAQProps) {
    const { faq } = dict;

    return (
        <section
            className="py-24 sm:py-36 lg:py-44 border-t border-white/[0.08] relative z-10"
            id="faq"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs font-bold text-indigo-300 mb-5 tracking-wider uppercase">
                        <HelpCircle className="size-3.5" />
                        <span>{faq.tag}</span>
                    </div>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight text-balance">
                        {faq.title}
                    </h2>
                </div>

                {/* Accordion List */}
                <Accordion
                    type="single"
                    collapsible
                    defaultValue="faq-0"
                    className="space-y-4"
                >
                    {faq.items.map((item, index) => (
                        <AccordionItem
                            key={item.question}
                            value={`faq-${index}`}
                            className="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#0c1020]/75 backdrop-blur-xl transition-all duration-200 hover:border-indigo-500/35"
                        >
                            <AccordionTrigger className="px-6 py-5 sm:px-8 sm:py-6 font-display text-lg sm:text-xl font-bold text-white hover:no-underline hover:text-indigo-200 text-left transition-colors [&>svg]:size-5 [&>svg]:text-indigo-400">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6 sm:px-8 sm:pb-8 text-base sm:text-lg leading-relaxed text-slate-200 font-normal border-t border-white/5 pt-5">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
