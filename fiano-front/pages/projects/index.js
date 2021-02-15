import { Box, Container, Grid, Paper, Typography } from "@material-ui/core";
import Base from "../../src/components/Base";
import withAuthentication from "../../src/components/hoc/auth";
import ProjectTable from "../../src/components/tables/project/ProjectTable";

function ProjectPage() {
    return (
        <Base title="Daftar Proyek">
            <Container disableGutters maxWidth="md">
                <Box m={2}>
                    <Typography component="h1" variant="h6" align="center"> Daftar Proyek </Typography>
                </Box>
                <Paper elevation={5}>
                    <ProjectTable />
                </Paper>
            </Container>
        </Base>
    )
}

export default withAuthentication(ProjectPage)