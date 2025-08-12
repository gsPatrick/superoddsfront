// src/app/components/VagaGarantida/VagaGarantida.js (VERSÃO ATUALIZADA PARA "ACESSAR")
'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import styles from './VagaGarantida.module.css';
import { gsap } from 'gsap';

const VagaGarantida = () => {
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success'
  const sectionRef = useRef(null);
  const lockRef = useRef(null); // Usado para a animação visual do "acesso"
  const successRef = useRef(null);
  const loadingTextRef = useRef(null);

  const handleUnlock = () => {
    setStatus('loading');
  };

  useLayoutEffect(() => {
    if (status === 'loading') {
      const loadingTexts = ["INICIANDO CONEXÃO...", "PREPARANDO SEU ACESSO...", "CARREGANDO SUPER ODDS..."];
      let textIndex = 0;

      const tl = gsap.timeline();
      tl.to(lockRef.current, { opacity: 1, duration: 0.5 })
        .to(`.${styles.ring1}`, { rotation: "+=360", duration: 2.5, ease: "none" }, 0)
        .to(`.${styles.ring2}`, { rotation: "-=360", duration: 2.5, ease: "none" }, 0)
        .to(`.${styles.progressBarInner}`, { width: "100%", duration: 2.5, ease: "power2.inOut" }, 0)
        .call(() => {
            const interval = setInterval(() => {
                textIndex = (textIndex + 1) % loadingTexts.length;
                if (loadingTextRef.current) {
                    gsap.to(loadingTextRef.current, {opacity: 0, duration: 0.2, onComplete: () => {
                        loadingTextRef.current.textContent = loadingTexts[textIndex];
                        gsap.to(loadingTextRef.current, {opacity: 1, duration: 0.2});
                    }});
                }
            }, 800);
            tl.vars.interval = interval;
        }, [], 0)
        .to(lockRef.current, { 
            scale: 1.2, 
            boxShadow: "0 0 100px rgba(183, 238, 35, 1)", 
            duration: 0.2, 
            delay: 2.3 
        })
        .to(lockRef.current, { 
            opacity: 0, 
            duration: 0.3,
            onComplete: () => {
                clearInterval(tl.vars.interval);
                setStatus('success');
            }
        });
    }

    if(status === 'success' && successRef.current) {
        gsap.from(successRef.current.children, {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

  }, [status]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`${styles.container} container`}>
        {status !== 'success' && (
            <div className={styles.initialState} style={{ display: status === 'idle' ? 'flex' : 'none' }}>
                <h2 className={styles.title}>Comece agora mesmo:</h2>
                <p className={styles.subtitle}>Super Odds atualizadas em tempo real. Tudo o que você precisa para apostar com inteligência, está aqui.</p>
                <button onClick={handleUnlock} className={styles.unlockButton}>
                👉 QUERO VER AS SUPER ODDS
                </button>
            </div>
        )}
        
        {status === 'loading' && (
          <div className={styles.loadingState}>
            <div className={styles.lockContainer} ref={lockRef}> {/* Mantém o nome 'lockContainer' mas a metáfora é de "acesso" */}
              <div className={`${styles.ring} ${styles.ring1}`}></div>
              <div className={`${styles.ring} ${styles.ring2}`}></div>
              <div className={styles.centerDot}></div>
            </div>
            <div className={styles.progressBar}>
                <div className={styles.progressBarInner}></div>
            </div>
            <p className={styles.loadingText} ref={loadingTextRef}>INICIANDO CONEXÃO...</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className={styles.successState} ref={successRef}>
             <div className={styles.successIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
             </div>
             <h2 className={styles.title}>PRONTO PARA ACESSAR!</h2>
             <p className={styles.subtitle}>Você está a um clique das melhores cotações do mercado. Não perca mais tempo e comece a apostar com inteligência.</p>
             <a
                href="https://t.me/superoddsai" // Link atualizado
                target="_blank"
                rel="noopener noreferrer"
                className={styles.finalCtaButton}
              >
                👉 ENTRAR NO GRUPO
              </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default VagaGarantida;