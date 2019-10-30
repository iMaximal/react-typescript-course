import React from 'react'
import { Action, Location, UnregisterCallback } from 'history'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isDirty } from 'redux-form'

import { IRootState } from '@src/interfaces'
import DialogSlide from '@components/DialogSlide'

interface ILeaveProps {
  action: Action
  location: Location
}

interface IProps {
  active: boolean
}

interface IState {
  isShowModal: boolean
  location?: Location
  action?: Action
}

export class Blocker extends React.PureComponent<IProps & RouteComponentProps, IState> {
  state = {
    isShowModal: false,
    action: undefined,
    location: undefined,
  }

  private unblock?: UnregisterCallback

  componentDidMount() {
    this.startListener()
  }

  componentDidUpdate(prevProps) {
    if (this.props.active) {
      window.onbeforeunload = () => true
    } else {
      window.onbeforeunload = null
    }

    if (prevProps.active && this.props.location.pathname !== prevProps.location.pathname) {
      this.startListener()
    }
  }

  componentWillUnmount() {
    this.unblock && this.unblock()
  }

  startListener = () => {
    const { history } = this.props

    // @ts-ignore
    this.unblock = history.block(this.handlePageChange)
  }

  showModal = (props: ILeaveProps) => {
    const { action, location } = props

    this.setState({
      action,
      location,
      isShowModal: true,
    })
  }

  closeDialog = () => {
    this.setState({
      isShowModal: false,
      location: undefined,
      action: undefined,
    })
  }

  confirmLeave = () => {
    const { isShowModal, location, action } = this.state

    if (!isShowModal) {
      return
    }

    if (location) {
      this.unblock && this.unblock()

      if (action === 'REPLACE') {
        this.props.history.replace(location)
      } else {
        this.props.history.push(location)
      }
    }

    this.closeDialog()
  }

  handlePageChange = (location: Location, action: Action) => {
    const { active } = this.props

    if (active) {
      this.showModal({ action, location })

      return false
    }

    return
  }

  render() {
    const { isShowModal } = this.state

    if (isShowModal) {
      return (
        <DialogSlide
          onClose={this.closeDialog}
          onConfirm={this.confirmLeave}
          title="modals.unsavedTitle"
          description="modals.unsavedDescription"
        />
      )
    }

    return null
  }
}

interface IMapStateToProps {
  active: boolean
}

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  active: Object.keys(state.form)
    .map((key) => isDirty(key)(state))
    .some((value) => value),
})

export default connect<IMapStateToProps, IRootState>(mapStateToProps)(withRouter(Blocker))
