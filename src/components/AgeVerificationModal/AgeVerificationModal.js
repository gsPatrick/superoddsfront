'use client';

import React, { useState, useEffect } from 'react';
import styles from './AgeVerificationModal.module.css';

const LOCAL_STORAGE_KEY = 'superOddsAgeConfirmed';

const AgeVerificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ageConfirmed = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!ageConfirmed) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirmAge = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  // Função para quando o usuário clica em "NÃO"
  const handleDenyAge = () => {
    // Redireciona o usuário para um site externo, como o Google.
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Adicione o seu logo aqui. Lembre-se de colocar o logo na pasta /public */}
        <img src="/logo.svg" alt="Super Odds Logo" className={styles.logo} />
        
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