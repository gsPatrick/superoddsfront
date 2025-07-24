'use client';

import React, { useState, useEffect } from 'react';
import OddsCard from './OddsCard';
import styles from './OddsTable.module.css';
import { BOOKMAKER_DATA } from '../../constants/bookmakers';

const ITEMS_PER_PAGE = 9;

const OddsTable = ({ selectedBookmaker, oddRange, sortBy, hideExpired }) => {
  const [allOdds, setAllOdds] = useState([]);
  const [filteredOdds, setFilteredOdds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOdds = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://superodds-backend.zjbwih.easypanel.host/api/super-odds');
        if (!response.ok) {
          throw new Error('Falha ao buscar dados da API');
        }
        const data = await response.json();
        
        const genericKeywords = ['odds melhoradas', 'super odds turbinadas', 'sim'];

        const getQualityLabel = (original, boosted) => {
          const originalFloat = parseFloat(original);
          const boostedFloat = parseFloat(boosted);
          if (!originalFloat || !boostedFloat || boostedFloat <= originalFloat) {
            return 'Super Odd';
          }
          const increase = ((boostedFloat / originalFloat) - 1) * 100;
          if (increase >= 30) return 'Incrível';
          if (increase >= 15) return 'Ótima';
          return 'Boa';
        };

        const formattedData = data.data.map(odd => {
          const detailsList = [odd.marketName, odd.selectionName]
            .map(detail => detail?.trim())
            .filter(detail => detail && !genericKeywords.includes(detail.toLowerCase()))
            .filter((value, index, self) => self.indexOf(value) === index);

          const competition = odd.competitionName || '';
          const gameDate = new Date(odd.gameTimestamp).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
          const matchInfoString = [competition, gameDate].filter(Boolean).join(' • ');

          return {
            id: odd.id,
            event: odd.gameName,
            time: odd.expireAtTimestamp,
            shareLink: '#',
            matchInfo: matchInfoString,
            details: detailsList,
            oldOdd: odd.originalOdd,
            bestOdd: odd.boostedOdd,
            quality: getQualityLabel(odd.originalOdd, odd.boostedOdd),
            qualityRating: Math.min(95, (odd.boostedOdd / odd.originalOdd - 1) * 200 + 70),
            bookmakerLogo: BOOKMAKER_DATA[odd.providerId]?.logoUrl || '',
            bookmakerName: odd.provider,
            // PONTO CRÍTICO: Garante que o link da API seja passado para o card
            bookmakerLink: odd.link, 
            eventDate: new Date(odd.gameTimestamp),
            expireDate: new Date(odd.expireAtTimestamp),
          };
        });
        
        setAllOdds(formattedData);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOdds();
  }, []);

  useEffect(() => {
    let updatedOdds = [...allOdds];

    if (selectedBookmaker) {
      updatedOdds = updatedOdds.filter(odd => odd.bookmakerName === selectedBookmaker);
    }
    
    if (oddRange) {
        updatedOdds = updatedOdds.filter(odd => parseFloat(odd.bestOdd) <= oddRange);
    }
    
    if (hideExpired) {
      const now = new Date();
      updatedOdds = updatedOdds.filter(odd => odd.expireDate > now);
    }
    
    if (sortBy === 'maiorOdd') {
      updatedOdds.sort((a, b) => parseFloat(b.bestOdd) - parseFloat(a.bestOdd));
    } else if (sortBy === 'proximoEvento') {
      updatedOdds.sort((a, b) => a.eventDate - b.eventDate);
    }

    setFilteredOdds(updatedOdds);
    setCurrentPage(1);
  }, [selectedBookmaker, oddRange, sortBy, hideExpired, allOdds]);

  const totalPages = Math.ceil(filteredOdds.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOdds = filteredOdds.slice(startIndex, endIndex);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  
  if (loading) return <p className={styles.message}>Carregando as melhores odds...</p>;
  if (error) return <p className={styles.message}>Erro ao carregar: {error}</p>;
  if (currentOdds.length === 0) return <p className={styles.message}>Nenhuma super odd encontrada com os filtros selecionados.</p>;

  return (
    <section className={styles.oddsTableSection}>
      <div className={styles.cardsGrid}>
        {currentOdds.map((odd) => (
          <OddsCard key={odd.id} oddData={odd} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className={styles.paginationButton}>
          Anterior
        </button>
        <span className={styles.pageInfo}>Página {currentPage} de {totalPages || 1}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages || totalPages === 0} className={styles.paginationButton}>
          Próximo
        </button>
      </div>
    </section>
  );
};

export default OddsTable;