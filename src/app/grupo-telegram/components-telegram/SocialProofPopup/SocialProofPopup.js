// src/app/components/SocialProofPopup/SocialProofPopup.js (VERSÃO REFINADA E RESPONSÁVEL)
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './SocialProofPopup.module.css';

// ✨✨✨ 1. NOVA LISTA DE DADOS - SEM LUCRO, COM ACERTOS DE ODDS ✨✨✨
// Mantido os dados existentes, pois a ideia de "acertou uma Super Odd" ou "acessou" faz sentido para a plataforma.
const proofData = [
  { name: 'Maria C.', location: 'Salvador, BA', type: 'join' },
  { name: 'Ricardo L.', location: 'Recife, PE', type: 'hit', oddValue: '3.75' },
  { name: 'Juliana P.', location: 'Florianópolis, SC', type: 'join' },
  { name: 'Fernando G.', location: 'Goiânia, GO', type: 'hit', oddValue: '4.50' },
  { name: 'André B.', location: 'Brasília, DF', type: 'join' },
  { name: 'Beatriz M.', location: 'Manaus, AM', type: 'hit', oddValue: '2.90' },
  { name: 'Tiago S.', location:'Fortaleza, CE', type: 'join' },
  { name: 'Carla V.', location: 'Porto Alegre, RS', type: 'hit', oddValue: '4.20' },
];

const SocialProofPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentProof, setCurrentProof] = useState(proofData[0]);
  const popupRef = useRef(null);
  let timeoutId = useRef(null);

  const showRandomPopup = () => {
    const randomIndex = Math.floor(Math.random() * proofData.length);
    setCurrentProof(proofData[randomIndex]);
    setIsVisible(true);
  };

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        popupRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    } else {
      gsap.to(popupRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const scheduleNextPopup = () => {
      clearTimeout(timeoutId.current);
      if (isVisible) setIsVisible(false);

      const randomDelay = Math.random() * 4000 + 4000;
      
      timeoutId.current = setTimeout(() => {
        showRandomPopup();
        timeoutId.current = setTimeout(() => {
          setIsVisible(false);
          scheduleNextPopup();
        }, 5000); 
      }, randomDelay);
    };

    timeoutId.current = setTimeout(scheduleNextPopup, 5000);

    return () => clearTimeout(timeoutId.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // ✨✨✨ 2. FUNÇÃO DE RENDERIZAÇÃO ATUALIZADA ✨✨✨
  const renderMessage = () => {
    if (currentProof.type === 'join') {
      return (
        <>
          <span className={styles.name}>{currentProof.name}</span> de {currentProof.location} acabou de ver as Super Odds!
        </>
      );
    }
    // O tipo 'win' foi trocado por 'hit'
    if (currentProof.type === 'hit') {
      return (
        <>
          <span className={styles.name}>{currentProof.name}</span> de {currentProof.location} acertou uma Super Odd <span className={styles.value}>@{currentProof.oddValue}</span>!
        </>
      );
    }
  };

  return (
    <div
      ref={popupRef}
      className={styles.popupContainer}
      style={{ opacity: 0 }}
    >
      <div className={styles.icon}>
        {/* ✨✨ 3. ÍCONE DE DINHEIRO 💰 REMOVIDO ✨✨ */}
        {currentProof.type === 'join' ? '🎉' : '🎯'}
      </div>
      <div className={styles.content}>
        {renderMessage()}
      </div>
       <button onClick={() => setIsVisible(false)} className={styles.closeButton}>×</button>
    </div>
  );
};

export default SocialProofPopup;