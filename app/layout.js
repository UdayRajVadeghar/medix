import { Inter } from 'next/font/google';
import UserGreeting from './components/UserGreeting';
import { SessionProvider } from './context/SessionContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Medix',
  description: 'Your medical companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end">
              <UserGreeting />
            </div>
          </header>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
