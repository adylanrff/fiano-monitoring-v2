import { Container, makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useState } from "react";
import DeliverableDetailData from "./DeliverableDetailData";
import DeliverableDetailEdit from "./DeliverableDetailEdit";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: '0',
    },
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '0px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
}));

export default function DeliverableModal({ deliverable, open, onClose }) {
    const [isEdit, setIsEdit] = useState(false)
    const classes = useStyles()

    const onEditHandler = () => {
        setIsEdit(true)
    }

    const onCloseHandler = () => {
        setIsEdit(false)
        onClose()
    }

    const onSaveHandler = () => {
        setIsEdit(false)
    }

    return (
        <Modal open={open} onClose={onCloseHandler} closeAfterTransition className={classes.modal}>
            <Container disableGutters maxWidth="xs">
                {!isEdit && <DeliverableDetailData data={deliverable} onEdit={onEditHandler} />}
                {isEdit && <DeliverableDetailEdit data={deliverable} onSave={onSaveHandler}/>}
            </Container>
        </Modal>
    )
}
