import { Box, Card, CardContent, CardHeader, TextField, Button, Alert, CardMedia } from "@mui/material";
import MailchimpSubscribe from "react-mailchimp-subscribe"
import { useState } from 'react';


export function MailchimpSubscribeForm() {
    const url = "https://muelmuel.us14.list-manage.com/subscribe/post?u=3da53ef33afb8732bcdeed30d&amp;id=251c43e69f";

    return (
        <MailchimpSubscribe
            url={url}
            render={({ subscribe, status, message }) => (
                <CustomForm
                    status={status}
                    message={message}
                    onValidated={(formData: any) => subscribe(formData)}
                />
            )}
        />
    )
}

interface CustomFormProps {
    status: any,
    message: any,
    onValidated: (data: any) => void
}

const CustomForm = ({ status, message, onValidated }: CustomFormProps) => {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (email &&
            firstName &&
            lastName &&
            email.indexOf("@") > -1) {
            onValidated({
                EMAIL: email,
                MERGE1: firstName,
                MERGE2: lastName,
            })
        }
    }

    return (
        <Card sx={{ maxWidth: 500, width: "100%", borderRadius: 5 }}>
            <CardMedia
                sx={{ width: "100%", height: 180}}
                image="/images/DSCF2888.jpg"
                title="La bande des besogneux"
            />
            <CardHeader title="Tu veux rien manquer de Muel?" subheader="Abonne-toi à notre infolettre, mon buddy." />
            <CardContent>
                {status === "error" && (
                    <Alert sx={{ mb: 2 }} severity="error" ><Box dangerouslySetInnerHTML={{ __html: message }} /></Alert>
                )}
                {status === "success" && (
                    <Alert sx={{ mb: 2 }} severity="success" >Ainsi débute notre alliance!</Alert>
                )}
                {status !== "success" && (
                    <Box
                        component="form"
                        display='flex'
                        gap={2}
                        flexDirection='column'
                        onSubmit={handleSubmit}
                        autoComplete="off">
                        <TextField
                            color='secondary'
                            label="Email"
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            placeholder="john@burger.com"
                            required />
                        <TextField
                            color='secondary'
                            label="Prénom"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            type="text"
                            placeholder="John"
                        />
                        <TextField
                            color='secondary'
                            label="Nom"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            type="text"
                            placeholder="Burger"
                        />
                        <Button type="submit" variant="contained">
                            {status === "sending" && (
                                "envoi..."
                            )}
                            {status !== "sending" && (
                                "S'Abonner"
                            )}

                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    )
}