import { Box } from "@mui/system";
import { Background, Parallax } from 'react-parallax'
import { Checkbox, IconButton, SpeedDial, SpeedDialAction, useTheme } from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { BsSpotify } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import { FaTiktok } from 'react-icons/fa'
import { BsYoutube } from 'react-icons/bs'
import React, { useEffect, useRef } from "react";
import { APP_BAR_HEIGHT } from '../App'
import { useSyncPagePath } from "../hooks/useSyncPagePath";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useInView } from "react-intersection-observer";


type HomeProps = {
  id: string,
};

export function Home({ id }: HomeProps) {

  const socials = [
    { name: 'Spotify', icon: <BsSpotify />, link: 'https://open.spotify.com/artist/14pk52yKqb0NFQivwORvAw?si=RC1FCHRaR822ihVH5SntXQ' },
    { name: 'Instagram', icon: <BsInstagram />, link: 'https://www.instagram.com/p_side_94/' },
    { name: 'TikTok', icon: <FaTiktok />, link: 'https://www.tiktok.com/@p.side' },
    { name: 'Facebook', icon: <BsFacebook />, link: 'https://www.facebook.com/p.side.94/' },
    { name: 'Youtube', icon: <BsYoutube />, link: 'https://www.youtube.com/channel/UCsBTfAYSvmDnssnp6jnNGDQ' },
  ]

  const [muted, setMuted] = React.useState<boolean>(true);

  const { ref, inView, entry } = useInView()
  const blurredVideoRef = useRef<HTMLVideoElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const topAchorRef = useSyncPagePath(id);
  const theme = useTheme()

  useEffect(() => {
    if (inView) {
      blurredVideoRef.current?.play()
      videoRef.current?.play()
    } else {
      blurredVideoRef.current?.pause()
      videoRef.current?.pause()
    }

  }
    , [entry])

  return (
    <>
      <Parallax style={{ zIndex: theme.zIndex.drawer - 1 }} strength={400}>
        <Background>
          <Box
            sx={{ backgroundColor: "black" }}
            display='flex'
            flexDirection="column"
            justifyContent="space-around"
            width="100vw"
            style={{
              height: `calc(100dvh - ${APP_BAR_HEIGHT}px)`,
            }}>
            <video ref={blurredVideoRef} style={{ filter: "blur(15px)", width: 'calc(100dvh / 9 * 16)' }} autoPlay muted loop>
              <source src="/videos/Muel Muel Teaser.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <video ref={videoRef} style={{ position: "absolute", width: "100%" }} autoPlay muted={muted} loop>
              <source src="/videos/Muel Muel Teaser.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Background>
        <Box
          ref={ref}
          id={id}
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          width='100%'
          style={{
            height: `calc(100dvh - ${APP_BAR_HEIGHT}px)`,
          }}>
          <Box width="100%" height={10} ref={topAchorRef} top={-10} />
          <Box
            position="absolute"
            right={10}
            bottom={10}>
            <Checkbox
              defaultChecked={true}
              onChange={(e) => setMuted(e.target.checked)}
              icon={<VolumeUpIcon sx={{ fill: "white" }} />}
              checkedIcon={<VolumeOffIcon sx={{ fill: "white" }} />} />
          </Box>
          {/* <Fade in timeout={2000} onEntering={() => setShowSocialButtons(true)}>
            <Box ref={ref} width='80%' maxWidth={500} height='60%'>
              <SiteLogo
                width="100%"
                height="100%" />
            </Box>
          </Fade>
          <Fade in={showSocialButtons} timeout={1500} onEntered={() => setShowChevron(true)}>
            <Box mb={5} alignItems='top' display='flex' gap={1}>
              {socials.map((social) =>
                <IconButton href={social.link} target="_blank" size={'large'}>
                  {social.icon}
                </IconButton>
              )}
            </Box>
          </Fade>
          <Fade in={showChevron} timeout={2000}>
            <Box
              component={motion.div}
              animate={{
                translateY: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity
              }}
            >
              <Button
                color="inherit"
                component={Link}
                to='/body'>
                <BsChevronDown fontSize={60} />
              </Button>
            </Box>
          </Fade> */}
        </Box>
      </Parallax>

      <SpeedDial
        hidden={false}
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 30, right: 20 }}
        icon={<SpeedDialIcon />}
      >
        {socials.map((social) => (
          <SpeedDialAction
            key={social.name}
            icon={social.icon}
            tooltipTitle={social.name}
            onClick={() => window.open(social.link, '_blank')}
          />
        ))}
      </SpeedDial>
    </>
  )
}