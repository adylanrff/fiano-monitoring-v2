import { LinearProgress } from "@material-ui/core";
import BaseTable from "../BaseTable";
import DeliverableRow from "./DeliverableRow";

const PROJECT_COLUMNS = ['Nama Proyek', 'Status Proyek', 'Jadwal Mulai', 'Deadline', '']

export default function ProjectTable({ isLoading, deliverables }) {
    
    return (
        <>
            {isLoading && (<LinearProgress />)}
            {!isLoading && !error && (  
                <BaseTable
                    size="small"
                    columns={PROJECT_COLUMNS} 
                    data={deliverables} 
                    RowComponent={DeliverableRow} 
                />
            )}
        </>
    )
}