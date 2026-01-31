import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'All Converter - Convert Anything, Anywhere',
  description: 'Free online file converter for images, audio, video, and YouTube downloads',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-0 lg:ml-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
