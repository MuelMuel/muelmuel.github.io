import { Card, Container } from "@mui/material";
import { useExternalScripts } from "../hooks/useExternalScript";

const contactEmail = 'info@pside.ca'

export function Shows() {
  useExternalScripts("//widget.songkick.com/10196177/widget.js")
  return (
    <Container sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 7, alignItems: 'center' }}>
      <Card sx={{ borderRadius: 5, width: "95%", minHeight: 300 }}>
        <a href="https://www.songkick.com/artists/10196177" className="songkick-widget" data-theme="dark" data-font-color="#ffffff" data-background-color="transparent" data-locale="fr" />
      </Card>
    </Container>
  )
}