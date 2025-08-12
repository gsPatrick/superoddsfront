// src/app/components/Footer/Footer.js (ATUALIZADO COM NOVA COPY)

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        
        <Link href="/">
          <Image
            src="/images/logo.png" // Caminho a partir da pasta 'public'
            alt="Super Odds Logo"
            width={200}
            height={200}
          />
        </Link>
        
        <div className={styles.disclaimers}>
          {/* Nova copy para os disclaimers */}
          <p className={styles.responsibleGaming}>
            🚫 Apostar não é investimento. Jogue com responsabilidade.
          </p>
        </div>
        <div className={styles.bottomBar}>
          <p>© {currentYear} SuperOdds.ai. Todos os direitos reservados.</p> {/* Ajustado o nome da empresa se aplicável */}
          <Link href="/politica-de-privacidade" className={styles.privacyLink}>
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;