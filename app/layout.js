
import './globals.css';
import { Inter } from 'next/font/google';
import TitleBar from './components/title-bar/TitleBar';
import SideBar from './components/side-bar/SideBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next Calendar',
  description: 'Calendar application.',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <TitleBar />
        <div className={'content-container'}>
          <SideBar/>
          <div className={'content'}>{children}</div>
        </div>
      </body>
    </html>
  );
}
