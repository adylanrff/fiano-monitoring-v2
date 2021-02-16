import { LinearProgress } from "@material-ui/core";
import BaseTable from "../BaseTable";
import DeliverableRow from "./DeliverableRow";

const DELIVERABLE_COLUMNS = ['Nama', 'Pekerja','Tahap Pengerjaan', 'Waktu Mulai', 'Waktu Selesai', '']

export default function DeliverableTable({ isLoading, deliverables, onRowClick }) {
    
    return (
        <>
            {isLoading && (<LinearProgress />)}
            {!isLoading && (  
                <BaseTable
                    size="small"
                    onRowClick={onRowClick}
                    columns={DELIVERABLE_COLUMNS} 
                    data={deliverables} 
                    RowComponent={DeliverableRow} 
                />
            )}
        </>
    )
}