import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Navbar from './components/Navbar'

export const metadata = {
    title: 'Quiq Admin - TikTok Replica',
    description: 'Admin panel for Quiq TikTok Replica',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="light">
            <body className="min-h-screen bg-gray-100">
                <UserProvider>
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                        {children}
                    </main>
                </UserProvider>
            </body>
        </html>
    )
}

