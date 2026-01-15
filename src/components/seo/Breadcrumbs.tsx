'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
    const pathname = usePathname();

    // Auto-generate breadcrumbs from pathname if items not provided
    const breadcrumbItems = items || generateBreadcrumbs(pathname);

    if (breadcrumbItems.length === 0) {
        return null;
    }

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}
        >
            <Link
                href="/"
                className="hover:text-foreground transition-colors flex items-center gap-1"
                aria-label="Home"
            >
                <Home className="w-4 h-4" />
            </Link>

            {breadcrumbItems.map((item, index) => (
                <span key={item.href} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    {index === breadcrumbItems.length - 1 ? (
                        <span className="text-foreground font-medium" aria-current="page">
                            {item.label}
                        </span>
                    ) : (
                        <Link
                            href={item.href}
                            className="hover:text-foreground transition-colors"
                        >
                            {item.label}
                        </Link>
                    )}
                </span>
            ))}
        </nav>
    );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
    if (pathname === '/') return [];

    const segments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    let currentPath = '';
    for (const segment of segments) {
        currentPath += `/${segment}`;
        items.push({
            label: formatSegment(segment),
            href: currentPath,
        });
    }

    return items;
}

function formatSegment(segment: string): string {
    // Convert slug to readable format
    return segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
