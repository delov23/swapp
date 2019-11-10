import React, { useContext } from 'react';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';

import ThemeContext, { LIGHT_THEME } from '../../../../context/ThemeContext';
import styles from './StarshipPage.module.css';
import { themify } from '../../../../utils/themify';
import { Card } from '../../../../components/Card';
import { SpecText } from '../../../../components/SpecText';

const StarshipPage = ({ starship: { name, model, image, ...stats } }) => {
  const theme = useContext(ThemeContext);

  const captions = {
    maxAtmosphericSpeed: 'Max Atm. Speed',
    cost: 'Cost',
    maxMLPerHour: 'Max ML/h',
    crew: 'Crew',
    hyperdriveRating: 'HyperD Rat.',
  };

  const data = [
    {
      data: {
        maxAtmosphericSpeed: 0.733,
        cost: 0.33,
        maxMLPerHour: 0.11,
        crew: 0.33,
        hyperdriveRating: 0.677,
      },
      meta: { color: theme === LIGHT_THEME ? '#ffe300' : '#4bd5ee' },
    },
  ];

  return (
    <main>
      <h1 className={styles[themify('heading', theme)]}>{name}</h1>
      <h2 className={styles[themify('subheading', theme)]}>({model})</h2>
      <hr />
      <section className={styles.content}>
        <div className={styles.leftBlock}>
          <Card image={image} title={name}>
            <SpecText left="Class" right={stats.starshipClass} />
            <SpecText left="Cost" right={stats.cost || 0} />
            <SpecText left="Crew" right={stats.crew} />
            <SpecText
              left="Max Atmospheric Speed"
              right={stats.maxAtmosphericSpeed}
            />
            <SpecText left="Hyperdrive Rating" right={stats.hyperdriveRating} />
          </Card>
        </div>
        <div className={styles.rightBlock}>
          <RadarChart
            captions={captions}
            data={data}
            size={820}
            options={{
              dots: true,
              captionProps: () => ({
                className: styles[themify('caption', theme)],
                textAnchor: 'middle',
                fontSize: 16,
                fontFamily: 'sans-serif',
              }),
              dotProps: () => ({
                className: styles[themify('dots', theme)],
              }),
              axes: false,
              captionMargin: 0,
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default StarshipPage;
