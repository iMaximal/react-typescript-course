import * as variables from '@style/variables.styl'

export default {
  root: {
    color: variables.iconSidebar,
  },
  contained: {
    boxShadow: '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
    backgroundColor: variables.white,
  },
  containedPrimary: {
    marginTop: '1rem',
    backgroundColor: variables.primary,
    '&:hover': {
      backgroundColor: variables.secondary,
    },
  },
  containedSecondary: {
    marginTop: '1rem',
    backgroundColor: variables.secondary,
    '&:hover': {
      backgroundColor: variables.primary,
    },
  },
}
