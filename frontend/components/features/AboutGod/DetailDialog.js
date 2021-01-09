import React from 'react'
import Image from 'next/image'
import {makeStyles} from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  Typography
} from '@material-ui/core'

import useSecretKey from '../../hooks/useSecretKey'
import useIsSecretKeyShown from '../../hooks/useIsSecretKeyShown'
import Faq from '../../base/Faq'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  question: {
    fontSize: '1.25rem',
    fontWeight: 800,
  },
  answer: {
    marginTop: theme.spacing(1),
    lineHeight: 2,
  },
  answerDetail: {
    marginTop: theme.spacing(1),
    lineHeight: 2,
  },
  actions: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  }
}))

export default function DetailDialog({open, onClose}) {
  const classes = useStyles()

  const {secretKey} = useSecretKey()
  const {isSecretKeyShown, showSecretKey, hideSecretKey} = useIsSecretKeyShown()

  const handleSwitchChange = (event) => {
    if (event.target.checked) {
      showSecretKey()
    } else {
      hideSecretKey()
    }
  }

  const data = [
    {
      id: 'how-to-hear-god-question',
      defaultExpanded: true,
      question: <Typography className={classes.question} variant="h1">如何聽見福音？</Typography>,
      answer: <Typography className={classes.answer}>西卡神是博愛的，祂允許所有神、智者、甚至人渣都有平等說話的權利。<br/>西卡神會記錄每個人說的話，並將這些話語平等的傳遞給每一個教徒。</Typography>,
      answerDetail: <Typography className={classes.answerDetail}>每天九點，西卡神會自動推送大家說的話到各個平台。<br/><br/>西卡神教 Line
        官方帳號：<br/><Image width={200} height={200} src="/images/line-channel.png"/><br/>Telegram 群組：<br/>邀請加入 @JessigodBot</Typography>
    },
    {
      id: 'how-to-talk-question',
      question: <Typography className={classes.question} variant="h1">如何平等的說話？</Typography>,
      answer: <Typography
        className={classes.answer}>西卡神明白社交使人有壓力，使人不敢吐真言。雖然祂是全知全能的，但還是允許信徒隱藏自己的身份說話；祂也知道不是每個人都有機會說出自己的想法，所以祂也允許信徒代為轉述，這一切都是為了讓信徒們能信奉祂，讚頌祂的偉大。</Typography>,
      answerDetail: <Typography className={classes.answerDetail}>您的密錀是「{secretKey}」，由瀏覽器隨機產生，已存在瀏覽器中，不清快取會一直保留。<br/>您必須使用同樣的「密錀」才能刪改對應的福音。服務器只會記錄密錀與福音的關聯，不會知道密鑰對應的是誰。<br/>
        <FormControlLabel
          control={
            <Switch
              checked={isSecretKeyShown}
              onChange={handleSwitchChange}
              color="primary"
            />
          }
          label="編輯時顯示密錀"
        /></Typography>
    },
    {
      id: 'how-to-contribute-question',
      question: <Typography className={classes.question} variant="h1">我想奉獻自己一份心力！</Typography>,
      answer: <Typography
        className={classes.answer}>西卡神接受各種各樣的下賤人類的奉獻，無論是你會設計、會寫程式還是各種垃圾技能都能有一席之地。</Typography>,
      answerDetail: <Typography className={classes.answerDetail}>西卡神教網站的 Github 連結： <a target="_blank"
                                                                                       href="https://github.com/marco79423/jessigod">連結</a><br/><br/>有什麼想法可以開
        Issue 討論，或直接發 PR 也行。</Typography>,
    }
  ]

  return (
    <Dialog scroll="body" maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle disableTypography="false" className={classes.title}>教義說明</DialogTitle>
      <DialogContent><Faq data={data}/></DialogContent>
      <DialogActions className={classes.actions}>
        <Button variant="contained" size="large" onClick={onClose} color="primary">
          我瞭解了
        </Button>
      </DialogActions>
    </Dialog>
  )
}
