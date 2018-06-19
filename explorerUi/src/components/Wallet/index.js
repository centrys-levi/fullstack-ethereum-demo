import React from 'react';
import { Button, ButtonGroup, ControlGroup } from '@blueprintjs/core';
import styles from './index.module.css';

export default class Blocks extends React.Component {

  state = {
    amount: 0
  };

  onInputChange = (event) => {
    this.setState({
      amount: event.target.value
    });
  }

  render() {
    const {
      createWallet,
      isLoadingCreateWallet,
      wallet,
      topUpWallet,
      withdrawFromWallet,
      isLoadingTransactionAction
    } = this.props;

    const { amount } = this.state;

    return (
      <div className={styles.wrapper}>
        <h1>Wallet </h1>
        <div className={styles.content}>
          { !wallet &&
            <Button
              icon='add'
              large
              loading={isLoadingCreateWallet}
              intent='primary'
              onClick={createWallet}
            >
              Create a new Wallet
            </Button>
          }
          {
            wallet &&
            <React.Fragment>
              <h5 className='pt-callout'>Wallet address: {wallet.walletAddress}</h5>

              <ControlGroup fill={true} vertical={false}>

                <input className='pt-input pt-intent-primary' onChange={this.onInputChange} value={amount} placeholder='Enter Amount' />
                <ButtonGroup>
                  <Button
                    icon='add'
                    intent='success'
                    loading={isLoadingTransactionAction}
                    onClick={() => topUpWallet(wallet.walletAddress, amount)}
                  >
                    Top Up
                  </Button>
                  <Button
                    intent='warning'
                    icon='remove'
                    loading={isLoadingTransactionAction}
                    onClick={() => withdrawFromWallet(wallet.walletAddress, amount)}
                  >
                    Withdraw
                  </Button>
                </ButtonGroup>
              </ControlGroup>
            </React.Fragment>
          }
        </div>
      </div>
    );
  }
}
