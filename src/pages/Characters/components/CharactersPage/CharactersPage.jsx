import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../../components/Button';
import { LeftImageCard } from '../../../../components/LeftImageCard';
import styles from './CharactersPage.module.css';

const CharactersPage = ({ people, pageInfo, handleMore }) => {
  return (
    <main className={styles.contentWrapper}>
      <div className={styles.cards}>
        {people.map(({ node }) => (
          <LeftImageCard
            key={node.id}
            width="20rem"
            text={node.name}
            image={node.image}
            href={'/characters/' + node.id}
          />
        ))}
      </div>
      <div style={{ textAlign: 'center' }}>
        {pageInfo.hasNextPage && (
          <Button onClick={handleMore}>Load more</Button>
        )}
      </div>
    </main>
  );
};

CharactersPage.propTypes = {
  people: PropTypes.array,
  handleMore: PropTypes.func,
  pageInfo: PropTypes.object,
};

export default CharactersPage;
