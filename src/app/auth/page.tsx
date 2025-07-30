import { Suspense } from 'react';
import AuthClient from './AuthClient';

export const dynamic = 'force-dynamic'; // Optional, for safer SSR handling

export default function AuthPage() {
    return (
        <Suspense fallback={<div>Loading auth...</div>}>
            <AuthClient />
        </Suspense>
    );
}
