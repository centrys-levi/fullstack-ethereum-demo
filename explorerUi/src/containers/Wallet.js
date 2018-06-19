import { connect } from 'react-redux';
import Wallet from 'components/Wallet';
import {
  createWallet,
  topUpWallet,
  withdrawFromWallet,
 } from 'redux/wallet';

const mapStateToProps = ({wallet}) => ({
  ...wallet
});

const mapDispatchToProps = (dispatch) => ({
  createWallet: () => dispatch(createWallet()),
  topUpWallet: (address, amount) => dispatch(topUpWallet(address, amount)),
  withdrawFromWallet: (address, amount) => dispatch(withdrawFromWallet(address, amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
