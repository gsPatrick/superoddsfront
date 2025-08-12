// src/app/components/Header/Header.js (VERSÃO FINAL COM LOGO.PNG)
'use client';

import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image'; // Importa o componente Image

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Camada 1: Barra de Escassez Fixa */}
      <div className={styles.urgencyBanner}>
        <p className={styles.urgencyText}>
          SUPER ODDS ATUALIZADAS EM TEMPO REAL: <span className={styles.vacancyCount}>ACESSE AGORA!</span>
        </p>
      </div>

      {/* Camada 2: Header Principal Translúcido */}
      <div className={`${styles.mainHeader} container`}>
        {/* O logo em texto foi substituído por este Link com a Imagem */}
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/logo.png" // Caminho a partir da pasta 'public'
            alt="Super Odds Logo"
            width={80} // IMPORTANTE: Ajuste para a largura da sua logo
            height={80}  // IMPORTANTE: Ajuste para a altura da sua logo
            priority    // Ajuda a carregar a logo mais rápido
          />
        </Link>
        
        <a
          href="https://t.me/superoddsai" // Link do site SuperOdds.ai
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
        >
          ENTRAR NO GRUPO
        </a>
      </div>
    </header>
  );
};

export default Header;