import moment from 'moment'
import { Paper, Grid, Typography, LinearProgress, Box, FormGroup, Divider, Button, Chip } from "@material-ui/core";
import { getCurrency } from "../../../services/util";
import EditIcon from "@material-ui/icons/Edit";

export default function DeliverableDetailData({ data, onEdit }) {

    return (
        <Paper>
            {data ? (
                <Box p={4} style={{ minHeight: 200 }}>
                    <FormGroup>
                        <Typography component="h1" variant="h6">Detil Deliverable</Typography>
                        <Divider />
                        <Grid container>
                            <Grid item xs={6}>
                                <Box my={2}>
                                    <Box my={1}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Section</Typography>
                                        <Typography component="h1" variant="body1">{data.section}</Typography>
                                    </Box>
                                    <Box my={1}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Item</Typography>
                                        <Typography component="h1" variant="body1">{data.item}</Typography>
                                    </Box>
                                    <Box my={1}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Subitem</Typography>
                                        <Typography component="h1" variant="body1">{data.subitem}</Typography>
                                    </Box>
                                    <Box my={1}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Harga</Typography>
                                        <Typography component="h1" variant="body1">{getCurrency(data.price)}</Typography>
                                    </Box>
                                    <Box my={1}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Jumlah</Typography>
                                        <Typography component="h1" variant="body1">{data.quantity}</Typography>
                                    </Box>
                                    <Box my={2}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Pekerja</Typography>
                                        {data && data.workers && data.workers.map((worker) => (<Chip label={worker.workerName} size="small" />))}
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box pl={2} my={2} borderLeft={1}>
                                    <Box my={2}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Status</Typography>
                                        <Chip label={data.deliverableStatus} size="small" />
                                    </Box>
                                    <Box my={2}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Jadwal mulai</Typography>
                                        <Typography component="h1" variant="body2">{moment(data.currentSchedule.timelineStartDate).format("DD MMM YYYY")}</Typography>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Jadwal selesai</Typography>
                                        <Typography component="h1" variant="body2">{moment(data.currentSchedule.timelineStartDate).format("DD MMM YYYY")}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box my={2}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Aktual mulai</Typography>
                                        <Typography component="h1" variant="body2">{moment(data.currentSchedule.timelineStartDate).format("DD MMM YYYY")}</Typography>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Aktual selesai</Typography>
                                        <Typography component="h1" variant="body2">{moment(data.currentSchedule.timelineStartDate).format("DD MMM YYYY")}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box justifyContent="right" my={1} textAlign="right">
                            <Box component="span">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    onClick={onEdit}>Edit</Button>
                            </Box>
                        </Box>
                    </FormGroup>
                </Box>
            ) : <LinearProgress />}
        </Paper>
    )
}

