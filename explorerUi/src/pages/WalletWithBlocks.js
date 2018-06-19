import React from 'react';
import Wallet from 'containers/Wallet';
import LatestBlocks from 'containers/LatestBlocks';
import WalletTransactions from 'containers/WalletTransactions';
import BlockDetailsDialog from 'containers/BlockDetailsDialog';
import styles from './layout.module.css';

export default (props) =>
  <div className={styles.content}>
    <div className={styles.sideBar}>
      <LatestBlocks {...props}/>
    </div>
    <div className={styles.main}>
      <Wallet {...props}/>
      <WalletTransactions />
    </div>
    <BlockDetailsDialog />
  </div>
