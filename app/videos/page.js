'use client'

import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/nextjs-auth0'
import { fetchVideos, deleteVideo } from '../utils/api'

export default function Videos() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      loadVideos()
    }
  }, [isAuthenticated])

  const loadVideos = async () => {
    try {
      setLoading(true)
      const data = await fetchVideos()
      setVideos(data)
    } catch (err) {
      setError('Failed to load videos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteVideo = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideo(videoId)
        setVideos(videos.filter(video => video.id !== videoId))
      } catch (err) {
        setError('Failed to delete video')
        console.error(err)
      }
    }
  }

  if (!isAuthenticated) {
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
      <h1 className="text-3xl font-bold mb-4">Video Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map(video => (
          <div key={video.id} className="border rounded-lg p-4">
            <video src={video.url} className="w-full h-48 object-cover mb-2" controls />
            <h2 className="text-lg font-semibold">{video.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{video.description}</p>
            <button 
              onClick={() => handleDeleteVideo(video.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

