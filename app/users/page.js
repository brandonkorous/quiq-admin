'use client'

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { fetchUsers, updateUserStatus } from '../utils/api';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            loadUsers()
        }
    }, [user])

    const loadUsers = async () => {
        try {
            setLoading(true)
            const data = await fetchUsers()
            setUsers(data)
        } catch (err) {
            setError('Failed to load users')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (userId, newStatus) => {
        try {
            await updateUserStatus(userId, newStatus)
            setUsers(users.map(user =>
                user.id === userId ? { ...user, status: newStatus } : user
            ))
        } catch (err) {
            setError('Failed to update user status')
            console.error(err)
        }
    }

    if (!user) {
        return <div className="text-center">Please log in to view this page.</div>
    }

    if (loading) {
        return <div className="text-center">Loading...</div>
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">User Management</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Username</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b">{user.id}</td>
                            <td className="py-2 px-4 border-b">{user.username}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.status}</td>
                            <td className="py-2 px-4 border-b">
                                <select
                                    value={user.status}
                                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value="active">Active</option>
                                    <option value="suspended">Suspended</option>
                                    <option value="banned">Banned</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

