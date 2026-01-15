'use client';

import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { testimonials, getFeaturedTestimonials, getAverageRating, getTotalReviews } from '@/data/testimonials';

interface TestimonialsProps {
    showAll?: boolean;
    className?: string;
}

export function Testimonials({ showAll = false, className = '' }: TestimonialsProps) {
    const displayTestimonials = showAll ? testimonials : getFeaturedTestimonials();
    const averageRating = getAverageRating();
    const totalReviews = getTotalReviews();

    return (
        <section className={`py-16 ${className}`}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Loved by Developers</h2>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-5 h-5 ${star <= Math.round(averageRating)
                                            ? 'text-yellow-500 fill-yellow-500'
                                            : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="font-medium">{averageRating}</span>
                        <span className="text-muted-foreground">
                            ({totalReviews} reviews)
                        </span>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of developers who trust Screenshotly for their screenshot automation
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {displayTestimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="h-full">
                            <CardContent className="p-6 flex flex-col h-full">
                                {/* Rating */}
                                <div className="flex mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= testimonial.rating
                                                    ? 'text-yellow-500 fill-yellow-500'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-muted-foreground flex-1 mb-4">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-foreground">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {testimonial.title}, {testimonial.company}
                                        </div>
                                    </div>
                                </div>

                                {/* Use Case Tag */}
                                {testimonial.useCase && (
                                    <div className="mt-4">
                                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                            {testimonial.useCase}
                                        </span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Generate Review schema for structured data
export function getReviewSchema() {
    const reviews = testimonials.map((t) => ({
        '@type': 'Review',
        reviewRating: {
            '@type': 'Rating',
            ratingValue: t.rating,
            bestRating: 5,
        },
        author: {
            '@type': 'Person',
            name: t.name,
        },
        reviewBody: t.quote,
    }));

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Screenshotly',
        description: 'Screenshot API for Developers',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: getAverageRating(),
            reviewCount: getTotalReviews(),
            bestRating: 5,
        },
        review: reviews.slice(0, 5), // Limit to 5 for schema
    };
}
