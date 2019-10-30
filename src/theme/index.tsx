import { createMuiTheme } from '@material-ui/core'

// You can switch from CSS definitions to JSS
import palette from './palette'
import typography from './typography'
import overrides from './overrides'

export const theme = createMuiTheme({
  // palette,
  // typography,
  // overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
})
