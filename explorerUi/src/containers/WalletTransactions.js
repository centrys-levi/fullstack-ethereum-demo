import { connect } from 'react-redux';
import Transactions from 'components/Transactions';
import { actionCreators } from 'redux/wallet';

const mapStateToProps = ({wallet}) => ({
  ...wallet
});

const mapDispatchToProps = (dispatch) => ({
  toggleTransactionsDialog: (block) => dispatch(actionCreators.toggleTransactionsDialog(block)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
