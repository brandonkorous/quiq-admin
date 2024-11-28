# Quiq Admin Panel - TikTok Replica

An administrative dashboard for managing the TikTok replica platform. Built with Next.js and integrated with Auth0 for secure authentication.

## Features

- 🔐 Secure authentication with Auth0
- 👥 User management
- 🎥 Video content moderation
- 📊 Report handling
- 🎨 Modern UI with Tailwind CSS and DaisyUI
- 📱 Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- A configured Auth0 account

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```plaintext
NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
NEXT_PUBLIC_AUTH0_AUDIENCE=your-auth0-api-identifier
NEXT_PUBLIC_API_GATEWAY_URL=https://your-api-gateway-url.com
NEXT_PUBLIC_USER_SERVICE_URL=https://your-user-service-url.com
NEXT_PUBLIC_VIDEO_SERVICE_URL=https://your-video-service-url.com
NEXT_PUBLIC_INTERACTION_SERVICE_URL=https://your-interaction-service-url.com
```

## Installation

1. Clone the repository:


```shellscript
git clone <repository-url>
cd admin
```

2. Install dependencies:


```shellscript
npm install
```

3. Run the development server:


```shellscript
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Project Structure

```plaintext
admin/
├── app/                    # Next.js app directory
│   ├── layout.js          # Root layout component
│   ├── page.js            # Home page
│   ├── users/             # User management
│   ├── videos/            # Video management
│   └── reports/           # Report management
├── components/            # Reusable components
│   └── Navbar.js         # Navigation component
├── utils/                 # Utility functions
│   └── api.js            # API integration
└── public/               # Static assets
```

## Features in Detail

### User Management

- View all users
- Update user status (active/suspended/banned)
- User role management


### Video Management

- View all videos
- Delete inappropriate content
- Video metadata management


### Report Handling

- View user reports
- Resolve reported issues
- Track resolution status


## API Integration

The admin panel integrates with several microservices:

- User Service: Managing user accounts and permissions
- Video Service: Content management
- Interaction Service: Handling reports and user interactions


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## License

This project is licensed under the MIT License - see the LICENSE file for details.