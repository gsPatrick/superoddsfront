'use client';

import React, { useState, useEffect } from 'react'; // Importar useEffect
import OddsCard from './OddsCard';
import styles from './OddsTable.module.css';

// Dados de exemplo (substitua por dados reais depois)
// GARANTA que os bookmakerLogo estão corretos e acessíveis localmente ou via CDN
const dummyOddsData = [
  {
    id: '1',
    event: 'Fluminense vs. Palmeiras',
    time: '00:54:12', // Ajustado para formato da imagem
    shareLink: '#',
    matchInfo: 'Hoje, 19:00', // Ajustado para formato da imagem
    details: [
      'Fluminense - Mais de 2,5 Chutes ao Gol',
      'Palmeiras - Mais de 2,5 Chutes ao Gol',
      'Mais de 6 Escanteios',
    ],
    oldOdd: '1.66',
    bestOdd: '2.20',
    quality: 'Incrível',
    qualityRating: 90,
    bookmakerLogo: 'https://i.imgur.com/p6EQFSr.png', // Exemplo: idealmente use uma imagem local
    bookmakerName: 'Bet365',
    bookmakerLink: 'https://www.bet365.com',
    eventDate: new Date('2025-07-23T19:00:00') // Adicionado para ordenação
  },
  {
    id: '2',
    event: 'Corinthians SP vs. Cruzeiro MG',
    time: '00:54:12',
    shareLink: '#',
    matchInfo: 'Hoje, 19:00',
    details: [
      'Kaio Jorge para Marcar',
    ],
    oldOdd: '2.25',
    bestOdd: '2.75',
    quality: 'Ótima',
    qualityRating: 75,
    bookmakerLogo: 'https://i.imgur.com/p6EQFSr.png',
    bookmakerName: 'Novibet',
    bookmakerLink: 'https://www.novibet.com',
    eventDate: new Date('2025-07-23T19:00:00')
  },
  {
    id: '3',
    event: 'Santos vs. Internacional RS',
    time: '03:24:12',
    shareLink: '#',
    matchInfo: 'Hoje, 21:30',
    details: [
      'Jogador a marcar ou assistir Neymar Jr',
      'Mais de 0.5',
    ],
    oldOdd: '1.95',
    bestOdd: '2.30',
    quality: 'Ótima',
    qualityRating: 70,
    bookmakerLogo: 'https://i.imgur.com/p6EQFSr.png',
    bookmakerName: 'EsportivaBet',
    bookmakerLink: 'https://www.esportivabet.com',
    eventDate: new Date('2025-07-23T21:30:00')
  },
  {
    id: '4',
    event: 'Botafogo SP vs. Criciúma',
    time: '24:54:12',
    shareLink: '#',
    matchInfo: 'Amanhã, 19:00',
    details: [
      'Mais de 3.5 cartões no jogo',
      'Mais de 6.5 chutes no gol na partida',
    ],
    oldOdd: '2.60',
    bestOdd: '3.25',
    quality: 'Ótima',
    qualityRating: 80,
    bookmakerLogo: 'https://i.imgur.com/p6EQFSr.png',
    bookmakerName: 'Superbet',
    bookmakerLink: 'https://www.superbet.com',
    eventDate: new Date('2025-07-24T19:00:00')
  },
  {
    id: '5',
    event: 'Grêmio RS vs. Alianza Lima',
    time: '03:24:12',
    shareLink: '#',
    matchInfo: 'Hoje, 21:30',
    details: [
      'Grêmio RS vence',
      'Grêmio RS com o maior número de chutes no gol',
    ],
    oldOdd: '2.45',
    bestOdd: '3.00',
    quality: 'Incrível',
    qualityRating: 92,
    bookmakerLogo: 'https://i.imgur.com/p6EQFSr.png',
    bookmakerName: 'Superbet',
    bookmakerLink: 'https://www.superbet.com',
    eventDate: new Date('2025-07-23T21:30:00')
  },
  {
    id: '6',
    event: 'Vitória BA vs. Sport Recife',
    time: '03:24:12',
    shareLink: '#',
    matchInfo: 'Hoje, 21:30',
    details: [
      'Chance dupla + Ambas equipes marcam + Sport Recife total de escanteios',
      'Empate ou Sport Recife + Sim + Mais de 3.5',
    ],
    oldOdd: '4.20',
    bestOdd: '6.00',
    quality: 'Incrível',
    qualityRating: 95,
    bookmakerLogo: 'https://i.imgur.com/p6EQFSr.png',
    bookmakerName: 'Betano',
    bookmakerLink: 'https://www.betano.com',
    eventDate: new Date('2025-07-23T21:30:00')
  },
  {
    id: '7',
    event: 'RB Bragantino vs. Athletico PR',
    time: '01:13:34',
    shareLink: '#',
    matchInfo: 'Hoje, 21:00',
    details: [
      'Mais de 2.5 gols na partida',
      'Ambas equipes marcam',
    ],
    oldOdd: '1.80',
    bestOdd: '2.10',
    quality: 'Boa',
    qualityRating: 65,
    bookmakerLogo: 'https://i.imgur.com/p6EQFSr.png',
    bookmakerName: 'KTO',
    bookmakerLink: 'https://www.kto.com',
    eventDate: new Date('2025-07-23T21:00:00')
  },
  {
    id: '8',
    event: 'Bahia vs. Ceará',
    time: '02:00:00',
    shareLink: '#',
    matchInfo: 'Hoje, 20:00',
    details: [
      'Bahia vence ou empate',
      'Menos de 3.5 gols',
    ],
    oldOdd: '1.75',
    bestOdd: '2.05',
    quality: 'Ótima',
    qualityRating: 78,
    bookmakerLogo: 'https://i.imgur.com/p6EQFSr.png',
    bookmakerName: 'Betfair',
    bookmakerLink: 'https://www.betfair.com',
    eventDate: new Date('2025-07-23T20:00:00')
  },
  {
    id: '9',
    event: 'Internacional vs. Goiás',
    time: '04:00:00',
    shareLink: '#',
    matchInfo: 'Hoje, 22:00',
    details: [
      'Internacional vence e Mais de 1.5 gols',
    ],
    oldOdd: '1.90',
    bestOdd: '2.25',
    quality: 'Excelente',
    qualityRating: 82,
    bookmakerLogo: 'https://i.imgur.com/p6EQFSr.png',
    bookmakerName: 'Betano',
    bookmakerLink: 'https://www.betano.com',
    eventDate: new Date('2025-07-23T22:00:00')
  },
  // Adicione mais dados para testar a paginação
  {
    id: '10',
    event: 'São Paulo vs. Atlético-MG',
    time: '01:30:00',
    shareLink: '#',
    matchInfo: 'Amanhã, 19:30',
    details: [
      'Ambas equipes marcam e Total de Gols Acima de 2.5',
    ],
    oldOdd: '2.15',
    bestOdd: '2.50',
    quality: 'Incrível',
    qualityRating: 85,
    bookmakerLogo: 'https://i.imgur.com/p6EQFSr.png',
    bookmakerName: 'Bet365',
    bookmakerLink: 'https://www.bet365.com',
    eventDate: new Date('2025-07-24T19:30:00')
  },
  {
    id: '11',
    event: 'Fortaleza vs. Vasco da Gama',
    time: '02:45:00',
    shareLink: '#',
    matchInfo: 'Amanhã, 20:30',
    details: [
      'Vasco ou Empate',
    ],
    oldOdd: '1.70',
    bestOdd: '2.00',
    quality: 'Boa',
    qualityRating: 68,
    bookmakerLogo: 'https://kto.com/media/logo.svg',
    bookmakerName: 'KTO',
    bookmakerLink: 'https://www.kto.com',
    eventDate: new Date('2025-07-24T20:30:00')
  },
  {
    id: '12',
    event: 'Cruzeiro vs. Grêmio',
    time: '00:50:00',
    shareLink: '#',
    matchInfo: 'Hoje, 18:00',
    details: [
      'Total de Escanteios Acima de 9.5',
    ],
    oldOdd: '1.85',
    bestOdd: '2.15',
    quality: 'Ótima',
    qualityRating: 72,
    bookmakerLogo: 'https://superbet.com/assets/img/logo-superbet.svg',
    bookmakerName: 'Superbet',
    bookmakerLink: 'https://www.superbet.com',
    eventDate: new Date('2025-07-23T18:00:00')
  },
];


