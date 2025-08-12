import { Box, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { MailchimpSubscribeForm } from "../components/MailChimpSubscribeForm";

type ContourProps = {
  color: string,
  padding: number
  children: React.ReactNode
};


function AboutCard() {
  return (
    <Card raised={false} sx={{ maxWidth: 600, borderRadius: 5 }}>
      <CardMedia
        sx={{ height: 350 }}
        image="/images/DSCF2923.jpg"
        title="La bande des besogneux"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Miewl Miewl?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Il n’est jamais évident de parvenir à créer une œuvre complexe et sensée en ne s’appuyant que sur des observations anecdotiques et profondément absurdes.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Et quand bien même une personne y arriverait, encore faut-il qu'elle parvienne à se faire remarquer. Un jeu d’autant plus compliqué lorsque l’on patauge au milieu d’une vieille métropole saturée de potentiels «*the next big thing*» et gagnants.es de La Voix.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Il est toutefois de ces artistes qui nous désarçonnent de par leur ancrage si particulier à ce monde. Là où la plupart d’entre-nous galopent chaque jour avec des œillères, <b>Muel Muel</b> observe, et constate.
        </Typography>
      </CardContent>
    </Card>
  )
}

const ContourBox: React.FC<ContourProps> = ({
  color,
  padding,
  children
}) => <Box border={{ xs: 'none', md: '2px solid' }} color={color} sx={{
  borderRadius: 5,
  width: 'auto',
  p: { xs: 'none', md: padding }
}}> {children}</Box >

export function About() {
  return (
    <Container sx={{ height: "", my: 4, display: 'flex', flexDirection: 'column', gap: 7, alignItems: 'center' }}>
      <ContourBox color='rgba(211, 122, 158, 0.1)' padding={0.5}>
        <ContourBox color='rgba(211, 122, 158, 0.3)' padding={1}>
          <ContourBox color='rgba(211, 122, 158, 0.8)' padding={2.5}>
            <AboutCard />
          </ContourBox>
        </ContourBox>
      </ContourBox>
      <MailchimpSubscribeForm />
    </Container>
  )
}