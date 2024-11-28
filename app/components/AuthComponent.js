'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

// export const getServerSideProps = (async (context) => {
//     return { props: { token: await getAccessToken(context.req, context.res) } };
// });
export default function AuthComponent() {
    const { user, error, isLoading, logout } = useUser();
    if (isLoading) {
        return <span className='loading loading-dots loading-md m-auto'></span>
        //return <div className='text-white'>Loading...</div>;
    }

    if (error) {
        return <div className='text-red-500'>{error.message}</div>;
    }

    if (user) {
        return (
            <div className="">
                    <div>
                            <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                            <span>{user.name}</span>
                            <svg className="ml-1 h-5 w-5 fill-current" viewBox="0 0 20 20">
                                <i className='fad fa-caret-down'></i>
                            </svg>
                                <div className="py-1">
                                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                        Your Profile
                                    </Link>
                                    <Link href='/api/auth/logout' className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" >
                                        Logout
                                    </Link>

                                </div>
                    </div>
            </div>
        );
    } else {
        return (
            <ul className="menu menu-horizontal p-2">
                <li>
                    <Link href='/api/auth/login' className="bg-primary-subtle hover:bg-primary hover:text-white">
                        Sign In
                    </Link>
                </li>
                <li>
                    <Link href='/' className="bg-tertiary-subtle hover:bg-tertiary">
                        Sign Up
                    </Link>
                </li>
            </ul>
        );
    }
}
