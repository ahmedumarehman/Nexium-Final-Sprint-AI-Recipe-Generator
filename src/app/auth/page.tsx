'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Mail, Loader, CheckCircle, AlertCircle } from 'lucide-react';

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams]);

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: `${window.location.origin}/generate`,
                },
            });

            if (error) {
                setError(error.message);
            } else {
                setMessage('Check your email for the magic link!');
                setEmail('');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
            >
                <div className="text-center mb-6">
                    <Mail className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Sign In with Magic Link
                    </h1>
                    <p className="text-gray-600">
                        Enter your email and we&apos;ll send you a magic link to sign in.
                    </p>
                </div>

                <form onSubmit={handleMagicLink} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                            required
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg"
                        >
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm">{error}</span>
                        </motion.div>
                    )}

                    {message && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg"
                        >
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">{message}</span>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <Loader className="h-4 w-4 animate-spin mr-2" />
                                Sending Magic Link...
                            </>
                        ) : (
                            <>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Magic Link
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        No password required! We&apos;ll send you a secure link to your email.
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <Link
                        href="/"
                        className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
