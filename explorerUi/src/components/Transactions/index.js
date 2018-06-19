import React from 'react';
import { formatTimestamp } from 'lib/utils';
import FlipMove from 'react-flip-move';
import styles from './index.module.css';
import get from 'lodash.get';

export default ({
  transactions,
  toggleTransactionsDialog
}) =>
  <div className={styles.wrapper}>
    { transactions.length > 0 &&
      <table className='pt-html-table'>
        <thead>
          <tr>
            <th>Block</th>
            <th>Timestamp</th>
            <th>Transaction Type</th>
            <th>Input</th>
            <th>Balance</th>
          </tr>
        </thead>
        <FlipMove duration={500} easing='ease-out' enterAnimation='accordionVertical' typeName='tbody'>
          {transactions.map(t =>
            <tr
              className={styles.row}
              key={t.blockNumber}
              onClick={() => toggleTransactionsDialog({transactions: [t]})}
            >
              <td>{ t.blockNumber }</td>
              <td>{ formatTimestamp(t.timestamp) }</td>
              <td>{ t.to ? t.decoded.name : 'Wallet Creation' }</td>
              <td>{ t.to ? t.decoded.params[0].value : t.initialValues.fiatAmount }</td>
              <td>{ get(t, 'amounts.fiatAmount', 0) }</td>
            </tr>
          )}
        </FlipMove>
      </table>
    }
  </div>
