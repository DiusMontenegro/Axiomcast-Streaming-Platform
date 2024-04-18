import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AxiomCast',
    description: 'Revamped Video Calling App',
    icons: {
        icon: '/icons/logo.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ClerkProvider
                appearance={{
                    layout: {
                        logoImageUrl: '/icons/logo.svg',
                        socialButtonsVariant: 'iconButton',
                    },
                    variables: {
                        colorText: '#1c1c1c',
                        colorPrimary: '#00AEEF',
                    },
                }}
            >
                <body className={`${inter.className} bg-light-2`}>
                    {children}
                    <Toaster />
                </body>
            </ClerkProvider>
        </html>
    );
}