const ITEMS_PER_PAGE = 6;

// OddsTable agora recebe os estados dos filtros como props
const OddsTable = ({ selectedBookmaker, oddRange, sortBy, hideExpired }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOdds, setFilteredOdds] = useState([]);

  useEffect(() => {
    // Aplicar filtros e ordenação
    let updatedOdds = [...dummyOddsData];

    // 1. Filtrar por casa de apostas
    if (selectedBookmaker) {
      updatedOdds = updatedOdds.filter(odd => odd.bookmakerName === selectedBookmaker);
    }

    // 2. Filtrar por faixa de odd (bestOdd)
    updatedOdds = updatedOdds.filter(odd => parseFloat(odd.bestOdd) <= oddRange);

    // 3. Ocultar super odds expiradas (simulação: eventos que já passaram)
    if (hideExpired) {
      const now = new Date();
      updatedOdds = updatedOdds.filter(odd => odd.eventDate && odd.eventDate > now);
    }

    // 4. Ordenar
    if (sortBy === 'maiorOdd') {
      updatedOdds.sort((a, b) => parseFloat(b.bestOdd) - parseFloat(a.bestOdd));
    } else if (sortBy === 'proximoEvento') {
      // Ordena por data do evento mais próxima
      updatedOdds.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
    } else if (sortBy === 'casaPopular') {
      // Isso é uma simulação, pois "casa popular" precisaria de dados de popularidade reais.
      // Aqui, vamos ordenar por bookmakerName para ter uma ordenação visível.
      updatedOdds.sort((a, b) => a.bookmakerName.localeCompare(b.bookmakerName));
    }
    // Para 'Padrão' ou qualquer outro valor, a ordem original é mantida implicitamente

    setFilteredOdds(updatedOdds);
    setCurrentPage(1); // Resetar para a primeira página ao aplicar novos filtros/ordenação
  }, [selectedBookmaker, oddRange, sortBy, hideExpired]);


  const totalPages = Math.ceil(filteredOdds.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOdds = filteredOdds.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className={styles.oddsTableSection}>
      <div className={styles.cardsGrid}>
        {currentOdds.map((odd) => (
          <OddsCard key={odd.id} oddData={odd} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          Anterior
        </button>
        <span className={styles.pageInfo}>Página {currentPage} de {totalPages || 1}</span> {/* Garante que não mostre "de 0" */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={styles.paginationButton}
        >
          Próximo
        </button>
      </div>
    </section>
  );
};

export default OddsTable;