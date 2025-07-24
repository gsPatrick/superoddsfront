'use client';

import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

// Importar ícones do react-icons
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { FaFilter, FaTimes } from 'react-icons/fa'; // Ícones para o novo menu

const Header = ({
  selectedBookmaker,
  setSelectedBookmaker,
  oddRange,
  setOddRange,
  sortBy,
  setSortBy,
  hideExpired,
  setHideExpired,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); // Estado para controlar o menu de filtros
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  // Efeito para aplicar o tema e salvar no localStorage
  useEffect(() => {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Efeito para detectar o scroll da página
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Efeito para travar o scroll do body quando o menu de filtros estiver aberto
  useEffect(() => {
    if (isFilterMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFilterMenuOpen]);


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const handleClearFilters = () => {
    setSelectedBookmaker('');
    setOddRange(20); // Valor máximo padrão
    setSortBy('');
    setHideExpired(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerContent}>
          <div className={styles.branding}>
            <h1 className={styles.title}>Super Odds</h1>
            {/* Opcional: Adicionar um logo aqui */}
          </div>
          
          <div className={styles.headerActions}>
            <button onClick={toggleFilterMenu} className={styles.filterToggleButton} aria-label="Abrir filtros">
              <FaFilter className={styles.actionIcon} />
              <span>Filtrar</span>
            </button>
            <button onClick={toggleTheme} className={styles.themeToggle} aria-label={`Mudar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}>
              {theme === 'dark' ? <BsSunFill className={styles.actionIcon} /> : <BsMoonFill className={styles.actionIcon} />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay do Menu de Filtros */}
      <div 
        className={`${styles.filterMenuOverlay} ${isFilterMenuOpen ? styles.open : ''}`}
        onClick={toggleFilterMenu}
      ></div>

      {/* Container do Menu de Filtros (Off-canvas) */}
      <div className={`${styles.filtersContainer} ${isFilterMenuOpen ? styles.open : ''}`}>
        <div className={styles.filterMenuHeader}>
          <h2>Filtros</h2>
          <button onClick={toggleFilterMenu} className={styles.closeMenuButton} aria-label="Fechar filtros">
            <FaTimes />
          </button>
        </div>
        
        <div className={styles.filterOptions}>
          <div className={styles.filterGroup}>
            <label htmlFor="casaAposta" className={styles.filterLabel}>Casa de apostas</label>
            <select id="casaAposta" className={styles.filterSelect} value={selectedBookmaker} onChange={(e) => setSelectedBookmaker(e.target.value)}>
              <option value="">Todas</option>
              <option value="Bet365">Bet365</option>
              <option value="Superbet">Superbet</option>
              <option value="McGames">McGames</option>
              <option value="Betano">Betano</option>
              <option value="Betfair">Betfair</option>
              <option value="KTO">KTO</option>
              <option value="Novibet">Novibet</option>
              <option value="BetMGM">BetMGM</option>
              <option value="Betsson">Betsson</option>
              <option value="EsportivaBet">EsportivaBet</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="faixaOdd" className={styles.filterLabel}>Odd máxima</label>
            <div className={styles.rangeSliderWrapper}>
              <input type="range" id="faixaOdd" min="1" max="20" step="0.1" value={oddRange} onChange={(e) => setOddRange(parseFloat(e.target.value))} className={styles.rangeSlider}/>
              <span className={styles.rangeValue}>{oddRange.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="ordenarPor" className={styles.filterLabel}>Ordenar por</label>
            <select id="ordenarPor" className={styles.filterSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Padrão</option>
              <option value="maiorOdd">Maior Odd</option>
              <option value="proximoEvento">Próximo Evento</option>
              <option value="casaPopular">Casa Popular</option>
            </select>
          </div>

          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="ocultarExpiradas" className={styles.checkboxInput} checked={hideExpired} onChange={(e) => setHideExpired(e.target.checked)}/>
            <label htmlFor="ocultarExpiradas" className={styles.checkboxLabel}>Ocultar odds expiradas</label>
          </div>
        </div>
        
        <div className={styles.filterMenuActions}>
            <button className={styles.clearButton} onClick={handleClearFilters}>Limpar Filtros</button>
            <button className={styles.applyButton} onClick={toggleFilterMenu}>Aplicar</button>
        </div>
      </div>
    </>
  );
};

export default Header;