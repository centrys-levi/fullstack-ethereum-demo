import React from 'react';
import { Card } from '@blueprintjs/core';
import styles from './index.module.css';

export default ({
  numberOfBlocksPerDay,
  averageTransactionsPerBlock,
}) =>
  <div className={styles.mainWrapper}>
    <h5>BLOCK STATS</h5>
    <div className={styles.statsWrapper}>
      <Card interactive className={styles.stat}>
        <h5 className={styles.value}>{numberOfBlocksPerDay}</h5>
        <label className={styles.description}>Avg Blocks per Day</label>
      </Card>
      <Card interactive className={styles.stat}>
        <h5 className={styles.value}>{averageTransactionsPerBlock}</h5>
        <label className={styles.description}>Avg Tx per Block</label>
      </Card>
    </div>
  </div>;