import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import Head from 'next/head'
import {Tab, Tabs, TextField, useScrollTrigger, Zoom} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'
import Slide from '@material-ui/core/Slide';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Fab from '@material-ui/core/Fab';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function SimpleAccordion() {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion expanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>如何聽見福音？</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function HideOnScroll(props) {
  const {children, window} = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({target: window ? window() : undefined});

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

function SimpleCard() {
  return (
    <Card style={{width: 400}}>
      <CardMedia
        component="img"
        style={{width: 300, margin: '0 auto'}}
        image="/images/logo.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="h5" component="h2" style={{marginTop: 8}}>
          你聽過神嗎？
        </Typography>
        <Typography style={{marginTop: 20}}>
          西卡神是博愛的，祂允許所有神、智者、甚至人渣都有平等說話的權利。
        </Typography>
        <Typography style={{marginTop: 10}}>
          西卡神會紀錄每個人說的話，並將這些話語平等的傳遞給每一個教徒。
        </Typography>
      </CardContent>
      <CardActions style={{justifyContent: 'flex-end', paddingRight: 20}}>
        <Button size="small">想知道更多</Button>
      </CardActions>
    </Card>
  )
}

function MyForm(props) {
  const classes = useStyles()
  const randomKey = Math.random().toString(36).substring(7);

  return (
    <Container>
      <Grid container spacing={2} justify="center" style={{marginTop: 8, justifyContent: 'flex-end', textAlign: 'center'}}>
          <Grid item>
            <TextField variant="outlined" margin="dense" value={randomKey} disabled={true}/>
          </Grid>
          <Grid item>
            <Button>
              重新產生密鑰
            </Button>
          </Grid>
      </Grid>
      <Typography variant="h4" color="textPrimary" style={{marginTop: 8}}>
        你剛剛聽見－－
      </Typography>
      <Grid container style={{marginTop: 16}}>
        <Grid item>
          <TextField
            placeholder={'誰說？'}
            style={{flex: 1}}
          />
        </Grid>
      </Grid>
      <Grid container style={{marginTop: 8}}>
        <Grid item xs={12}>
          <TextField
            style={{width: '100%', marginTop: 8}}
            multiline
            variant="outlined"
            rows={8}
            placeholder={'說了什麼？'}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justify="center" style={{marginTop: 8, justifyContent: 'flex-end'}}>
        <Grid item>
          <Button variant="contained" color="primary">
            送出給大家知道
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}


export default function Home(props) {
  const classes = useStyles()
  const [tabValue, setTabValue] = React.useState('0');

  const gospels = [
    {name: 'Nabi姐', message: '你怎麼長這樣, 笑死'},
    {name: 'Nabi姐', message: '我不是在教你, 我是在打臉你'},
    {
      name: '威廉哥', message: '大家好 我是新來的垃圾\n' +
        '          請各位前輩盡量打我罵我幹我蹂躪我\n' +
        '          反正我就是不值一提的低能廢物'
    },
    {name: 'Nabi姐', message: '你怎麼長這樣, 笑死'},
    {name: 'Nabi姐', message: '我不是在教你, 我是在打臉你'},
    {
      name: '威廉哥', message: '大家好 我是新來的垃圾\n' +
        '          請各位前輩盡量打我罵我幹我蹂躪我\n' +
        '          反正我就是不值一提的低能廢物'
    },
    {name: 'Nabi姐', message: '你怎麼長這樣, 笑死'},
    {name: 'Nabi姐', message: '我不是在教你, 我是在打臉你'},
    {
      name: '威廉哥', message: '大家好 我是新來的垃圾\n' +
        '          請各位前輩盡量打我罵我幹我蹂躪我\n' +
        '          反正我就是不值一提的低能廢物'
    },
    {name: 'Nabi姐', message: '你怎麼長這樣, 笑死'},
    {name: 'Nabi姐', message: '我不是在教你, 我是在打臉你'},
    {
      name: '威廉哥', message: '大家好 我是新來的垃圾\n' +
        '          請各位前輩盡量打我罵我幹我蹂躪我\n' +
        '          反正我就是不值一提的低能廢物'
    },
    {name: 'Nabi姐', message: '你怎麼長這樣, 笑死'},
    {name: 'Nabi姐', message: '我不是在教你, 我是在打臉你'},
    {
      name: '威廉哥', message: '大家好 我是新來的垃圾\n' +
        '          請各位前輩盡量打我罵我幹我蹂躪我\n' +
        '          反正我就是不值一提的低能廢物'
    },
  ]

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  };

  return (
    <>
      <Head>
        <title>西卡神教福音</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>

      <CssBaseline/>

      <>
        <HideOnScroll {...props}>
          <AppBar>
            <Toolbar>
              <CameraIcon className={classes.icon}/>
              <Typography variant="h6" color="inherit" noWrap>
                西卡神教福音
              </Typography>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <main style={{marginTop: 30}}>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="md">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <SimpleCard/>
                </Grid>
                <Grid item xs={6}>
                  <MyForm/>
                </Grid>
              </Grid>

            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <TabContext value={tabValue}>
              <Tabs
                value={'0'}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="disabled tabs example"
              >
                <Tab value={'0'} label="全部"/>
                <Tab value={'1'} label="我聽見的"/>
                <Tab value={'2'} label="說明"/>
              </Tabs>
              <TabPanel value={'0'}>
                <Grid container spacing={4}>
                  {gospels.map((gospel, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {gospel.name}
                          </Typography>
                          <Typography>
                            {gospel.message}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            修改
                          </Button>
                          <Button size="small" color="primary">
                            刪除
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={'1'}>
                <Grid container spacing={4}>
                  {gospels.map((gospel, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image="https://source.unsplash.com/random"
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {gospel.name}
                          </Typography>
                          <Typography>
                            {gospel.message}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            修改
                          </Button>
                          <Button size="small" color="primary">
                            刪除
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={'2'}>
                <SimpleAccordion/>
              </TabPanel>
            </TabContext>
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
          <Copyright/>
        </footer>
        {/* End footer */}
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon/>
          </Fab>
        </ScrollTop>
      </>
    </>
  )
}

function ScrollTop(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

  const {children, window} = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}
