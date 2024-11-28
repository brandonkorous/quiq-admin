'use client'

import Link from 'next/link';
import AuthComponent from './AuthComponent';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <nav className="navbar bg-primary text-primary-content shadow-lg">
            <div className="container mx-auto">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost normal-case text-xl">
                        Quiq Admin
                    </Link>
                    {user && (
                        <div className="hidden sm:flex sm:space-x-8">
                            <Link href="/users" className="btn btn-ghost">
                                Users
                            </Link>
                            <Link href="/videos" className="btn btn-ghost">
                                Videos
                            </Link>
                            <Link href="/reports" className="btn btn-ghost">
                                Reports
                            </Link>
                        </div>
                    )}
                </div>
                <div className="flex-none">
                    <AuthComponent />
                </div>
            </div>
        </nav>
    )
}

