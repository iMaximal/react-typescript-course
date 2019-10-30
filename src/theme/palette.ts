import { colors } from '@material-ui/core'
import * as variables from '@style/variables.styl'

export default {
  primary: {
    contrastText: variables.white,
    dark: variables.primary,
    main: variables.primary,
    light: variables.white,
  },
  secondary: {
    contrastText: variables.white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400'],
  },
  success: {
    contrastText: variables.white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: variables.white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: variables.white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: variables.white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600],
  },
  background: {
    default: variables.baseBackground,
    paper: variables.white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
}
