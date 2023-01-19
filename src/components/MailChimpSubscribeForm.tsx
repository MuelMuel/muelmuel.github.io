import { Box, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import MailchimpSubscribe from "react-mailchimp-subscribe"


export function MailchimpSubscribeForm() {
    const url = "//muelmuel.us14.list-manage.com/subscribe/post?u=3da53ef33afb8732bcdeed30d&amp;id=251c43e69f";
    const CustomForm = (status: any, message: any) => {
        return (
            <Card>
                <CardHeader title="Tu trippes sur les newsletters?" subheader="Ça tombe bien"/>
                <CardContent>
                    <Box
                        component="form"
                        display='flex'
                        gap={2}
                        flexDirection='column'
                        noValidate
                        autoComplete="off">
                        <TextField color='secondary' label="Email" required />
                        <TextField color='secondary' label="Prénom" />
                        <TextField color='secondary' label="Nom" />
                    </Box>
                </CardContent>
            </Card>
        )
    }

    return (
        <MailchimpSubscribe
            url={url}
            render={({ subscribe, status, message }) => (
                <CustomForm
                    status={status}
                    message={message}
                />
            )}
        />
    )
}