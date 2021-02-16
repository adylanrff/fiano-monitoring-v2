import { Paper, Grid, Typography, LinearProgress, Box, FormGroup, Divider, Button, TextField, Select, Chip, Input, makeStyles } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from "@material-ui/icons/Save";
import { useEffect, useState } from "react";
import { useWorkersData } from "../../../services/project/useProject";
import { DELIVERABLE_STATUS_CHOICES } from './constants'
import moment from 'moment'
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

export default function DeliverableEditData({ data, onSave }) {
    const [section, setSection] = useState(data.section || '')
    const [item, setItem] = useState(data.item || '')
    const [subitem, setSubitem] = useState(data.subitem || '')
    const [price, setPrice] = useState(data.price || 0)
    const [quantity, setQuantity] = useState(data.quantity || 0)
    const [workerIds, setWorkerIds] = useState(data.workers.map((worker) => worker.id) || [])
    const [status, setStatus] = useState(data.deliverableStatus || 0)

    const [workerError, workerLoading, allWorkers] = useWorkersData()

    const getWorkerById = (workerId) => {
        return allWorkers.filter((worker) => worker.id == workerId)[0]
    }

    const handleWorkerChange = (event) => {
        setWorkerIds(event.target.value);
    };

    const onSaveHandler = () => {
        onSave().then()
    }

    const classes = useStyles();

    return (
        <Paper>
            {data ? (
                <Box p={4} style={{ minHeight: 200 }}>
                    <FormGroup>
                        <Typography component="h1" variant="h6">Detil Deliverable</Typography>
                        <Divider />
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <Box my={2}>
                                    <Box my={1}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Section</Typography>
                                        <TextField fullWidth size="small" value={section} onChange={(e) => setSection(e.currentTarget.value)} />
                                    </Box>
                                    <Box my={1}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Item</Typography>
                                        <TextField size="small" value={item} onChange={(e) => setItem(e.currentTarget.value)} />
                                    </Box>
                                    <Box my={1}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Subitem</Typography>
                                        <TextField size="small" value={subitem} onChange={(e) => setSubitem(e.currentTarget.value)} />
                                    </Box>
                                    <Box my={1}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Harga</Typography>
                                        <TextField size="small" type="number" value={price} onChange={(e) => setPrice(e.currentTarget.value)} />
                                    </Box>
                                    <Box my={1}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Jumlah</Typography>
                                        <TextField size="small" type="number" value={quantity} onChange={(e) => setQuantity(e.currentTarget.value)} />
                                    </Box>
                                    <Box my={2}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Pekerja</Typography>
                                        {!workerLoading && allWorkers.length > 0 && (
                                            <Select
                                                multiple
                                                value={workerIds}
                                                onChange={handleWorkerChange}
                                                input={<Input id="select-multiple-chip" />}
                                                renderValue={(selected) => (
                                                    <div className={classes.chips}>
                                                        {selected.map((workerId) => (<Chip size="small" key={workerId} label={getWorkerById(workerId).workerName} />))}
                                                    </div>
                                                )}
                                            >
                                                {allWorkers.map((worker) => <MenuItem key={worker.id} value={worker.id}>{worker.workerName}</MenuItem>)}
                                            </Select>
                                        )}
                                        {workerLoading && (<LinearProgress />)}
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box my={2} >
                                    <Box my={1}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Status</Typography>
                                        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                            {DELIVERABLE_STATUS_CHOICES.map((choice) => <MenuItem value={choice}>{choice}</MenuItem>)}
                                        </Select>
                                    </Box>
                                    <Box my={2}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Jadwal mulai</Typography>
                                        <KeyboardDatePicker value={moment(data.currentSchedule.timelineStartDate).toDate()} format="DD MMM YY"/>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Jadwal selesai</Typography>
                                        <KeyboardDatePicker format="DD MMM YY" />
                                    </Box>
                                    <Box my={2}>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Aktual mulai</Typography>
                                        <KeyboardDatePicker format="DD MMM YY"/>
                                        <Typography component="h5" variant="subtitle" color="textSecondary">Aktual selesai</Typography>
                                        <KeyboardDatePicker format="DD MMM YY"/>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box justifyContent="right" my={1} textAlign="right">
                            <Box component="span">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    startIcon={<SaveIcon />}
                                    onClick={onSave}>
                                    Save
                                    </Button>
                            </Box>
                        </Box>
                    </FormGroup>
                </Box>
            ) : <LinearProgress />
            }
        </Paper >
    )
}

