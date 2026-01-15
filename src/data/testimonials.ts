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
}

export const testimonials: Testimonial[] = [
    {
        id: 'testimonial-1',
        name: 'Sarah Chen',
        title: 'Senior Developer',
        company: 'DocuFlow',
        quote: "Screenshotly transformed our documentation workflow. We went from spending hours manually capturing screenshots to having them automatically update with every deploy. The AI element removal is a game-changer - no more cookie banners in our docs!",
        rating: 5,
        useCase: 'Documentation',
        featured: true,
    },
    {
        id: 'testimonial-2',
        name: 'Marcus Johnson',
        title: 'CTO',
        company: 'LinkPreview.io',
        quote: "We evaluated 5 different screenshot APIs before choosing Screenshotly. The combination of speed, reliability, and device mockups made it the clear winner. Our link preview generation now handles 50,000+ requests daily without issues.",
        rating: 5,
        useCase: 'Social Media Previews',
        featured: true,
    },
    {
        id: 'testimonial-3',
        name: 'Emily Rodriguez',
        title: 'QA Lead',
        company: 'TestAutomation Inc',
        quote: "Visual regression testing used to be our biggest pain point. Screenshotly's consistent rendering across devices made our CI/CD visual tests actually reliable. We catch UI bugs before they reach production now.",
        rating: 5,
        useCase: 'Visual Testing',
        featured: true,
    },
    {
        id: 'testimonial-4',
        name: 'David Park',
        title: 'Product Manager',
        company: 'Competitor Watch',
        quote: "We monitor 200+ competitor websites daily with Screenshotly. The full-page capture and archiving features have been invaluable for tracking market changes. Setup took less than an hour.",
        rating: 5,
        useCase: 'Competitive Analysis',
    },
    {
        id: 'testimonial-5',
        name: 'Lisa Thompson',
        title: 'Marketing Director',
        company: 'AppShowcase',
        quote: "The device mockups are beautiful! We use Screenshotly to generate all our app store screenshots and marketing materials. Consistent, professional results every time.",
        rating: 5,
        useCase: 'Marketing',
    },
    {
        id: 'testimonial-6',
        name: 'Alex Kim',
        title: 'Freelance Developer',
        company: 'Independent',
        quote: "As a solo developer, I don't have time to manage Puppeteer instances. Screenshotly's API is dead simple and the free tier is generous enough for my client projects.",
        rating: 4,
        useCase: 'Client Work',
    },
    {
        id: 'testimonial-7',
        name: 'Rachel Martinez',
        title: 'Engineering Manager',
        company: 'E-Commerce Plus',
        quote: "We capture product page screenshots for our internal catalog system. The AI removal feature automatically strips out chat widgets and promotional popups, giving us clean product images.",
        rating: 5,
        useCase: 'E-commerce',
    },
    {
        id: 'testimonial-8',
        name: 'James Wilson',
        title: 'Compliance Officer',
        company: 'FinReg Solutions',
        quote: "For regulatory compliance, we need timestamped evidence of website states. Screenshotly's reliable captures with metadata have been accepted by auditors as valid documentation.",
        rating: 5,
        useCase: 'Compliance',
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
