import React, { Component } from 'react';
import { connect } from 'react-redux';
import Blocks from 'components/Blocks';
import { initBlocksPolling } from 'redux/blocks';
import { actionCreators } from 'redux/wallet';

class LatestBlocksPage extends Component {
  componentWillMount () {
    this.props.initBlocksPolling();
  }

  render() {
    return (
      <Blocks blocks={this.props.latestBlocks} {...this.props} />
    );
  }
}

const mapStateToProps = ({ blocks, wallet }) => ({
  ...blocks,
  ...wallet,
});

const mapDispatchToProps = (dispatch) => ({
  initBlocksPolling: () => dispatch(initBlocksPolling()),
  toggleTransactionsDialog: (block) => dispatch(actionCreators.toggleTransactionsDialog(block)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LatestBlocksPage);
