// src/app/components/ChamadaFinal/ChamadaFinal.js (VERSÃO FINAL COM NOVA COPY)
'use client';

import { useRef, useLayoutEffect } from 'react';
import styles from './ChamadaFinal.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ChamadaFinal = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  // Removido numberRef, pois o contador de vagas será removido
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(contentRef.current.children, {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      }).from(
        titleRef.current,
        {
          backgroundPosition: '200% 0',
          duration: 1.5,
          ease: 'power2.inOut',
        },
        '-=0.7'
      );

      // A animação de contagem regressiva e o clearInterval foram removidos,
      // pois o contador de vagas não faz parte da nova copy.
      
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* O contador de vagas em background foi removido */}
      {/* <div className={styles.bgCounterContainer}>
        <div className={styles.bgNumber} ref={numberRef}>
          99
        </div>
        <div className={styles.bgText}>Vagas Restantes</div>
      </div> */}
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle}></div>
        ))}
      </div>

      <div className={`${styles.container} container`} ref={contentRef}>
        {/* A tag de alerta "ÚLTIMA CHAMADA" foi removida */}
        {/* <div className={styles.alertTag}>
          <span className={styles.alertIcon}>⏳</span>ÚLTIMA CHAMADA
        </div> */}
        <h2 className={styles.title} ref={titleRef}>
          Chega de perder tempo em mil sites comparando odds!
        </h2>
        <p className={styles.subtitle}>
          Na SuperOdds.ai, você acessa em segundos as melhores cotações do mercado — em tempo real — com a segurança e praticidade que você merece.
        </p>
        <a
          href="https://t.me/superoddsai" // Link atualizado para o site
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
        >
          <span>👉 ENTRAR NO GRUPO</span>
        </a>
      </div>
    </section>
  );
};

export default ChamadaFinal;