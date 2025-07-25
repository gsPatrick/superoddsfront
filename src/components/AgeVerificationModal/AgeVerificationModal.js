'use client';

import React, { useState, useEffect } from 'react';
import styles from './AgeVerificationModal.module.css';

const LOCAL_STORAGE_KEY = 'superOddsAgeConfirmed';

const AgeVerificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Estado inicial do tema, pode ser 'dark' ou 'light' como fallback
  const [theme, setTheme] = useState('dark'); 
  // NOVO: Estado para controlar se o componente já está montado no cliente
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    // Define mounted como true assim que o componente é montado no lado do cliente
    setMounted(true);

    const ageConfirmed = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!ageConfirmed) {
      setIsOpen(true);
    }

    // Lê o tema do localStorage apenas no cliente
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
  }, []); // Este useEffect roda apenas uma vez no cliente, após a montagem inicial

  const handleConfirmAge = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  const handleDenyAge = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) {
    return null;
  }

  // A logo só será renderizada corretamente após a montagem no cliente
  const logoSrc = theme === 'dark' ? '/logobranca.png' : '/logopreta.svg';

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* A logo é renderizada condicionalmente, mas a fonte da verdade é o estado 'theme' */}
        {mounted && <img src={logoSrc} alt="Super Odds Logo" className={styles.logo} />}
        
        <h2 className={styles.question}>Você tem mais de 18 anos?</h2>
        
        <div className={styles.buttonContainer}>
          <button className={styles.secondaryButton} onClick={handleDenyAge}>
            Não
          </button>
          <button className={styles.primaryButton} onClick={handleConfirmAge}>
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;