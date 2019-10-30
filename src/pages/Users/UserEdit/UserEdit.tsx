import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import {
  IRootState,
  IUserModel,
  IUsersEditState,
} from '@interfaces/index'
import { fetchUserById, saveUser } from '@store/usersEdit/users-edit.effects'
import SectionHeader from '@components/SectionHeader'
import { People as PeopleIcon } from '@material-ui/icons'
import UserEditForm from '@forms/UserEditForm'
import { defaultColors } from '@src/helpers/constants'
import { ReduxDispatch } from '@store/store'

interface IStateToProps {
  usersEdit: IUsersEditState
}

interface IProps {
  fetchUserById: (userId) => Promise<void>
  saveUser: (user) => Promise<void>
}

interface IState {}

export class UserEdit extends React.Component<IProps & IStateToProps & RouteComponentProps, IState> {
  componentDidMount(): void {
    const { editUserId } = this.props.match.params as any
    this.props.fetchUserById(editUserId)
  }

  handleSubmit = async (user: IUserModel) => {
    await this.props.saveUser(user)
  }

  render() {
    const {
      usersEdit: { data, loading },
    } = this.props

    const formData =
      data && data.colors
        ? data
        : {
          ...data,
          colors: { ...defaultColors },
        }

    return (
      <>
        <SectionHeader id="editUserHeader" icon={<PeopleIcon />} text={'navigation.Edit User'} />
        <main className="content">
          <UserEditForm initialValues={formData} isSubmitting={loading} onSubmit={this.handleSubmit} />
        </main>
      </>
    )
  }
}

const mapStateToProps = (state: IRootState): IState => {
  return {
    usersEdit: state.usersEdit,
  }
}

const mapDispatchToProps = (dispatch: ReduxDispatch): IProps => {
  return {
    fetchUserById: (userId) => dispatch(fetchUserById(userId)),
    saveUser: (user) => dispatch(saveUser(user)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserEdit)
