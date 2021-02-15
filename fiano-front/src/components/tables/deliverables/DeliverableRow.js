import moment from 'moment'
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SaveIcon from "@material-ui/icons/Save";
import { useState } from "react";
import { goTo } from '../../../services/util';

export default function DeliverableRow({ data }) {

    const [isEdit, setIsEdit] = useState(false)

    return (
        <DataDeliverableRow data={data} editButtonHandler={() => setIsEdit(true)}/>
    )
}

function DataDeliverableRow({ data, editButtonHandler }) {
    const { 
        id,
        projectName,
        projectStatus,
        timelineStartDate,
        timelineEndDate
    } = data;

    const onClickHandler = (projectId) => () => {
        const projectDetailUrl = `/projects/${projectId}`
        goTo(projectDetailUrl)
    }

    return (
        <TableRow hover={true} onClick={onClickHandler(id)}>
            <TableCell align="center">
                {projectName}
            </TableCell>
            <TableCell align="center">
                <Chip
                    size="small"
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
                <IconButton onClick={editButtonHandler} color="primary">
                    <ChevronRightIcon/>
                </IconButton>
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