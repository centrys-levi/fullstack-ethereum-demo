import { connect } from 'react-redux';
import BlockDetailsDialog from 'components/BlockDetailsDialog';
import { actionCreators } from 'redux/wallet';

const mapStateToProps = ({wallet}) => ({
  ...wallet
});

const mapDispatchToProps = (dispatch) => ({
  toggleTransactionsDialog: (block) => dispatch(actionCreators.toggleTransactionsDialog(block)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockDetailsDialog);
