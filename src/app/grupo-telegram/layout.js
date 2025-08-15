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
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '786238073866404');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=786238073866404&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
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
