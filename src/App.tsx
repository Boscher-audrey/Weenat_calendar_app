import './App.css'

import { useState } from 'react'

declare const isoDateType: unique symbol
export type IsoDate = string & { [isoDateType]: true }

type CalendarEvent = {
  id: string
  date: IsoDate
  title: string
}

function App() {
  const [displayedDate, setDisplayedDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<IsoDate | null>(null)
  const [calendarEvents, setCalendarEvents] = useState<Array<CalendarEvent>>([])
  const [creatingEventInput, setCreatingEventInput] = useState<string>('')
  const [formVisible, setFormVisible] = useState<boolean>(false)

  const daysInMonth = new Date(
    displayedDate.getFullYear(),
    displayedDate.getMonth() + 1,
    0,
  ).getDate()

  const emptyDaysBeforeFirstDayOfMonth: number =
    (new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 1).getDay() + 6) % 7

  const changeDate = (offsetMonth: number, offsetYear: number) => {
    setDisplayedDate(
      new Date(displayedDate.getFullYear() + offsetYear, displayedDate.getMonth() + offsetMonth, 1),
    )
  }

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

  const formatDateToIsoDate = (date: Date): IsoDate => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${date.getFullYear()}-${month}-${day}` as IsoDate
  }

  const daysOnClick = (day: number) => {
    const formatedDate = formatDateToIsoDate(
      new Date(displayedDate.getFullYear(), displayedDate.getMonth(), day),
    )

    setFormVisible(true)

    setSelectedDate(formatedDate)
  }

  const formOnChange = (value: string) => {
    setCreatingEventInput(value)
  }

  const onCreateCalendarEvent = () => {
    setCalendarEvents([
      ...calendarEvents,
      {
        id: crypto.randomUUID(),
        date: selectedDate ?? formatDateToIsoDate(displayedDate),
        title: creatingEventInput,
      },
    ])

    setSelectedDate(null)
    setCreatingEventInput('')
    setFormVisible(false)
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Application de calendrier</h1>
          <div className="date-container">
            <button onClick={() => changeDate(-1, 0)}>{'<'}</button>
            <p className="month">{displayedDate.toLocaleString('fr-FR', { month: 'long' })}</p>
            <button onClick={() => changeDate(1, 0)}>{'>'}</button>
          </div>

          <div className="date-container">
            <button onClick={() => changeDate(0, -1)}>{'<'}</button>
            <p>{displayedDate.toLocaleString('fr-FR', { year: 'numeric' })}</p>
            <button onClick={() => changeDate(0, 1)}>{'>'}</button>
          </div>
        </div>

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
              <div className="day" key={'day-' + dayIndex} onClick={() => daysOnClick(day)}>
                {day}
                {calendarEventsMatchingDay.length !== 0 ? (
                  <div>
                    {calendarEventsMatchingDay.map((calendarEventMatchingDay, eventIndex) => (
                      <p key={eventIndex}>{calendarEventMatchingDay.title}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        {formVisible ? (
          <div>
            <input onChange={(event) => formOnChange(event.target.value)}></input>
            <button onClick={() => onCreateCalendarEvent()}>Créer</button>
          </div>
        ) : null}

        {calendarEvents.length !== 0 ? (
          <div>
            <p>{calendarEvents.length} évenements :</p>
            <ul>
              {[...calendarEvents]
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((calendarEvent) => (
                  <li key={calendarEvent.id}>
                    Le{' '}
                    {new Date(calendarEvent.date).toLocaleString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                    })}
                    : {calendarEvent.title}
                  </li>
                ))}
            </ul>
          </div>
        ) : null}
      </section>
    </>
  )
}

export default App
