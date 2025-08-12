// src/app/components/ScarcityBar/ScarcityBar.js
import styles from './ScarcityBar.module.css';

const ScarcityBar = () => {
  return (
    <div className={styles.bar}>
      <span>98% DAS VAGAS ESGOTADAS!</span>
      <span className={styles.highlight}>
        ÚLTIMAS 03 DISPONÍVEIS
      </span>
    </div>
  );
};

export default ScarcityBar;