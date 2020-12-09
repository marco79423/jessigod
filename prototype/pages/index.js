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


export default function Home() {
  const classes = useStyles()

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

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>

      <>
        <CssBaseline/>
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon className={classes.icon}/>
            <Typography variant="h6" color="inherit" noWrap>
              Album layout
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Album layout
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Something short and leading about the collection below—its contents, the creator, etc.
                Make it short and sweet, but not too short so folks don&apost simply skip over it
                entirely.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Main call to action
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Secondary action
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
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
