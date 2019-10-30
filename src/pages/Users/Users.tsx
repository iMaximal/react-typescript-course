import axios, { CancelToken, CancelTokenSource } from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { withTranslation, WithTranslation } from 'react-i18next'
import { debounce } from 'lodash-es'
import { TextField, InputAdornment } from '@material-ui/core'
import { People as PeopleIcon, Refresh as RefreshIcon, Search as SearchIcon } from '@material-ui/icons'

import { IUsersState } from '@interfaces/index'
import { fetchUsers } from '@store/users/users.effects'
import Table from './Table'
import SectionHeader from '@components/SectionHeader'
import { url } from '@src/helpers/constants'

import * as style from './style.styl'

interface IStateToProps {
  users: IUsersState
}

interface IProps {
  fetchUsers: (cancelToken: CancelToken, force?: boolean, search?: string) => void
}

interface IState {
  search: string
}

export type TUsersProps = IProps & IStateToProps & RouteComponentProps & WithTranslation

export class Users extends React.PureComponent<TUsersProps, IState> {
  cancelToken: CancelTokenSource = axios.CancelToken.source()

  state = {
    search: '',
  }

  onSearchDebounced = debounce(this.props.fetchUsers, 300)

  componentDidMount(): void {
    this.props.fetchUsers(this.cancelToken.token, false, undefined)
  }

  componentWillUnmount(): void {
    this.resetCancelToken()
  }

  resetCancelToken = () => {
    this.cancelToken.cancel()
  }

  refreshData = (event) => {
    event.preventDefault()
    this.props.fetchUsers(this.cancelToken.token, true, this.state.search)
  }

  handleSearch = (event) => {
    const { value } = event.target
    this.setState(
      {
        search: value,
      },
      () => {
        this.onSearchDebounced(this.cancelToken.token, true, value)
      },
    )
  }

  handleRowClick = (userId) => {
    this.props.history.push(url.userEdit.replace(':editUserId', userId))
  }

  render() {
    const { t, users } = this.props
    const { search } = this.state

    return (
      <>
        <SectionHeader id="usersHeader" icon={<PeopleIcon />} text={'navigation.Users'} />
        <main className="content">
          <div className={style.controls}>
            <div>
              <TextField
                className={style.search}
                id="searchUser"
                name="searchUser"
                label={t('labels.searchUser')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={search}
                onChange={this.handleSearch}
                role="search"
              />
            </div>
            <div className={style.icon}>
              <button aria-label={t('buttons.refreshUsers')} tabIndex={0} onClick={this.refreshData}>
                <RefreshIcon />
              </button>
            </div>
          </div>
          <Table loading={users.loading} users={users.list} onHandleRowClick={this.handleRowClick} />
        </main>
      </>
    )
  }
}

const mapStateToProps = (state): IStateToProps => {
  return {
    users: state.users,
  }
}

const mapDispatchToProps = (dispatch): IProps => {
  return {
    fetchUsers: (cancelToken, force, search): void => dispatch(fetchUsers(cancelToken, force, search)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Users))
