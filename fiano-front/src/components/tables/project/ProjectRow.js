import moment from 'moment'
import Link from 'next/link'
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SaveIcon from "@material-ui/icons/Save";
import { useEffect, useState } from "react";
import { goTo } from '../../../services/util';

export default function ProjectRow({ data }) {

    const [isEdit, setIsEdit] = useState(false)

    return (
        <DataProjectRow data={data} editButtonHandler={() => setIsEdit(true)}/>
    )
}

function DataProjectRow({ data, editButtonHandler }) {
    const { 
        id,
        projectName,
        projectStatus,
        timelineStartDate,
        timelineEndDate
    } = data;

    const projectDetailUrl = `/projects/${id}`

    return (
        <Link href={projectDetailUrl}>
            <TableRow style={{ cursor: "pointer" }} hover={true}>
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
        </Link>

    )
}

function EditProjectRow({ data, saveButtonHandler, }) {
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