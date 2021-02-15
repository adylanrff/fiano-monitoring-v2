import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import withDragDropContext from "../dnd/withDragDropContext";
import moment from 'moment';
import { useEffect } from 'react';
import { DeliverableEvent, deliverableEventStyleGetter} from './DeliverableEvent';
import Card from '@material-ui/core/Card'

const localizer = momentLocalizer(moment) // or globalizeLocalizer

function deliverableToEvent(deliverables) {
    return deliverables.reduce((allEvent, deliverable) => {
        return allEvent.concat(deliverable.schedule.map((s) => {
            return {
                title: `${s.scheduleType} | ${deliverable.section}-${deliverable.item}-${deliverable.subitem}`,
                ...s,
                deliverable: deliverable,
                start: moment(s.timelineStartDate).toDate(),
                end: moment(s.timelineEndDate).toDate(),
                allDay: false,
            }
        }))
    }, [])
}

function ProjectScheduler({ deliverables }) {
    
    useEffect(() => {
        console.log(deliverableToEvent(deliverables))
    }, [])

    return (
        <BigCalendar
            popup
            selectable
            showMultiDayTimes
            localizer={localizer}
            events={deliverableToEvent(deliverables)}
            startAccessor="start"
            endAccessor="end"
            onEventDrop={() => { }}
            resizable
            scrollToTime
            onShowMore={(events, date) => console.log(date)}
            defaultDate={moment().toDate()}
            defaultView='month'
            components={{
                event: DeliverableEvent,
            }}
            eventPropGetter={(deliverableEventStyleGetter)}
        />
    )
}

export default withDragAndDrop(ProjectScheduler)