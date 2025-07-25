'use client';

import React, { useState, useEffect } from 'react';
import OddsCard from './OddsCard';
import styles from './OddsTable.module.css';
import { BOOKMAKER_DATA } from '../../constants/bookmakers';

const OddsTable = ({ selectedBookmaker, oddRange, sortBy, hideExpired }) => {
  const [allOdds, setAllOdds] = useState([]);
  const [filteredOdds, setFilteredOdds] = useState([]);
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
    let tempOdds = [...allOdds];
    const now = new Date();

    // 1. Aplicar filtros (casa de apostas, faixa de odd)
    if (selectedBookmaker) {
      tempOdds = tempOdds.filter(odd => odd.bookmakerName === selectedBookmaker);
    }
    
    if (oddRange) {
        tempOdds = tempOdds.filter(odd => parseFloat(odd.bestOdd) <= oddRange);
    }
    
    // 2. Adicionar propriedade 'isExpired' para facilitar a ordenação
    tempOdds = tempOdds.map(odd => ({
        ...odd,
        isExpired: odd.expireDate <= now
    }));

    // 3. Lidar com 'hideExpired': filtrar completamente se marcado
    if (hideExpired) {
      tempOdds = tempOdds.filter(odd => !odd.isExpired);
    }
    
    // 4. Ordenação complexa: priorizar não expiradas, depois aplicar o sortBy
    tempOdds.sort((a, b) => {
      // Prioridade 1: Não expiradas vêm sempre antes
      if (a.isExpired && !b.isExpired) return 1; // 'a' expirou, 'b' não, então 'a' vem depois
      if (!a.isExpired && b.isExpired) return -1; // 'a' não expirou, 'b' sim, então 'a' vem antes

      // Prioridade 2: Se ambos têm o mesmo status de expiração, aplicar o sortBy
      if (sortBy === 'maiorOdd') {
        return parseFloat(b.bestOdd) - parseFloat(a.bestOdd); // Maior odd primeiro
      } else if (sortBy === 'proximoEvento') {
        return a.eventDate - b.eventDate; // Evento mais próximo primeiro
      } else { // Padrão: 'Expira em breve'
        return a.expireDate - b.expireDate; // Expiração mais próxima primeiro
      }
    });

    setFilteredOdds(tempOdds);
  }, [selectedBookmaker, oddRange, sortBy, hideExpired, allOdds]);

  if (loading) return <p className={styles.message}>Carregando as melhores odds...</p>;
  if (error) return <p className={styles.message}>Erro ao carregar: {error}</p>;
  if (filteredOdds.length === 0) return <p className={styles.message}>Nenhuma super odd encontrada com os filtros selecionados.</p>;

  return (
    <section className={styles.oddsTableSection}>
      <div className={styles.cardsGrid}>
        {filteredOdds.map((odd) => ( // Renderiza todas as odds filtradas/ordenadas
          <OddsCard key={odd.id} oddData={odd} />
        ))}
      </div>
      {/* Paginação removida */}
    </section>
  );
};

export default OddsTable;