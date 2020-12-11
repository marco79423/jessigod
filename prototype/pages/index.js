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
import {Tab, Tabs, TextField, useScrollTrigger} from '@material-ui/core'
import {TabContext, TabPanel} from '@material-ui/lab'
import Slide from '@material-ui/core/Slide';

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
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="/images/logo.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          你聽過神嗎？
        </Typography>
        <Typography>
          西卡神是博愛的，祂允許所有神、智者、甚至人渣都有平等說話的權利。
        </Typography>
        <Typography>
          西卡神會紀錄每個人說的話，並將這些話語平等的傳遞給每一個教徒。
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">想知道更多</Button>
      </CardActions>
    </Card>
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
          <AppBar position="fixed">
            <Toolbar>
              <CameraIcon className={classes.icon}/>
              <Typography variant="h6" color="inherit" noWrap>
                西卡神教福音
              </Typography>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <SimpleCard/>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                你剛剛聽見－－
              </Typography>
              <div style={{display: 'flex'}}>
                <TextField
                  placeholder={'誰'}
                  style={{flex: 1}}
                />
                <Typography align="center" color="textPrimary">
                  說
                </Typography>
                <TextField
                  multiline
                  placeholder={'說了什麼？'}
                  style={{flex: 1}}
                />
              </div>

              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      送出給大家知道
                    </Button>
                  </Grid>
                </Grid>
              </div>
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
      </>
    </>
  )
}
