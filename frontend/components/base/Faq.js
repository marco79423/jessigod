import React from 'react'
import {
  Accordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary
} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


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

export function QAItem({defaultExpanded, question, answer, answerDetail}) {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
        <header>
          {question}
        </header>
        {answer}
      </AccordionSummary>
      <AccordionDetails>
        {answerDetail}
      </AccordionDetails>
    </Accordion>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {},
}))

export default function Faq({data}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {data.map(qaItem => (
        <QAItem
          key={qaItem.id}
          defaultExpanded={!!qaItem.defaultExpanded}
          question={qaItem.question}
          answer={qaItem.answer}
          answerDetail={qaItem.answerDetail}
        />
      ))}
    </div>
  )
}

Faq.QAItem = QAItem

