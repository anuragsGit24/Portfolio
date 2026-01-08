'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const GithubActivitySection = dynamic(
  () => import('@/components/sections/github-activity-section').then(mod => mod.GithubActivitySection),
  { 
    ssr: false,
    loading: () => (
        <div className="container section-padding">
            <div className="max-w-screen-xl mx-auto">
                <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-12" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-48 rounded-lg" />
                    <Skeleton className="h-48 rounded-lg" />
                    <Skeleton className="h-48 rounded-lg" />
                </div>
                 <div className="text-center mt-12">
                    <Skeleton className="h-12 w-48 mx-auto" />
                </div>
            </div>
        </div>
    )
  }
);

export function GithubActivityLoader() {
  return <GithubActivitySection />;
}
