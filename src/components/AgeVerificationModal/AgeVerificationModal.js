'use client';

import React, { useState, useEffect } from 'react';
import styles from './AgeVerificationModal.module.css';

// Removendo ou comentando a chave do localStorage para fins de teste
// const LOCAL_STORAGE_KEY = 'superOddsAgeConfirmed';

const AgeVerificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Para teste: Sempre abre o modal
    setIsOpen(true);

    // O código original abaixo foi comentado para garantir que o modal apareça sempre para teste:
    // const ageConfirmed = localStorage.getItem(LOCAL_STORAGE_KEY);
    // if (!ageConfirmed) {
    //   setIsOpen(true);
    // }
  }, []); // O array de dependências vazio garante que ele roda apenas uma vez após a montagem inicial

  const handleConfirmAge = () => {
    // Para teste: Não salva no localStorage para que apareça de novo na próxima visita
    // localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    setIsOpen(false); // Fecha o modal
  };

  if (!isOpen) {
    return null; // Não renderiza nada se o modal não estiver aberto
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Bem-vindo(a) ao Super Odds!</h2>
        <p className={styles.message}>
          Antes de prosseguir e explorar as melhores odds do mercado, temos uma rápida, mas importante, formalidade.
          Nosso conteúdo e as informações sobre apostas esportivas são exclusivos para **maiores de 18 anos**.
        </p>
        <p className={styles.message}>
          É só um "sim" rápido para garantir que estamos todos na mesma página e que você pode aproveitar tudo que preparamos com responsabilidade e dentro da legalidade.
        </p>
        <p className={styles.disclaimer}>
          Ao clicar em "Confirmar", você declara ter 18 anos ou mais e concorda com nossos termos de uso.
        </p>
        <button className={styles.confirmButton} onClick={handleConfirmAge}>
          Confirmar, sou maior de 18!
        </button>
      </div>
    </div>
  );
};

export default AgeVerificationModal;