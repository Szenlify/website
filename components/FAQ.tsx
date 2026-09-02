import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import type { Dict } from "@/lib/i18n/types";

interface FAQProps {
    dict: Pick<Dict, "faq">;
}

export default function FAQ({ dict }: FAQProps) {
    const { faq } = dict;

    return (
        <section
            className="py-24 border-t border-white/10 bg-[#050711]/40 relative z-10"
            id="faq"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">
                        {faq.tag}
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-4">
                        {faq.title}
                    </h2>
                </div>

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
                            className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e1222]/90"
                        >
                            <AccordionTrigger className="p-6 font-display text-base font-bold text-white hover:no-underline sm:text-lg [&>svg]:size-5 [&>svg]:text-indigo-400">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6 text-sm leading-relaxed text-slate-300">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
