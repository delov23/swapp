import React, { useContext } from 'react';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';

import ThemeContext, { LIGHT_THEME } from '../../../../context/ThemeContext';
import styles from './StarshipPage.module.css';
import { themify } from '../../../../utils/themify';
import { Card } from '../../../../components/Card';
import { SpecText } from '../../../../components/SpecText';

const maxOfNode = (property, data) => {
  return +data.reduce((acc, { node }) => {
    return node[property] > acc ? node[property] : acc;
  }, 0);
};

const minOfNode = (property, data) => {
  return +data.reduce((acc, { node }) => {
    return node[property] < acc ? node[property] : acc;
  }, 0);
};

const percentageValue = (value, property, data) => {
  return (
    (value - minOfNode(property, data)) /
      (maxOfNode(property, data) - minOfNode(property, data)) || 0
  );
};

const getChartOptions = theme => {
  return {
    dots: true,
    captionProps: () => ({
      className: styles[themify('caption', theme)],
      textAnchor: 'middle',
      fontSize: 20,
      fontFamily: 'sans-serif',
    }),
    captions: true,
    captionMargin: 10,
    dotProps: () => ({
      className: styles[themify('dots', theme)],
    }),
    setViewBox: () => `-50 -50 500 500`,
    scaleProps: () => ({ className: styles.scales }),
    axes: false,
    scales: 5,
  };
};

const StarshipPage = ({
  starship: { name, model, image, ...stats },
  stData,
}) => {
  const theme = useContext(ThemeContext);

  const captions = {
    maxAtmosphericSpeed: 'Max Atm. Speed',
    maxMLPerHour: 'Max ML/h',
    hyperdriveRating: 'HyperD Rat.',
    crew: 'Crew',
    cost: 'Cost',
  };

  const data = [
    {
      data: {
        maxAtmosphericSpeed: percentageValue(
          stats.maxAtmosphericSpeed,
          'maxAtmosphericSpeed',
          stData,
        ),
        cost: percentageValue(stats.cost, 'cost', stData),
        maxMLPerHour: percentageValue(
          stats.maxMLPerHour,
          'maxMLPerHour',
          stData,
        ),
        crew: percentageValue(stats.crew, 'crew', stData),
        hyperdriveRating: percentageValue(
          stats.hyperdriveRating,
          'hyperdriveRating',
          stData,
        ),
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
            <SpecText left="Cost" right={(stats.cost || 0) + ' credits'} />
            {stats.crew && <SpecText left="Crew" right={stats.crew} />}
            {stats.maxAtmosphericSpeed && (
              <SpecText
                left="Max Atmospheric Speed"
                right={stats.maxAtmosphericSpeed}
              />
            )}
            {stats.maxMLPerHour && (
              <SpecText left="Max ML/h" right={stats.maxMLPerHour} />
            )}
            {stats.hyperdriveRating && (
              <SpecText
                left="Hyperdrive Rating"
                right={stats.hyperdriveRating}
              />
            )}
          </Card>
        </div>
        <div className={styles.rightBlock}>
          <h2 className={styles[themify('subheading', theme)]}>
            Compared to Starship Class Max
          </h2>
          <div className={styles.chartWrapper}>
            <div className={styles.chart}>
              <RadarChart
                captions={captions}
                data={data}
                options={getChartOptions(theme)}
                size={400}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StarshipPage;
