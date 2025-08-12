// src/app/components/OQueTem/OQueTem.js (ATUALIZADO COM NOVA COPY E CTA)
'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import styles from './OQueTem.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OQueTem = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out',
      });
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        x: 100,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: '🟢', title: 'Super Odds turbinadas todos os dias', text: '' }, // Texto vazio para ajuste de estilo ou remover p
    { icon: '🔄', title: 'Atualizações automáticas e ao vivo', text: '' },
    { icon: '🧠', title: 'Dados que te ajudam a tomar decisões mais inteligentes', text: '' },
    { icon: '💥', title: 'Tudo em um só lugar, sem enrolação', text: '' },
  ];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`${styles.gridWrapper} container`}>
        <div className={styles.imageContainer} ref={imageRef}>
          <Image
            src="/images/Smartphone.png" // Imagem original, se precisar ser outra, me avise.
            alt="Print da plataforma SuperOdds.ai no celular"
            width={700}
            height={1450}
            className={styles.image}
          />
        </div>
        <div className={styles.contentContainer} ref={contentRef}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>🔎 O que você encontra</span> no site?
          </h2>
          {/* A descrição foi removida, pois os itens da lista a substituem */}
          <ul className={styles.featureList}>
            {features.map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                <span className={styles.icon}>{feature.icon}</span>
                <div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  {/* Removido o <p> se o texto estiver vazio, ou adaptá-lo se necessário */}
                  {feature.text && <p className={styles.featureText}>{feature.text}</p>}
                </div>
              </li>
            ))}
          </ul>
           <a
              href="https://t.me/superoddsai" // Link atualizado
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              ENTRAR NO GRUPO
            </a>
        </div>
      </div>
    </section>
  );
};

export default OQueTem;