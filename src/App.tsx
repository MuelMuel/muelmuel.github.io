import ResponsiveAppBar from "./components/ResponsiveAppBar"
import { Page } from "./components/Page"
import { Container, Divider, Box, CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from './theme'
import { Home } from "./pages/Home"
import { Music } from "./pages/Music"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import LoadingPage from "./components/LoadingPage"
import { Shows } from "./pages/Shows"

export const APP_BAR_HEIGHT = 80

function App() {

  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (loading) {
      return
    }
    scrollToLocation()
  }, [location])

  const videoLoaded = () => {
    setLoading(false)
    scrollToLocation()
  }
  function scrollToLocation() {
    let id = location.pathname.split('/').at(-1)
    if (!id) {
      id = 'home'
    }
    var elementPosition = document.getElementById(id)?.getBoundingClientRect().top
    var offsetPosition = (elementPosition ? elementPosition : 0) + window.pageYOffset - APP_BAR_HEIGHT

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <LoadingPage theme={theme} open={loading} />
        <Home id='home' onVideoLoaded={() => videoLoaded()}/>
        <ResponsiveAppBar />
        <Box
          sx={{
            backgroundImage: `linear-gradient(0deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main} 100%)`,
            backgroundRepeat: 'no-repeat',
          }}>
          <Container id='body'>
            <Page title="Spectacles" id="shows">
              <Shows />
            </Page>
            <Divider />
            <Page title="Musique" id="music">
              <Music onAllImagesLoaded={() => {}} />
            </Page>
            <Divider />
            <Page title="À Propos" id="about">
              <About />
            </Page>
            <Divider />
            <Page title="Contact" id="contact">
              <Contact />
            </Page>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App