import type { CalendarEvent } from '../types/calendar.types'

type DayCellProps = {
  day: number
  calendarEventsMatchingDay: Array<CalendarEvent>
  onDayClick: (day: number) => void
  onDeleteCalendarEvent: (id: string) => void
}

export const DayCell = ({
  day,
  calendarEventsMatchingDay,
  onDayClick,
  onDeleteCalendarEvent,
}: DayCellProps) => {
  return (
    <div className="day" onClick={() => onDayClick(day)}>
      {day}
      {calendarEventsMatchingDay.length !== 0 ? (
        <div>
          {calendarEventsMatchingDay.slice(0, 2).map((calendarEventMatchingDay) => (
            <p className="event-day" key={calendarEventMatchingDay.id}>
              <span className="event-title">{calendarEventMatchingDay.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteCalendarEvent(calendarEventMatchingDay.id)
                }}
                className="delete-event-button"
              >
                x
              </button>
            </p>
          ))}
          {calendarEventsMatchingDay.length > 2 ? (
            <p className="event-day">+ {calendarEventsMatchingDay.length - 2} autres</p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
