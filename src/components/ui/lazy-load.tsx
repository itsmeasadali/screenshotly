'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface LazyLoadProps {
    children: ReactNode;
    className?: string;
    placeholder?: ReactNode;
    rootMargin?: string;
    threshold?: number;
}

/**
 * LazyLoad component for below-fold content
 * Uses Intersection Observer to defer rendering until visible
 */
export function LazyLoad({
    children,
    className = '',
    placeholder,
    rootMargin = '100px',
    threshold = 0.1,
}: LazyLoadProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin,
                threshold,
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [rootMargin, threshold]);

    return (
        <div ref={ref} className={className}>
            {isVisible ? children : placeholder || <div className="min-h-[200px]" />}
        </div>
    );
}

/**
 * Skeleton loading placeholder
 */
export function Skeleton({ className = '' }: { className?: string }) {
    return (
        <div
            className={`animate-pulse bg-muted rounded ${className}`}
            aria-hidden="true"
        />
    );
}

/**
 * Card skeleton for loading states
 */
export function CardSkeleton() {
    return (
        <div className="border rounded-lg p-6 space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-32 mt-4" />
        </div>
    );
}

/**
 * Section skeleton for loading states
 */
export function SectionSkeleton() {
    return (
        <div className="py-16 space-y-8">
            <div className="text-center space-y-4">
                <Skeleton className="h-8 w-64 mx-auto" />
                <Skeleton className="h-4 w-96 mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </div>
    );
}
