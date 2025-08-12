// src/app/components/Beneficios/Beneficios.js (COMPLETO COM A CORREÇÃO FINAL)
'use client';

import { useRef, useLayoutEffect } from 'react';
import styles from './Beneficios.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Beneficios = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animação para o título (pode continuar como .from())
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
      });

      // ✨✨✨ LÓGICA DE ANIMAÇÃO REVISADA: DE .from() PARA .to() ✨✨✨
      // Os cards começam invisíveis via CSS e animamos PARA o estado visível.
      gsap.to(gridRef.current.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1, // Torna-se visível
        y: 0,      // Volta para a posição original (Y)
        scale: 1,  // Volta para a escala original
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mantive os ícones e a estrutura dos benefícios, ajustando o texto para se encaixar melhor com a nova direção do site.
  const beneficios = [
    { icon: '📊', title: 'Odds Atualizadas', description: 'Cotações em tempo real para você sempre ter a informação mais recente.' },
    { icon: '💡', title: 'Inteligência de Mercado', description: 'Informações que te ajudam a tomar decisões estratégicas e aumentar suas chances.' },
    { icon: '🔒', title: 'Segurança e Praticidade', description: 'Acesse as melhores cotações de forma rápida e segura, sem complicação.' },
    { icon: '🚀', title: 'Chega de Perder Tempo', description: 'Pare de comparar odds em vários sites. Encontre tudo o que precisa em um só lugar.' },
    { icon: '📈', title: 'Oportunidades Turbinadas', description: 'Super Odds selecionadas para potencializar seus resultados.' },
    { icon: '🎯', title: 'Foco na Informação', description: 'Dados e análises para apostar com inteligência e não apenas sorte.' },
  ];

  return (
    <section className={styles.beneficiosSection} ref={sectionRef}>
      <div className={`${styles.beneficiosContainer} container`}>
        <h2 className={styles.beneficiosTitle} ref={titleRef}>
          Aqui você <span className={styles.beneficiosHighlight}>aumenta suas chances</span> com informação de verdade
        </h2>
        <div className={styles.beneficiosGrid} ref={gridRef}>
          {beneficios.map((beneficio, index) => (
            <div key={index} className={styles.beneficiosCard}>
              <div className={styles.cardIcon}>{beneficio.icon}</div>
              <h3 className={styles.cardTitle}>{beneficio.title}</h3>
              <p className={styles.cardDescription}>{beneficio.description}</p>
            </div>
          ))}
        </div>
        <a
          href="https://t.me/superoddsai" // Link atualizado
          target="_blank"
          rel="noopener noreferrer"
          className={styles.beneficiosCtaButton}
        >
          👉 ENTRAR NO GRUPO
        </a>
      </div>
    </section>
  );
};

export default Beneficios;