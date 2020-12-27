import React from 'react'
import Image from 'next/image'
import Typography from '@material-ui/core/Typography'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import {useSecretKey, useSecretKeyEnabled} from '../helpers'
import {FormControlLabel, Switch} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  question: {
  },
  header: {},
  headerTitle: {
    fontSize: '1.25rem',
    fontWeight: 800,
  },
  content: {
    marginTop: theme.spacing(1),
    lineHeight: 2,
  },
  detail: {},
  detailContent: {
    marginTop: theme.spacing(1),
    lineHeight: 2,
  }
}))

const AccordionSummary = withStyles({
  content: {
    flexDirection: 'column',
  },
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.action.hover,
    display: 'flex',
    flexDirection: 'column',
  },
}))(MuiAccordionDetails)


export default function Questions() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <HowToHearGodQuestion/>
      <HowToTalkQuestion/>
      <HowToContributeQuestion/>
    </div>
  )
}


function HowToHearGodQuestion() {
  const classes = useStyles()

  return (
    <Accordion className={classes.question}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        classes={classes.summary}
      >
        <header className={classes.header}>
          <Typography className={classes.headerTitle} variant="h1">如何聽見福音？</Typography>
        </header>
        <Typography
          className={classes.content}>西卡神是博愛的，祂允許所有神、智者、甚至人渣都有平等說話的權利。<br/>西卡神會紀錄每個人說的話，並將這些話語平等的傳遞給每一個教徒。</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.detail}>
        <Typography className={classes.detailContent}>每天九點，西卡神會自動推送大家說的話到各個平台。<br/><br/>西卡神教 Line 官方帳號：<br/> <Image
          width={200} height={200} src="/images/line-channel.png"/></Typography>
      </AccordionDetails>
    </Accordion>
  )
}


function HowToTalkQuestion() {
  const classes = useStyles()
  const {secretKey} = useSecretKey()
  const {secretKeyEnabled, setSecretKeyEnabled} = useSecretKeyEnabled()

  const handleChange = (event) => {
    setSecretKeyEnabled(event.target.checked)
  }

  return (
    <Accordion className={classes.question}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
        <header className={classes.header}>
          <Typography className={classes.headerTitle} variant="h1">如何平等的說話？</Typography>
        </header>
        <Typography className={classes.content}>
          西卡神明白社交使人有壓力，使人不敢吐真言。雖然祂是全知全能的，但還是允許信徒隱藏自己的身份說話；祂也知道不是每個人都有機會說出自己的想法，所以祂也允許信徒代為轉述，這一切都是為了讓信徒們能信奉祂，讚頌祂的偉大。
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.detail}>
        <Typography className={classes.detailContent}>您的密錀是「{secretKey}」，由瀏覽器隨機產生，已存在瀏覽器中，不清快取會一直保留。<br/>您必須使用同樣的「密錀」才能刪改對應的福音。服務器只會紀錄密錀與福音的關聯，不會知道密鑰對應的是誰。<br/>
          <FormControlLabel
            control={
              <Switch
                checked={secretKeyEnabled}
                onChange={handleChange}
                color="primary"
              />
            }
            label="編輯時顯示密錀"
          /></Typography>
      </AccordionDetails>
    </Accordion>
  )
}

function HowToContributeQuestion() {
  const classes = useStyles()

  return (
    <Accordion className={classes.question}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        classes={classes.summary}
      >
        <header className={classes.header}>
          <Typography className={classes.headerTitle} variant="h1">我想奉獻自己一份心力！</Typography>
        </header>
        <Typography
          className={classes.content}>西卡神接受各種各樣的下賤人類的奉獻，無論是你會設計、會寫程式還是各種垃圾技能都能有一席之地。</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.detail}>
        <Typography className={classes.detailContent}>西卡神教網站的 Github 連結： <a
          target="_blank"
          href="https://github.com/marco79423/jessigod">連結</a><br/><br/>有什麼想法可以開 Issue 討論，或直接發 PR 也行。</Typography>
      </AccordionDetails>
    </Accordion>
  )
}
