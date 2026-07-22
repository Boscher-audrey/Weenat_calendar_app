import type { CalendarEvent } from '../types/calendar.types'

type EventListProps = {
  calendarEvents: Array<CalendarEvent>
}

export const EventList = ({ calendarEvents }: EventListProps) => {
  return (
    <div>
      <p>{calendarEvents.length} évenements :</p>
      <ul>
        {[...calendarEvents]
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((calendarEvent) => (
            <li className="event-list" key={calendarEvent.id}>
              Le{' '}
              {new Date(calendarEvent.date).toLocaleString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}{' '}
              : {calendarEvent.title}
            </li>
          ))}
      </ul>
    </div>
  )
}
