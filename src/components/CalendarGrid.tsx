import type { CalendarEvent } from '../types/calendar.types'
import { formatDateToIsoDate } from '../utils/dates'
import { DayCell } from './DayCell'

type CalendarGridProps = {
  displayedDate: Date
  calendarEvents: Array<CalendarEvent>
  onDayClick: (day: number) => void
  onDeleteCalendarEvent: (id: string) => void
}

export const CalendarGrid = ({
  displayedDate,
  calendarEvents,
  onDayClick,
  onDeleteCalendarEvent,
}: CalendarGridProps) => {
  const daysInMonth = new Date(
    displayedDate.getFullYear(),
    displayedDate.getMonth() + 1,
    0,
  ).getDate()

  const emptyDaysBeforeFirstDayOfMonth: number =
    (new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 1).getDay() + 6) % 7

  const daysTitle = ['lu', 'ma', 'me', 'je', 've', 'sa', 'di']

  const getCalendarDays = () => {
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1)
    const emptyDays = []
    for (let i = 0; i < emptyDaysBeforeFirstDayOfMonth; i++) {
      emptyDays.push(null)
    }
    const weeks: Array<number | null> = [...emptyDays, ...days]

    return weeks
  }
  return (
    <div className="calendar">
      {daysTitle.map((dayTitle, dayTitleIndex) => (
        <div className="day-title" key={'dayTitle-' + dayTitleIndex}>
          {dayTitle}
        </div>
      ))}

      {getCalendarDays().map((day, dayIndex) => {
        if (day === null) {
          return <div className="day-empty" key={'day-empty-' + dayIndex} />
        }

        const calendarDayIsoDate = formatDateToIsoDate(
          new Date(displayedDate.getFullYear(), displayedDate.getMonth(), day),
        )
        const calendarEventsMatchingDay = calendarEvents.filter(
          (calendarEvent) => calendarEvent.date === calendarDayIsoDate,
        )

        return (
          <DayCell
            key={'day-' + dayIndex}
            day={day}
            calendarEventsMatchingDay={calendarEventsMatchingDay}
            onDayClick={onDayClick}
            onDeleteCalendarEvent={onDeleteCalendarEvent}
          />
        )
      })}
    </div>
  )
}
