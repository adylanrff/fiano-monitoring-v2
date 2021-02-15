import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import { Chip, Typography } from '@material-ui/core'

export function DeliverableEvent({ event }) {

    const title = [event.deliverable.section, event.deliverable.item, event.deliverable.subitem].filter((e) => e).join('|')

    return (
        <Card elevation={4} style={{ backgroundColor: "teal" }} onClick={() => alert(event.title)}>
            <Box>
                <Typography component="span" style={{ color: "white", fontSize: "0.75rem", backgroundColor: "grey", padding: 5 }}> {event.scheduleType}</Typography>
                <Typography component="span" style={{ color: "white", fontSize: "0.9rem" }}>   {title}</Typography>
            </Box>
        </Card>
    )
}

export function deliverableEventStyleGetter(event, start, end, isSelected) {
    console.log(event.title)
    var backgroundColor = event.hexColor ? '#' + event.hexColor : "#ffffff";
    var style = {
        backgroundColor: backgroundColor,
        border: '1px',
        borderRadius: '5%',
        opacity: 1
    };

    if (isSelected) {
        style.opacity = 0.75
    }

    return {
        style: style
    };
}
