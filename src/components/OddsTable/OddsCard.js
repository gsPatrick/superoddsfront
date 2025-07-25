'use client';

import React, { useState, useEffect } from 'react';
import styles from './OddsCard.module.css';
import { FaRegClock, FaShareAlt } from 'react-icons/fa';

const OddsCard = ({ oddData }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false); // NOVO ESTADO para feedback de cópia

  // PONTO CRÍTICO: Desestruturando todas as propriedades necessárias do oddData
  const {
    event,
    time: expireTimestamp,
    // shareLink, // Removido, não será mais necessário para navegação
    matchInfo,
    details,
    oldOdd,
    bestOdd,
    quality,
    qualityRating,
    bookmakerLogo,
    bookmakerName,
    bookmakerLink, // Esta variável precisa ser recebida aqui e será usada para copiar
  } = oddData;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const expirationDate = new Date(expireTimestamp);
      const difference = expirationDate - now;

      if (difference > 0) {
        setIsExpired(false);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
      
      setIsExpired(true);
      return 'Expirado';
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [expireTimestamp]);


  const getTeamNames = (eventName) => {
    if (!eventName) return ['Evento', ''];
    const separatorRegex = /\s+(?:vs\.?|-)\s+/i;
    const teams = eventName.trim().split(separatorRegex);

    if (teams.length >= 2) return [teams[0].trim(), teams[1].trim()];
    if (eventName.includes('•')) {
        const mainEvent = eventName.split('•')[0];
        const multiTeams = mainEvent.trim().split(separatorRegex);
        if(multiTeams.length >= 2) return [multiTeams[0].trim(), multiTeams[1].trim()];
    }
    return [eventName.trim(), ''];
  };

  const [team1, team2] = getTeamNames(event);

  // NOVO: Função para copiar o link
  const handleShareClick = async () => {
    if (bookmakerLink) {
      try {
        await navigator.clipboard.writeText(bookmakerLink);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Esconde a mensagem após 2 segundos
      } catch (err) {
        console.error('Falha ao copiar o link: ', err);
        // Opcional: Adicionar um feedback de erro para o usuário
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.eventInfo}>
          <h2 className={styles.eventTeam}>{team1}</h2>
          {team2 && <span className={styles.vsText}>vs.</span>}
          {team2 && <h2 className={styles.eventTeam}>{team2}</h2>}
        </div>
        <div className={styles.headerActions}>
          <span className={`${styles.time} ${isExpired ? styles.expired : ''}`}>
            {!isExpired && <FaRegClock className={styles.icon} />} {timeLeft}
          </span>
          {/* MUDANÇA AQUI: de <a> para <button> e onClick */}
          <button onClick={handleShareClick} className={styles.shareButton} aria-label="Copiar link">
            <FaShareAlt className={styles.icon} />
            {copySuccess && <span className={styles.copyFeedback}>Copiado!</span>} {/* Feedback de cópia */}
          </button>
        </div>
      </div>

      <p className={styles.matchInfo}>{matchInfo}</p>

      <ul className={styles.detailsList}>
        {details.slice(0, 3).map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>

      <div className={styles.oddsContainer}>
        {oldOdd && <span className={styles.oldOddValue}>{parseFloat(oldOdd).toFixed(2)}</span>}
        {bestOdd && (
          // PONTO CRÍTICO: O href usa a variável bookmakerLink
          <a href={bookmakerLink} target="_blank" rel="noopener noreferrer" className={styles.bestOddValue}>
            {parseFloat(bestOdd).toFixed(2)}
            <span className={styles.bestOddSpark}>⚡</span>
          </a>
        )}
      </div>

      <div className={styles.qualityContainer}>
        <span className={styles.qualityText}>{quality}</span>
        <div className={styles.qualityBar}>
          <div className={styles.qualityFill} style={{ width: `${qualityRating}%` }}></div>
        </div>
      </div>

      <div className={styles.footer}>
        {/* PONTO CRÍTICO: O href usa a variável bookmakerLink */}
        <a href={bookmakerLink} target="_blank" rel="noopener noreferrer" className={styles.bookmakerLink}>
          <img src={bookmakerLogo} alt={`${bookmakerName} Logo`} className={styles.bookmakerLogo} />
        </a>
        {/* PONTO CRÍTICO: O href usa a variável bookmakerLink */}
        <a href={bookmakerLink} target="_blank" rel="noopener noreferrer" className={styles.actionButton}>
          Apostar Agora
        </a>
      </div>
    </div>
  );
};

export default OddsCard;