import moment from 'moment'
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SaveIcon from "@material-ui/icons/Save";
import { useState } from "react";
import Divider from '@material-ui/core/Divider';
import theme from '../../../theme';
import { Typography } from '@material-ui/core';

export default function DeliverableRow({ data, onRowClick }) {

    const [isEdit, setIsEdit] = useState(false)

    return (
        <DataDeliverableRow key={data.id} onRowClick={onRowClick} data={data} editButtonHandler={() => setIsEdit(true)}/>
    )
}

function DataDeliverableRow({ data, onRowClick }) {
    const { 
        id,
        section,
        item,
        subitem,
        deliverableStatus,
        workers, 
        currentSchedule
    } = data;

    const onClickHandler = (deliverable) => () => {
        onRowClick(deliverable)
    }

    return (
        <TableRow hover={true} onClick={onClickHandler(data)} style={{ cursor: 'pointer'}}>
            <TableCell key="title" align="center">
                {section} | {item} | {subitem}
            </TableCell>
            <TableCell key="worker" align="center" style={{ width: 200 }}>
                {workers.map((worker) => <Chip size="small" label={worker.workerName} style={{ margin: 2 }}/>)}
            </TableCell>
            <TableCell key="status" align="center">
                <Chip
                    size="small"
                    label={deliverableStatus}
                />
            </TableCell>
            <TableCell key="startSchedule" align="center">
                {currentSchedule && <JadwalCell startDate={currentSchedule.timelineStartDate} actualDate={currentSchedule.actualStartDate}/>}
            </TableCell>
            <TableCell key="endSchedule" align="center">
                {currentSchedule && <JadwalCell startDate={currentSchedule.timelineEndDate} actualDate={currentSchedule.actualEndDate}/>}
            </TableCell>
            <TableCell key="button" align="center">
                <ChevronRightIcon/>
            </TableCell>
        </TableRow>
    )
}

function EditDeliverableRow({ data, saveButtonHandler, }) {
    const {
        projectName,
        projectStatus,
        timelineStartDate,
        timelineEndDate
    } = data;

    return (
        <TableRow hover={true}>
            <TableCell align="center">
                {projectName}
            </TableCell>
            <TableCell align="center">
                <Chip
                    label={projectStatus}
                />
            </TableCell>
            <TableCell align="center">
                {moment(timelineStartDate).format("DD MMM YYYY")}
            </TableCell>
            <TableCell align="center">
                {moment(timelineEndDate).format("DD MMM YYYY")}
            </TableCell>
            <TableCell align="center">
                <IconButton onClick={saveButtonHandler}>
                    <SaveIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

function JadwalCell({ date, actualDate, realization }) {
    const actualColor = realization >= 0 ? theme.palette.success.main : theme.palette.error.main

    return (                    
        <>
            <Typography variant="body2" color="textPrimary">
                <Typography component="span" variant="body2" style={{ fontWeight: 'bold'}}>Jadwal:</Typography> {moment(date).format("DD MMM YYYY")}
            </Typography>
            {actualDate && (
                <>
                    <Divider /> 
                    <Typography 
                        variant="body2" 
                        style={{color: actualColor }}
                    >
                        <Typography variant="body" style={{fontWeight: 'bold'}}>Aktual: </Typography>
                        {moment(actualDate).format("DD MMM YYYY")}
                    </Typography>
                </>
            )}
        </>
    )
}