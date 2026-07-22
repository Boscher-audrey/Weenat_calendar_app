import './App.css'

import { useEffect, useState } from 'react'

import { CalendarGrid } from './components/CalendarGrid'
import { CalendarHeader } from './components/CalendarHeader'
import { EventForm } from './components/EventForm'
import { EventList } from './components/EventList'
import type { CalendarEvent } from './types/calendar.types'
import { formatDateToIsoDate } from './utils/dates'
import type { IsoDate } from './utils/dates.types'

function App() {
  const [displayedDate, setDisplayedDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<IsoDate | null>(null)
  const [eventTitleInput, setEventTitleInput] = useState<string>('')
  const [formVisible, setFormVisible] = useState<boolean>(false)
  const [calendarEvents, setCalendarEvents] = useState<Array<CalendarEvent>>(() => {
    const stored = localStorage.getItem('calendarEvents')
    if (!stored) return []
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents))
  }, [calendarEvents])

  const onChangeDate = (offsetMonth: number, offsetYear: number) => {
    setDisplayedDate(
      new Date(displayedDate.getFullYear() + offsetYear, displayedDate.getMonth() + offsetMonth, 1),
    )
  }

  const onDayClick = (day: number) => {
    const formatedDate = formatDateToIsoDate(
      new Date(displayedDate.getFullYear(), displayedDate.getMonth(), day),
    )

    setFormVisible(true)

    setSelectedDate(formatedDate)
  }

  const onChangeForm = (value: string) => {
    setEventTitleInput(value)
  }

  const onCreateCalendarEvent = () => {
    if (eventTitleInput !== '') {
      setCalendarEvents([
        ...calendarEvents,
        {
          id: crypto.randomUUID(),
          date: selectedDate ?? formatDateToIsoDate(displayedDate),
          title: eventTitleInput,
        },
      ])

      setSelectedDate(null)
      setEventTitleInput('')
      setFormVisible(false)
    }
  }

  const onDeleteCalendarEvent = (selectedCalendarEventId: string) => {
    setCalendarEvents(
      calendarEvents.filter((calendarEvent) => calendarEvent.id !== selectedCalendarEventId),
    )
  }

  return (
    <>
      <section id="center">
        <h1>Application de calendrier</h1>

        <CalendarHeader displayedDate={displayedDate} onChangeDate={onChangeDate} />

        <CalendarGrid
          displayedDate={displayedDate}
          calendarEvents={calendarEvents}
          onDayClick={onDayClick}
          onDeleteCalendarEvent={onDeleteCalendarEvent}
        />

        {formVisible ? (
          <EventForm
            eventTitleInput={eventTitleInput}
            onChangeForm={onChangeForm}
            onCreateCalendarEvent={onCreateCalendarEvent}
          />
        ) : null}

        {calendarEvents.length !== 0 ? <EventList calendarEvents={calendarEvents} /> : null}
      </section>
    </>
  )
}

export default App
