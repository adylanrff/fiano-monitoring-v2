import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

export default function BaseTable(props) {

    const { columns, data, RowComponent, size } = props

    return (
        <TableContainer component={Paper}>
            <Table width="auto" size={size}>
                <TableHead>
                    <TableRow>
                        {columns.map((column => <TableCell align="center" key={column}>{column}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map(((row, id) => (
                        <RowComponent key={id} data={row} />
                    )))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}