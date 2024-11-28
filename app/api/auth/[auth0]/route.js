import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

// export const GET = async (req) => {
//     try {
//         await handleAuth({
//             onError: (err, res) => {
//                 res.writeHead(302, {
//                     Location: '/api/auth/login'
//                 });
//                 res.end();
//             },
//             login: handleLogin({
//                 authorizationParams: {
//                     audience: process.env.AUTH0_AUDIENCE,
//                     scope: 'openid profile email offline_access read:content',
//                 }
//             })
//         })(req, NextResponse);

//         return NextResponse.next();
//     } catch (error) {
//         return new NextResponse(error.message, { status: error.status || 500 });
//     }
// };

export const GET = handleAuth();