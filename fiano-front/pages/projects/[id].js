import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import moment from 'moment';
import { Box, Card, Collapse, Divider, Grid, Container, IconButton, LinearProgress, Typography, Paper } from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Base from "../../src/components/Base";
import ProjectScheduler from '../../src/components/scheduler'
import { useProjectDetailData } from "../../src/services/project/useProject";
import { getCurrency } from '../../src/services/util';
import withAuthentication from '../../src/components/hoc/auth';
import DeliverableTable from '../../src/components/tables/deliverables/DeliverableTable';
import DeliverableModal from '../../src/components/modal/deliverable';


function ProjectDetailPage() {
    const router = useRouter()
    const { id } = router.query

    const [openCalendar, setOpenCalendar] = useState(true)
    const [calendarHeight, setCalendarHeight] = useState('100vh')
    const [tabValue, setTabValue] = useState(0)
    const [error, isLoading, project] = useProjectDetailData(id)
    const [modalDeliverable, setModalDeliverable] = useState(null)

    const toggleCalendar = () => {
        setOpenCalendar(!openCalendar)
    }

    const onDeliverableRowClick = (deliverable) => {
        setModalDeliverable(deliverable)
    }

    const onCloseModal = () => {
        setModalDeliverable(null)
    }

    const getCalendarHeight = (deliverables) => {
        const vhPercentage = 100 + 10 * deliverables.length
        return `${vhPercentage}vh`
    }

    const handleDeliverableTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    useEffect(() => {
        if (project && !error && !isLoading) {
            setCalendarHeight(getCalendarHeight(project.deliverables ? project.deliverables : []))
        }
    }, [error, isLoading, project])

    return (
        <Base title="Detail Proyek">
            <Container maxWidth="lg">
                <DeliverableModal open={Boolean(modalDeliverable)} onClose={onCloseModal} deliverable={modalDeliverable} />
                <Grid container spacing={3} alignItems="stretch">
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper>
                            <ProjectSummary isLoading={isLoading} error={error} project={project} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <Card>
                            <Box>
                                <IconButton onClick={toggleCalendar}>
                                    {!openCalendar ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                                <Typography component="span" style={{ fontWeight: "bold" }}>Deliverable</Typography>
                            </Box>
                            <Collapse in={openCalendar}>
                                <Card elevation={2}>
                                    <Tabs value={tabValue} onChange={handleDeliverableTabChange}>
                                        <Tab label="Tabel" />
                                        <Tab label="Jadwal" />
                                    </Tabs>
                                </Card>
                                <Card style={{ overflowX: "scroll" }}>
                                    {tabValue == 0 && (
                                        <>
                                            <Box mt={2}>
                                                <DeliverableTable onRowClick={onDeliverableRowClick} isLoading={isLoading} deliverables={project && project.deliverables || []} />
                                            </Box>
                                        </>
                                    )}
                                    {tabValue == 1 && (
                                        <Box mt={2} style={{ height: calendarHeight, minWidth: 600, overflowX: "scroll" }}>
                                            <ProjectScheduler deliverables={project && project.deliverables || []} />
                                        </Box>
                                    )}
                                </Card>
                            </Collapse>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Base>
    )
}


function ProjectSummary({ error, project, isLoading }) {
    return (
        <Card elevation={2} style={{ minHeight: '20vh' }}>
            {isLoading && (<LinearProgress />)}
            {!error && !isLoading && project && (
                <Box p={2}>
                    <Typography component="h1" variant="h6" color="textPrimary" >{project.projectName}</Typography>
                    <Divider />
                    <Box mt={2}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography component="h5" variant="subtitle" color="textSecondary">Jadwal Mulai</Typography>
                                <Typography component="h2" variant="body1" >{project && moment(project.timelineStartDate).format("DD MMM YYYY")}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h5" variant="subtitle" color="textSecondary">Deadline</Typography>
                                <Typography component="h2" variant="body1">{project && moment(project.timelineEndDate).format("DD MMM YYYY")}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h5" variant="subtitle" color="textSecondary">Jumlah Item</Typography>
                                <Typography component="h2" variant="body1">{project && project.deliverableCount}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h5" variant="subtitle" color="textSecondary">Nilai Proyek</Typography>
                                <Typography component="h2" variant="body1">{getCurrency(project && project.projectValue)}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h5" variant="subtitle" color="textSecondary">Progress</Typography>
                                <Typography component="h2" variant="body1">{project && project.progress}%</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </Card>
    )
}

export default withAuthentication(ProjectDetailPage)