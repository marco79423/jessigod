import React from 'react'
import classNames from 'classnames'
import {makeStyles} from '@material-ui/core/styles'
import {Fab, useScrollTrigger, Zoom} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
  },
}))


export default function ScrollTop({className, selector}) {
  const classes = useStyles()

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(selector)

    if (anchor) {
      anchor.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classNames(classes.root, className)}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon/>
        </Fab>
      </div>
    </Zoom>
  )
}
