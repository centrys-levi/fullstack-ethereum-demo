import React from 'react';
import { Card } from '@blueprintjs/core';
import styles from './index.module.css';
import Cube from '../Cube';
import { formatTimestamp } from 'lib/utils';
import FlipMove from 'react-flip-move';
import Stats from '../Stats';

export default class Blocks extends React.Component {

  render() {
    const {
      blocks,
      numberOfBlocksPerDay,
      averageTransactionsPerBlock,
      toggleTransactionsDialog
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <h1>Blockchain explorer</h1>
        <Stats numberOfBlocksPerDay={numberOfBlocksPerDay} averageTransactionsPerBlock={averageTransactionsPerBlock} />

        <h5 className={styles.title}>Latest blocks</h5>
        <Card interactive className={styles.card}>
          <div className={styles.blockWrapper}>
            <Cube isAnimated />
          </div>
          <h5>Status: Polling</h5>
          <p>
            Next Block: {blocks[0] ? blocks[0].number + 1 : 'x'}
          </p>
        </Card>
        <FlipMove duration={500} easing='ease-out' enterAnimation='accordionVertical'>
          {blocks.map(b =>
            <div key={b.number}>
              <Card interactive className={styles.card} onClick={() => toggleTransactionsDialog(b)}>
                <div className={styles.blockWrapper}>
                  <Cube color='#d3d4d3' />
                </div>
                <h5>Block Number: {b.number}</h5>
                <p>
                  <b>Mined On:</b> {formatTimestamp(b.timestamp)} <br />
                  <b>Transactions:</b> {b.transactions.length} <br />
                  <b>Hash:</b> {b.hash}
                </p>
              </Card>
            </div>
          )}
        </FlipMove>
      </div>
    );
  }
}
