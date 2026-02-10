// Customer testimonials data for social proof and review schema
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
        id: 'testimonial-1',
        name: 'Sarah Chen',
        title: 'Senior Developer',
        company: 'DocuFlow',
        quote: "Screenshotly transformed our documentation workflow. We went from spending hours manually capturing screenshots to having them automatically update with every deploy. The AI element removal is a game-changer.",
        rating: 5,
        useCase: 'Documentation',
        featured: true,
        results: 'Reduced manual screenshots by 85%',
    },
    {
        id: 'testimonial-2',
        name: 'Marcus Johnson',
        title: 'CTO',
        company: 'LinkPreview.io',
        quote: "We evaluated 5 different screenshot APIs. The combination of speed, reliability, and device mockups made Screenshotly the clear winner. Our link preview generation handles 50k+ requests daily without issues.",
        rating: 5,
        useCase: 'Social Media Previews',
        featured: true,
        results: '50k+ daily previews generated',
    },
    {
        id: 'testimonial-3',
        name: 'Emily Rodriguez',
        title: 'QA Lead',
        company: 'QABelt',
        quote: "Visual regression testing used to be our biggest pain point. Screenshotly's consistent rendering across devices made our CI/CD visual tests actually reliable.",
        rating: 5,
        useCase: 'Visual Testing',
        featured: true,
        results: 'Zero visual regressions in prod',
    },
    {
        id: 'testimonial-4',
        name: 'David Park',
        title: 'Product Manager',
        company: 'TrackRight',
        quote: "We monitor competitor landing pages daily. The full-page capture and archiving has been invaluable for tracking market changes. Setup was surprisingly easy.",
        rating: 5,
        useCase: 'Competitive Analysis',
        results: 'tracked 200+ competitors daily',
    },
    {
        id: 'testimonial-5',
        name: 'Lisa Thompson',
        title: 'Marketing Director',
        company: 'Showcase.dev',
        quote: "The device mockups are beautiful! We use them to generate all our app store screenshots and marketing materials. Consistent, professional results every time.",
        rating: 5,
        useCase: 'Marketing',
        results: '10x faster asset creation',
    },
    {
        id: 'testimonial-6',
        name: 'Alex Kim',
        title: 'Freelance Developer',
        company: 'Independent',
        quote: "As a solo dev, I don't have time to manage Puppeteer instances. The API is dead simple and the free tier is generous enough for my client projects.",
        rating: 4,
        useCase: 'Client Work',
        results: 'Saved ~5 hours per project',
    },
    {
        id: 'testimonial-7',
        name: 'Rachel Martinez',
        title: 'Engineering Manager',
        company: 'ShopScale',
        quote: "We capture product page screenshots for our internal catalog. The AI removal feature automatically strips out chat widgets, giving us clean product images.",
        rating: 5,
        useCase: 'E-commerce',
        results: 'Automated clean product images',
    },
    {
        id: 'testimonial-8',
        name: 'James Wilson',
        title: 'Compliance Officer',
        company: 'CompliTech',
        quote: "For regulatory compliance, we need timestamped evidence of website states. Reliable captures with metadata have been accepted by auditors as valid documentation.",
        rating: 5,
        useCase: 'Compliance',
        results: '100% audit compliance rate',
    },
];

export function getFeaturedTestimonials(): Testimonial[] {
    return testimonials.filter(t => t.featured);
}

export function getTestimonialsByUseCase(useCase: string): Testimonial[] {
    return testimonials.filter(t => t.useCase === useCase);
}

export function getAverageRating(): number {
    const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
    return Math.round((sum / testimonials.length) * 10) / 10;
}

export function getTotalReviews(): number {
    return testimonials.length;
}

