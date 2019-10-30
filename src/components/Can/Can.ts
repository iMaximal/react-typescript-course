import { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import { rules } from '@src/rbac-rules'

import { IRootState, IUserState } from '@src/interfaces'

const check = (rules, role, action, data): boolean => {
  const permissions = rules[role]
  if (!permissions) {
    // role is not present in the rules
    return false
  }

  const staticPermissions = permissions.static

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true
  }

  const dynamicPermissions = permissions.dynamic

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action]
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false
    }

    return permissionCondition(data)
  }
  return false
}

interface IProps {
  perform: string
  data?: object
  yes?: () => ReactElement | null
  no?: () => ReactElement | null
}

const Can = (props: IProps) => {
  const { role } = useSelector<IRootState, IUserState>((state) => state.user)

  return check(rules, role, props.perform, props.data) ? props.yes() : props.no()
}

Can.defaultProps = {
  yes: () => null,
  no: () => null,
}

export default Can
