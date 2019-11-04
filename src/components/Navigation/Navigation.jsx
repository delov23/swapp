import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import ThemeContext from '../../context/ThemeContext';
import { themify } from '../../utils/themify';
import styles from './Navigation.module.css';

const Navigation = ({ toggleTheme }) => {
  const theme = useContext(ThemeContext);

  return (
    <nav className={styles[themify('navigation', theme)]}>
      <button className={styles.siteLogo} onClick={toggleTheme}>
        SWApp
      </button>
      <ul className={styles.links}>
        <li>
          <Link to={'/episodes'} className={styles.link}>
            Episodes
          </Link>
        </li>
        <li className={styles.linkContainer}>
          <Link to={'/characters'} className={styles.link}>
            Characters
          </Link>
        </li>
        <li className={styles.linkContainer}>
          <Link to={'/logout'} className={styles[themify('logout', theme)]}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
