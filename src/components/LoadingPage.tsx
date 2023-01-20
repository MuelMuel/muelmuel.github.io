
import { Backdrop, Box, CircularProgress, Theme } from "@mui/material"
import { ReactComponent as SiteLogo } from '../icons/text_logo.svg';

interface LoadingPageProps {
    open: boolean
    theme: Theme
}

export default function LoadingPage({ open, theme }: LoadingPageProps) {
    return (
        <Backdrop
            sx={{
                backgroundColor: theme.palette.background.paper,
                zIndex: (theme) => theme.zIndex.drawer + 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center"
            }}
            open={open}
        >
            <Box pl={0} mb={0}>
                <SiteLogo fill={theme.palette.text.primary} width="180px" height='90px' />
            </Box>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}