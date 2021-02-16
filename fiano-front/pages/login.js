import { Paper, Typography, Box, Container,TextField, Grid, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import Base from "../src/components/Base";
import { authContext } from "../src/services/auth";

export default function LoginPage() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { user, login, error } = useContext(authContext)

    const handleLogin = () => {
        login(username, password)
    }

    useEffect(() => {
        if (user) {
            Router.push("/")
        }
    }, [user])

    return (
        <Base title="Login">
            <Container disableGutters maxWidth="xs">
                <Paper elevation={4}>
                    <Box p={4}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <Box my={2}>
                            <Typography component="h1" variant="h4" align="center">Login</Typography>
                            <Box mt={2}>
                                <form>
                                    <TextField margin="dense" fullWidth label="username" variant="outlined" value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
                                    <TextField type="password" margin="dense" fullWidth label="password" variant="outlined" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
                                    <div style={{ marginTop: 10 }} />
                                    <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>Login</Button>
                                </form>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Base>
    )
}