import './index.css';
import { Inter } from 'next/font/google';

import Header from './components-telegram/Header/Header';
import Footer from './components-telegram/Footer/Footer';
import SocialProofPopup from './components-telegram/SocialProofPopup/SocialProofPopup';
import ExitIntentModal from './components-telegram/ExitIntentModal/ExitIntentModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Grupo VIP Telegram - SuperOdds.ai',
  description: 'Acesse o grupo VIP do Telegram da SuperOdds.ai para dicas exclusivas e super odds!',
};

export default function GrupoTelegramLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
        <SocialProofPopup />
        <ExitIntentModal />
      </body>
    </html>
  );
}
