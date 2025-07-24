'use client'; // Adicionar 'use client' aqui, já que agora gerenciará estados

import React, { useState } from 'react'; // Importar useState
import Header from '../components/Header/Header';
import OddsTable from '../components/OddsTable/OddsTable';

export default function HomePage() {
  // Estados para os filtros
  const [selectedBookmaker, setSelectedBookmaker] = useState('');
  const [oddRange, setOddRange] = useState(10); // Valor inicial do slider
  const [sortBy, setSortBy] = useState('');
  const [hideExpired, setHideExpired] = useState(false);

  return (
    <>
      <Header
        // Passando os estados e suas funções de atualização para o Header
        theme={null} // Não precisamos mais passar o tema para o Header se ele já tem seu próprio controle interno
        toggleTheme={null} // Idem para a função de toggleTheme
        selectedBookmaker={selectedBookmaker}
        setSelectedBookmaker={setSelectedBookmaker}
        oddRange={oddRange}
        setOddRange={setOddRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        hideExpired={hideExpired}
        setHideExpired={setHideExpired}
      />
      <main style={{ paddingTop: '0px' }}>
        <OddsTable
          // Passando os estados dos filtros para o OddsTable
          selectedBookmaker={selectedBookmaker}
          oddRange={oddRange}
          sortBy={sortBy}
          hideExpired={hideExpired}
        />
      </main>
    </>
  );
}