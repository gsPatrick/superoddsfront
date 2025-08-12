// src/app/components/Hero/Hero.js
'use client';

import { useRef, useLayoutEffect } from 'react';
import styles from './Hero.module.css';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  // Removido contentRef e headlineRef, pois os elementos de texto foram removidos.
  // Apenas heroRef é necessário para o contexto do GSAP.

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de entrada apenas para o botão CTA
      gsap.from(`.${styles.ctaButton}`, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5, // Pequeno atraso para que a imagem de fundo carregue
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.heroSection} ref={heroRef}>
      {/* O heroContent agora serve como um container para o botão, com posicionamento absoluto */}
      <div className={`${styles.heroContent} container`}>
        {/* Todos os elementos de texto (logo, headline, subheadline) foram removidos conforme solicitação */}

        <a
          href="https://superodds.ai" // Link para superodds.ai
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
        >
          👉 QUERO VER AS SUPER ODDS
        </a>
      </div>
    </section>
  );
};

export default Hero;