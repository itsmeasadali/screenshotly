'use client';

import { Card, CardContent } from '@/components/ui/card';
import { homepageFAQs } from '@/data/homepage-faqs';

export function HomeFAQSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Common questions about the Screenshotly screenshot API.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {homepageFAQs.map((faq, index) => (
            <Card key={index} className="hover:border-primary/20 transition-colors">
              <CardContent className="p-5">
                <h3 className="text-base font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
