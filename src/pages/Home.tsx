import { Box } from "@mui/system";
import { Background, Parallax } from 'react-parallax'
import { Checkbox, Fade, IconButton, SpeedDial, SpeedDialAction, useTheme, Slider, Slide } from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { BsSpotify } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import { FaTiktok } from 'react-icons/fa'
import { BsYoutube } from 'react-icons/bs'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { FaBandcamp } from 'react-icons/fa'
import React, { useEffect, useRef } from "react";
import { APP_BAR_HEIGHT } from '../App'
import { useSyncPagePath } from "../hooks/useSyncPagePath";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion"


type HomeProps = {
  id: string,
  onVideoLoaded: (() => void)
};

export function Home({ id, onVideoLoaded }: HomeProps) {

  const socials = [
    { name: 'Boutique', icon: <LocalGroceryStoreIcon />, link: 'https://muellorama.etsy.com' },
    { name: 'Spotify', icon: <BsSpotify />, link: 'https://open.spotify.com/artist/0p2bkdtDkZZ2avOyUeHTRV?si=D-MWnlURT62s59r-DbBW3g' },
    { name: 'Instagram', icon: <BsInstagram />, link: 'https://www.instagram.com/muelmuel_musique/' },
    { name: 'TikTok', icon: <FaTiktok />, link: 'https://www.tiktok.com/@muelmuelmusique' },
    { name: 'Facebook', icon: <BsFacebook />, link: 'https://www.facebook.com/muelmuelmusique/' },
    { name: 'Youtube', icon: <BsYoutube />, link: 'https://www.youtube.com/channel/UC4hyytUfOmzNLPKdoBMX0Ng' },
    { name: 'Bandcamp', icon: <FaBandcamp />, link: 'https://muelmuel.bandcamp.com/' },
  ]

  const [muted, setMuted] = React.useState<boolean>(true);

  const { ref, inView, entry } = useInView()
  const blurredVideoRef = useRef<HTMLVideoElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const topAchorRef = useSyncPagePath(id);
  const theme = useTheme()

  const defaultVideoVolume = 0.5

  useEffect(() => {
    videoRef.current!.volume = defaultVideoVolume
  })

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
            <video ref={videoRef} style={{ position: "absolute", width: "100%" }} autoPlay muted={muted} loop onLoadStart={onVideoLoaded}>
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
          justifyContent='end'
          flexDirection='column'
          width='100%'
          style={{
            height: `calc(100dvh - ${APP_BAR_HEIGHT}px)`,
          }}>
          <Box width="100%" height={10} ref={topAchorRef} top={-10} />
          <Fade in timeout={2000}>
            <Box sx={{ borderRadius: 20, backgroundColor: 'rgba(0 0 0 / 40%)' }} mb={8} p={1} alignItems='top' display='flex' gap={1}>
              {socials.map((social) =>
                <IconButton href={social.link} target="_blank" sx={{ fontSize: 'x-large' }}>
                  {social.icon}
                </IconButton>
              )}
            </Box>
          </Fade>
          <Box
            component={motion.div}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap={1}
            position="absolute"
            right={-80}
            bottom={10}
            animate={{
              x: muted ? 0 : -100
            }}
            transition={{
              type: 'spring',
              stiffness: 700,
              damping: 30
            }}>
            <Checkbox
              defaultChecked={true}
              onChange={(e) => setMuted(e.target.checked)}
              icon={<VolumeUpIcon sx={{ fill: "white" }} />}
              checkedIcon={<VolumeOffIcon sx={{ fill: "white" }} />} />
            <Slider
              min={0}
              max={1}
              step={0.01}
              defaultValue={defaultVideoVolume}
              onChange={(_, val) => videoRef.current!.volume = Number(val)}
              size="small"
              sx={{ color: "white", width: 80 }} />
          </Box>
        </Box>
      </Parallax>

      <SpeedDial
        FabProps={{ color: 'secondary' }}
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