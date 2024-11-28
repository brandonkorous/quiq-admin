'use client'

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Quiq Admin</h1>
        <p className="mb-4">Please log in to access the admin panel.</p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Quiq Admin</h1>
      <p className="mb-4">Hello, {user?.name}! You're logged in to the admin panel.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p>Manage user accounts, roles, and permissions.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Content Moderation</h2>
          <p>Review and moderate user-generated content.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p>View platform statistics and performance metrics.</p>
        </div>
      </div>
    </div>
  )
}

