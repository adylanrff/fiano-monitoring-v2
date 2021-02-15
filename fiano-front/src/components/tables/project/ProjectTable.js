import { LinearProgress } from "@material-ui/core";
import { useEffect } from "react";
import {useProjectData} from "../../../services/project/useProject";
import BaseTable from "../BaseTable";
import ProjectRow from "./ProjectRow";

const PROJECT_COLUMNS = ['Nama Proyek', 'Status Proyek', 'Jadwal Mulai', 'Deadline', '']

export default function ProjectTable() {
    
    const [error, isLoading, projects] = useProjectData()

    return (
        <>
            {isLoading && (<LinearProgress />)}
            {!isLoading && !error && (  
                <BaseTable
                    size="small"
                    columns={PROJECT_COLUMNS} 
                    data={projects} 
                    RowComponent={ProjectRow} 
                />
            )}
        </>
    )
}