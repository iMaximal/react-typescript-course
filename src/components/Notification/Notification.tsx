import * as React from 'react'
import {
  IDispatch,
  INotificationState,
} from '@src/interfaces'
import { connect } from 'react-redux'
import {
  WithTranslation,
  withTranslation,
} from 'react-i18next'
import clsx from 'clsx'

import * as style from './style.styl'
import { cleanNotificationAction } from '@store/notification/notification.actions'

interface IStateToProps {
  notification?: INotificationState
}

@(connect((state: IStateToProps) => ({
  notification: state.notification,
})) as any)
class Notification extends React.PureComponent<IStateToProps & IDispatch & WithTranslation> {
  timeoutId

  componentDidUpdate(prevProps: IStateToProps) {
    if (prevProps.notification.createdTime !== this.props.notification.createdTime) {
      clearTimeout(this.timeoutId)

      // 7 * 1000ms = 7 seconds
      const calculatedTimeout = (this.props.notification.timeout || 7) * 1000

      this.timeoutId = setTimeout(() => {
        this.props.dispatch(cleanNotificationAction())
      }, calculatedTimeout)
    }
  }

  render() {
    const { active, type = 'error', message, errors } = this.props.notification
    const { t } = this.props

    const containerClass = clsx(style.container, style[type])

    const textMessage =
      (errors && errors.map((error, i) => (
        <p key={i}>{t([`messages.${error.message || error._error}`, 'defaultError'])}</p>
      )))
      || t([`messages.${message}`, message])
      || t('defaultError')

    return active && <div className={containerClass}>{textMessage}</div>
  }
}

export default withTranslation()(Notification)
