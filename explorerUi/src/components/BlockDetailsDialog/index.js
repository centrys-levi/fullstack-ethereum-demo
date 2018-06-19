import React from 'react';
import { Dialog } from '@blueprintjs/core';
import styles from './index.module.css';
import get from 'lodash.get';

export default ({
  isTransactionsDialogOpen,
  selectedBlock,
  toggleTransactionsDialog
}) =>
  <Dialog
    icon='inbox'
    isOpen={isTransactionsDialogOpen}
    onClose={toggleTransactionsDialog}
    title='Block Transactions'
    usePortal={false}
  >
    <div className='pt-dialog-body'>
      {get(selectedBlock, 'transactions', []).map(t =>
        <div key={t.transactionIndex}>
          <h5>Transaction index: {t.transactionIndex}</h5>
          <b>Transaction type: </b>
          {t.to ? 'Blockchain Method Call' : 'Smart Contract Creation'}
          <br />
          {t.to && t.decoded ?
            <div>
              <b>Method Name: </b> {t.decoded.name} <br />
              <b>Method Input: </b> {t.decoded.params[0].value} <br />
            </div> :
            <div className={styles.input}>
              <b>Encoded Input: </b> {t.input} <br />
            </div>
          }
        </div>
      )}
    </div>
  </Dialog>