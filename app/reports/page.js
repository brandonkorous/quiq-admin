'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { fetchReports, resolveReport } from '../utils/api'

export default function Reports() {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            loadReports()
        }
    }, [user])

    const loadReports = async () => {
        try {
            setLoading(true)
            const data = await fetchReports()
            setReports(data)
        } catch (err) {
            setError('Failed to load reports')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleResolveReport = async (reportId, resolution) => {
        try {
            await resolveReport(reportId, resolution)
            setReports(reports.map(report =>
                report.id === reportId ? { ...report, status: 'resolved', resolution } : report
            ))
        } catch (err) {
            setError('Failed to resolve report')
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
            <h1 className="text-3xl font-bold mb-4">Reports</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Type</th>
                        <th className="py-2 px-4 border-b">Content ID</th>
                        <th className="py-2 px-4 border-b">Reporter</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.id}>
                            <td className="py-2 px-4 border-b">{report.id}</td>
                            <td className="py-2 px-4 border-b">{report.type}</td>
                            <td className="py-2 px-4 border-b">{report.contentId}</td>
                            <td className="py-2 px-4 border-b">{report.reporterId}</td>
                            <td className="py-2 px-4 border-b">{report.status}</td>
                            <td className="py-2 px-4 border-b">
                                {report.status === 'pending' && (
                                    <div>
                                        <button
                                            onClick={() => handleResolveReport(report.id, 'accepted')}
                                            className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleResolveReport(report.id, 'rejected')}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

