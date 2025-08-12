// src/app/components/ExitIntentModal/ExitIntentModal.js
'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ExitIntentModal.module.css';
import { gsap } from 'gsap';

const ExitIntentModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef(null);
    const hasBeenShown = useRef(false);

    useEffect(() => {
        const handleMouseOut = (e) => {
            // Condição para ativar: mouse vai para o topo da janela
            if (e.clientY <= 0 && !hasBeenShown.current) {
                setIsVisible(true);
                hasBeenShown.current = true;
            }
        };

        document.addEventListener('mouseout', handleMouseOut);
        return () => document.removeEventListener('mouseout', handleMouseOut);
    }, []);

    useEffect(() => {
        if (isVisible) {
            gsap.to(`.${styles.overlay}`, { opacity: 1, duration: 0.3 });
            gsap.fromTo(modalRef.current, 
                { opacity: 0, scale: 0.9, y: -50 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.2 }
            );
        }
    }, [isVisible]);

    const handleClose = () => {
        gsap.to(modalRef.current, { 
            opacity: 0, scale: 0.9, y: -50, duration: 0.3, ease: 'power3.in',
            onComplete: () => {
                gsap.to(`.${styles.overlay}`, { opacity: 0, duration: 0.3, onComplete: () => setIsVisible(false) });
            }
        });
    };

    if (!isVisible) return null;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div ref={modalRef} className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button onClick={handleClose} className={styles.closeButton}>×</button>
                <div className={styles.icon}>✋</div>
                <h2 className={styles.title}>ACESSO RÁPIDO ÀS SUPER ODDS!</h2>
                <p className={styles.subtitle}>Não fique de fora das melhores oportunidades do mercado. Acesse a SuperOdds.ai agora mesmo!</p>
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
    );
};

export default ExitIntentModal;