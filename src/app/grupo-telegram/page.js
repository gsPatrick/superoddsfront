// src/app/grupo-telegram/page.js
// Este é o conteúdo principal da sua página do grupo do Telegram.
// Os imports de componentes devem apontar para a pasta local 'components-telegram'

import Hero from './components-telegram/Hero/Hero';
import Beneficios from './components-telegram/Beneficios/Beneficios';
import VagaGarantida from './components-telegram/VagaGarantida/VagaGarantida';
import OQueTem from './components-telegram/OQueTem/OQueTem';
import Depoimentos from './components-telegram/Depoimentos/Depoimentos';
import ChamadaFinal from './components-telegram/ChamadaFinal/ChamadaFinal';

export default function GrupoTelegramPage() {
  return (
    <>
      <Hero />
      <Beneficios />
      <VagaGarantida />
      <OQueTem />
      <Depoimentos />
      <ChamadaFinal />
    </>
  );
}