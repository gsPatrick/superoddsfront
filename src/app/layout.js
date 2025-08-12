import './globals.css';
import { Inter } from 'next/font/google';
import AgeVerificationModal from '../components/AgeVerificationModal/AgeVerificationModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Super Odds - As Melhores Odds',
  description: 'Compare as melhores odds de apostas esportivas diariamente.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        {children}
        <AgeVerificationModal />
      </body>
    </html>
  );
}
