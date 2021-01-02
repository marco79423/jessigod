import React from 'react'
import {Dialog, useMediaQuery} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'

export default function ResponsiveDialog({children, className, open, onClose}) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog classes={{paper: className}}
            fullScreen={fullScreen} maxWidth="md"
            scroll="body"
            open={open}
            onClose={onClose}>
      {children}
    </Dialog>
  )
}
