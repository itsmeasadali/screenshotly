import { ImageResponse } from 'next/og';
import { getBlogPost } from '@/lib/markdown';

export const runtime = 'nodejs';

// 1200×630 social-card preview generator for blog posts.
// Hit `/api/og/blog/<slug>` to render. Cached aggressively at the CDN edge —
// every blog post gets a unique branded preview without us shipping a PNG file
// for each one. Falls back to a brand-only template if the post is missing.

const BRAND = {
    name: 'Screenshotly',
    primary: '#7c3aed', // matches Tailwind primary
    bg: '#0b0b14',
    text: '#f5f5f7',
    muted: '#9aa0a6',
};

function categoryLabel(category?: string) {
    switch (category) {
        case 'tutorial':
            return 'Tutorial';
        case 'guide':
            return 'Guide';
        case 'comparison':
            return 'Comparison';
        case 'case-study':
            return 'Case Study';
        case 'reference':
            return 'Reference';
        case 'tips':
            return 'Tips';
        case 'news':
            return 'News';
        default:
            return 'Article';
    }
}

interface Props {
    params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, { params }: Props) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    const title = post?.title ?? 'Screenshotly Blog';
    const author = post?.author ? formatAuthor(post.author) : 'Screenshotly';
    const category = categoryLabel(post?.category);
    const readingTime = post?.readingTime ? `${post.readingTime} min read` : null;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: `linear-gradient(135deg, ${BRAND.bg} 0%, #1a1530 100%)`,
                    color: BRAND.text,
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Helvetica, sans-serif',
                    padding: '64px 72px',
                    position: 'relative',
                }}
            >
                {/* Subtle accent line at top */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: BRAND.primary,
                    }}
                />

                {/* Brand row */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            background: BRAND.primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 24,
                            color: 'white',
                            fontWeight: 800,
                        }}
                    >
                        S
                    </div>
                    {BRAND.name}
                </div>

                {/* Category chip */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 48,
                        padding: '8px 18px',
                        borderRadius: 999,
                        background: 'rgba(124, 58, 237, 0.18)',
                        color: BRAND.primary,
                        fontSize: 22,
                        fontWeight: 600,
                        width: 'fit-content',
                        letterSpacing: '0.02em',
                    }}
                >
                    {category}
                </div>

                {/* Headline */}
                <div
                    style={{
                        display: 'flex',
                        marginTop: 28,
                        fontSize: 64,
                        fontWeight: 800,
                        lineHeight: 1.08,
                        letterSpacing: '-0.025em',
                        maxWidth: 1000,
                    }}
                >
                    {title}
                </div>

                {/* Footer row pinned to bottom */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                        fontSize: 22,
                        color: BRAND.muted,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 999,
                                background: 'rgba(245, 245, 247, 0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 18,
                                fontWeight: 700,
                                color: BRAND.text,
                            }}
                        >
                            {author.charAt(0).toUpperCase()}
                        </div>
                        <span>{author}</span>
                        {readingTime && (
                            <>
                                <span style={{ opacity: 0.4 }}>·</span>
                                <span>{readingTime}</span>
                            </>
                        )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>screenshotly.app</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            // Cache aggressively — the page content changes far less often than visit traffic.
            // CDN serves the same image until the post's frontmatter title changes.
            headers: {
                'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
            },
        }
    );
}

function formatAuthor(slug: string): string {
    // Convert "asad-ali" → "Asad Ali"
    return slug
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}
