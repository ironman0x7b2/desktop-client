import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideReDelegateSuccessDialog } from '../../../../../../actions/reDelegate';
import { setIntervalValue, transactionHash } from '../../../../../../actions/transactions';
import Icon from '../../../../../../components/Icon';
import variables from '../../../../../../dummy/variables';
import '../Delegate/DelegateDialog/index.css';
import '../Delegate/SuccessDialog/index.css';

class ReDelegateDialog extends Component {
    componentDidUpdate (pp, ps, ss) {
        if (this.props.startSetInterval && this.props.open) {
            let value = 0;
            value = setInterval(() => {
                this.props.transactionHash(this.props.hash);
            }, 1000);
            this.props.setIntervalValue(value);
        }
    }

    render () {
        return (
            <Dialog
                aria-describedby="re-delegate-success-dialog-description"
                aria-labelledby="re-delegate-success-dialog-title"
                className="dialog success_dialog"
                open={this.props.open}
                onClose={this.props.handleClose}>
                <DialogTitle id="re-delegate-success-dialog-title">
                    <div className="header">
                        <p>
                            <b className="text1">
                                {variables[this.props.lang].TI_de_delegate}
                            </b> {variables[this.props.lang].from}
                            <b className="text2">
                                {this.props.rowData.validator &&
                                this.props.rowData.validator.description &&
                                this.props.rowData.validator.description.moniker &&
                                this.props.rowData.validator.description.moniker}
                            </b>
                        </p>
                    </div>
                </DialogTitle>
                <DialogContent className="content">
                    <div className="row">
                        <Icon
                            className="success"
                            icon="success"/>
                    </div>
                    <div className="row">
                        <p className="value">
                            {variables[this.props.lang].tx_hash}: {this.props.hash}
                        </p>
                    </div>
                </DialogContent>
                <DialogActions className="button_div">
                    <Button
                        autoFocus
                        className="active_button"
                        variant="outlined"
                        onClick={this.props.handleClose}>
                        {variables[this.props.lang].close}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ReDelegateDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    hash: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    rowData: PropTypes.object.isRequired,
    setIntervalValue: PropTypes.func.isRequired,
    startSetInterval: PropTypes.bool.isRequired,
    transactionHash: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        rowData: state.staking.rowData,
        open: state.staking.reDelegate.reDelegateDialog.success,
        hash: state.staking.hash,
        startSetInterval: state.transactions.startSetInterval,
    };
};

const actionsToProps = {
    handleClose: hideReDelegateSuccessDialog,
    setIntervalValue,
    transactionHash,
};

export default connect(stateToProps, actionsToProps)(ReDelegateDialog);
