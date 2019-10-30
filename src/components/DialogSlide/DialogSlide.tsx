import * as React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { useTranslation } from 'react-i18next'

interface IProps {
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
}

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const DialogSlide: React.FC<IProps> = ({ onClose, onConfirm, title, description }) => {
  const { t } = useTranslation()

  return (
    <Dialog
      open
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      role="alert"
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{t(title)}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{t(description)}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {t('buttons.cancel')}
        </Button>
        <Button onClick={onConfirm} color="primary">
          {t('buttons.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogSlide
