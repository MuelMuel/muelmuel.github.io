import { Grid } from "@mui/material"
import Album from "../components/Album"

interface MusicProps {

  onAllImagesLoaded: (() => void)
}

export function Music({ onAllImagesLoaded }: MusicProps) {
  const albums = [
    {
      title: 'Dématérialisation',
      imgUrl: '/images/cover_art/Dématérialisation.jpg',
      releaseDate: '08-25-2022',
      presaveUrl: 'https://distrokid.com/hyperfollow/muelmuel/dmatrialisation-2'
    },
  ]

  let loadedImageCount = 0
  const imageLoaded = () => {
    loadedImageCount++
    if (loadedImageCount >= albums.length) {
      onAllImagesLoaded()
    }
  }

  return (
    <Grid
      container
      my={7}
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      gap={7}
    >
      {albums.map((album) =>
        <Album name={album.title}
          imgUrl={album.imgUrl}
          releaseDate={album.releaseDate}
          presaveUrl={album.presaveUrl}
          imageLoaded={imageLoaded} />
      )}
    </Grid>
  )
}