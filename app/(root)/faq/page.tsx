// app/faq/page.tsx
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CONTACT_DETAILS, FAQ_CATEGORIES, FAQS } from '@/constants';
import { FaqSectionWithCategories } from '@/components/blocks/faq-with-categories';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter FAQs based on category and search query
  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = !activeCategory || faq.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-5xl px-4 pt-24 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-semibold md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-muted-foreground">
          Find answers to common questions about Macadamia
        </p>
      </div>

      <div className="mb-10">
        <Input
          type="text"
          placeholder="Search for a question..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mx-auto max-w-xl"
        />
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <Badge
          className={`cursor-pointer text-base ${
            activeCategory === null
              ? 'bg-primary'
              : 'bg-secondary text-black dark:text-white'
          }`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </Badge>
        {FAQ_CATEGORIES.map((category) => (
          <Badge
            key={category}
            className={`cursor-pointer text-base ${
              activeCategory === category
                ? 'bg-primary'
                : 'bg-secondary text-black dark:text-white'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {filteredFaqs.length > 0 ? (
        <FaqSectionWithCategories
          title=""
          items={filteredFaqs}
          className="py-0"
        />
      ) : (
        <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
          <p className="text-lg text-muted-foreground">
            No matching questions found. Try a different search term or
            category.
          </p>
        </div>
      )}

      <div className="mt-16 rounded-lg border bg-card p-8 text-center shadow-sm">
        <h2 className="mb-4 text-2xl font-semibold">Still have questions?</h2>
        <p className="mb-6 text-muted-foreground">
          If you couldn&apos;t find the answer you were looking for, feel free
          to reach out to our support team.
        </p>
        <Button>
          <Link href={`mailto:${CONTACT_DETAILS.EMAIL}`}>Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
