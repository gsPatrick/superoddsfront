import './globals.css'; // Importa os estilos globais
import { Inter } from 'next/font/google'; // Importa a fonte Inter para otimização do Next.js
import AgeVerificationModal from '../components/AgeVerificationModal/AgeVerificationModal'; // Importar o novo modal

// Carregue a fonte Inter para ser otimizada pelo Next.js
// Isso é opcional, mas recomendado para melhor performance e CLS
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Odds Checker - As Melhores Odds',
  description: 'Compare as melhores odds de apostas esportivas diariamente.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      {/* Adicione a classe para a fonte aqui se usar a otimização do Next.js */}
      {/* Ou remova a variável se estiver usando apenas o @import no CSS */}
      <body className={inter.variable}>
        {children}
        <AgeVerificationModal /> {/* Inclua o modal aqui */}
      </body>
    </html>
  );
}