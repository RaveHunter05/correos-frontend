import '@/styles/globals.css';
import StoreProvider from './StoreProvider';

import { ViewTransitions } from 'next-view-transitions';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ViewTransitions>
            <html lang="en">
                <StoreProvider>
                    <body> {children}</body>
                </StoreProvider>
            </html>
        </ViewTransitions>
    );
}
