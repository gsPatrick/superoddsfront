// components/OddsTable/OddsCard.js
'use client';

import React from 'react';
import styles from './OddsCard.module.css';

// Importar ícones do react-icons
import { FaRegClock, FaShareAlt } from 'react-icons/fa'; // Exemplo de ícones do Font Awesome

const OddsCard = ({ oddData }) => {
  const {
    event,
    time,
    shareLink,
    matchInfo,
    details,
    oldOdd,
    bestOdd,
    quality,
    qualityRating,
    bookmakerLogo,
    bookmakerName,
    bookmakerLink,
  } = oddData;

  const [team1, team2] = event.split(' vs. ');

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.eventInfo}>
          <h2 className={styles.eventTeam}>{team1}</h2>
          <span className={styles.vsText}>vs.</span>
          <h2 className={styles.eventTeam}>{team2}</h2>
        </div>
        <div className={styles.headerActions}>
          {/* Substituição dos ícones */}
          <span className={styles.time}><FaRegClock className={styles.icon} /> {time}</span>
          <a href={shareLink} target="_blank" rel="noopener noreferrer" className={styles.shareButton} aria-label="Compartilhar evento">
            <FaShareAlt className={styles.icon} />
          </a>
        </div>
      </div>

      <p className={styles.matchInfo}>{matchInfo}</p>

      <ul className={styles.detailsList}>
        {details.slice(0, 3).map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>

      <div className={styles.oddsContainer}>
        {oldOdd && <span className={styles.oldOddValue}>{oldOdd}</span>}
        {bestOdd && (
          <a
            href={bookmakerLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bestOddValue}
            aria-label={`Melhor odd de ${bestOdd} na ${bookmakerName}`}
          >
            {bestOdd}
            <span className={styles.bestOddSpark}>⚡</span>
          </a>
        )}
      </div>

      <div className={styles.qualityContainer}>
        <span className={styles.qualityText}>{quality}</span>
        <div className={styles.qualityBar}>
          <div
            className={styles.qualityFill}
            style={{ width: `${qualityRating}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.footer}>
        <a href={bookmakerLink} target="_blank" rel="noopener noreferrer" className={styles.bookmakerLink}>
          <img src={bookmakerLogo} alt={`${bookmakerName} Logo`} className={styles.bookmakerLogo} />
        </a>
        <a href={bookmakerLink} target="_blank" rel="noopener noreferrer" className={styles.actionButton}>
          Clique aqui
        </a>
      </div>
    </div>
  );
};

export default OddsCard;