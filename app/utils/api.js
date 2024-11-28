import { getAccessTokenSilently } from '@auth0/nextjs-auth0';

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL
const USER_SERVICE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL
const VIDEO_SERVICE_URL = process.env.NEXT_PUBLIC_VIDEO_SERVICE_URL
const INTERACTION_SERVICE_URL = process.env.NEXT_PUBLIC_INTERACTION_SERVICE_URL

async function fetchWithAuth(url, options = {}) {
    const token = await getAccessTokenSilently()
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    }
    const response = await fetch(url, { ...options, headers })
    if (!response.ok) {
        throw new Error('API request failed')
    }
    return response.json()
}

export async function fetchUsers(page = 1, limit = 10) {
    return fetchWithAuth(`${USER_SERVICE_URL}/users?page=${page}&limit=${limit}`)
}

export async function fetchVideos(page = 1, limit = 10) {
    return fetchWithAuth(`${VIDEO_SERVICE_URL}/videos?page=${page}&limit=${limit}`)
}

export async function fetchReports(page = 1, limit = 10) {
    return fetchWithAuth(`${INTERACTION_SERVICE_URL}/reports?page=${page}&limit=${limit}`)
}

export async function updateUserStatus(userId, status) {
    return fetchWithAuth(`${USER_SERVICE_URL}/users/${userId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    })
}

export async function deleteVideo(videoId) {
    return fetchWithAuth(`${VIDEO_SERVICE_URL}/videos/${videoId}`, { method: 'DELETE' })
}

export async function resolveReport(reportId, resolution) {
    return fetchWithAuth(`${INTERACTION_SERVICE_URL}/reports/${reportId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolution }),
    })
}

