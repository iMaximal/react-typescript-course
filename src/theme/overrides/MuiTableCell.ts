import palette from '../palette'
import typography from '../typography'

export default {
  root: {
    ...typography.body1,
    borderBottom: `1px solid ${palette.divider}`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    'white-space': 'nowrap',
  },
}
