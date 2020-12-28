import React from 'react'

import sayingManager from '../../../core/features/sayingManager'
import ConfirmDialog from '../SayingForm/ConfirmDialog'

export default function DeleteSayingDialog({id, open, onClose}) {
  const deleteSaying = async () => {
    await sayingManager.delete(id)
    window.location.reload()
  }

  return (
    <ConfirmDialog
      open={open}
      confirmLabel={'刪除'}
      cancelLabel={'取消'}
      onConfirm={deleteSaying}
      onCancel={onClose}/>
  )
}
