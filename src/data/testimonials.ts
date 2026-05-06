// Customer testimonials rendered on `/customers` and emitted as AggregateRating
// JSON-LD via `getCustomerReviewsSchema()`. Each entry corresponds to a published
// customer case study under `content/blog/customer-story-*`. Keep in sync when
// case studies are added, rewritten, or retired.

export interface Testimonial {
    id: string;
    name: string;
    title: string;
    company: string;
    companyUrl?: string;
    avatar?: string;
    quote: string;
    rating: 1 | 2 | 3 | 4 | 5;
    useCase?: string;
    featured?: boolean;
    results?: string;
}

export const testimonials: Testimonial[] = [
    {
        id: 'techflow-docs',
        name: 'Sarah Chen',
        title: 'Lead Technical Writer',
        company: 'TechFlow',
        quote: "We were spending twenty hours every week manually updating screenshots across two hundred documentation pages. After wiring Screenshotly into our CI, the screenshots refresh themselves on every release and we get our afternoons back.",
        rating: 5,
        useCase: 'Documentation',
        featured: true,
        results: 'Reduced doc-screenshot maintenance by 85%',
    },
    {
        id: 'designstudio-social',
        name: 'Marcus Rivera',
        title: 'Backend Lead',
        company: 'DesignStudio Pro',
        quote: "Our self-hosted Puppeteer cluster was eating infrastructure budget and pager minutes in equal measure. Moving dynamic OG image generation to Screenshotly dropped our capture costs by an order of magnitude and retired the Chrome-in-production fire drill.",
        rating: 5,
        useCase: 'Social Media Previews',
        featured: true,
        results: '10,000+ social previews generated daily',
    },
    {
        id: 'saasify-competitive',
        name: 'Priya Natarajan',
        title: 'Product Marketing Lead',
        company: 'SaaSify',
        quote: "Tracking fifty competitors by hand is a full-time job nobody wants. We scheduled daily captures of their pricing and feature pages, zone-split the diffs, and now our deal desk knows about competitor pricing changes within hours instead of weeks.",
        rating: 5,
        useCase: 'Competitive Analysis',
        featured: true,
        results: 'Caught 12 competitor pricing shifts in Q1',
    },
    {
        id: 'cloudmetrics-reporting',
        name: 'Daniel Okafor',
        title: 'Staff Engineer',
        company: 'CloudMetrics',
        quote: "We had two people generating dashboard PDFs for 500 enterprise clients every day. Automating it via Screenshotly turned a four-hour manual shift into a twelve-minute background job and freed both of them to work on actual product.",
        rating: 5,
        useCase: 'Reporting',
        featured: true,
        results: '90% reduction in report generation time',
    },
];

/** Testimonials flagged as featured (rendered in hero/social-proof strips). */
export function getFeaturedTestimonials(): Testimonial[] {
    return testimonials.filter((t) => t.featured);
}

/** Filter helper for testimonials tied to a specific use-case slug. */
export function getTestimonialsByUseCase(useCase: string): Testimonial[] {
    return testimonials.filter((t) => t.useCase === useCase);
}

/** Average rating across all testimonials, rounded to one decimal. */
export function getAverageRating(): number {
    if (testimonials.length === 0) return 0;
    const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
    return Math.round((sum / testimonials.length) * 10) / 10;
}

/** Total count of review entries — used for AggregateRating schema `reviewCount`. */
export function getTotalReviews(): number {
    return testimonials.length;
}
