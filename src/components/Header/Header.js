'use client';

import React,  { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { FaFilter, FaTimes } from 'react-icons/fa';

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
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [bookmakers, setBookmakers] = useState([]);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('https://superodds-backend.zjbwih.easypanel.host/api/super-odds/providers');
        const data = await response.json();
        if (data.data) {
          setBookmakers(data.data);
        }
      } catch (error) {
        console.error("Falha ao buscar provedores:", error);
      }
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = isFilterMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isFilterMenuOpen]);

  const toggleTheme = () => setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  const toggleFilterMenu = () => setIsFilterMenuOpen(!isFilterMenuOpen);

  const handleClearFilters = () => {
    setSelectedBookmaker('');
    setOddRange(20);
    setSortBy('');
    // MUDANÇA: Alterado para 'false' para que odds expiradas apareçam ao limpar filtros
    setHideExpired(false); 
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerContent}>
          <div className={styles.branding}>
            <h1 className={styles.title}>Super Odds</h1>
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

      <div className={`${styles.filterMenuOverlay} ${isFilterMenuOpen ? styles.open : ''}`} onClick={toggleFilterMenu}></div>
      
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
              {bookmakers.map(bm => (
                <option key={bm.id} value={bm.name}>{bm.name}</option>
              ))}
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
              <option value="">Padrão (Expira em breve)</option>
              <option value="maiorOdd">Maior Odd</option>
              <option value="proximoEvento">Próximo Evento</option>
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