import './App.css'

import { useCallback, useEffect, useState } from 'react'

import { CalendarGrid } from './components/CalendarGrid'
import { CalendarHeader } from './components/CalendarHeader'
import { EventList } from './components/EventList'
import { EventModal } from './components/EventModal'
import type { CalendarEvent } from './types/calendar.types'
import { formatDateToIsoDate } from './utils/dates'
import type { IsoDate } from './utils/dates.types'

function App() {
  const [displayedDate, setDisplayedDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<IsoDate | null>(null)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
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

  const onCloseModal = useCallback(() => {
    setModalVisible(false)
    setSelectedDate(null)
  }, [])

  useEffect(() => {
    // Close modal on escape key press
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseModal()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onCloseModal])

  const onChangeDate = (offsetMonth: number, offsetYear: number) => {
    setDisplayedDate(
      new Date(displayedDate.getFullYear() + offsetYear, displayedDate.getMonth() + offsetMonth, 1),
    )
  }

  const onDayClick = (day: number) => {
    const formatedDate = formatDateToIsoDate(
      new Date(displayedDate.getFullYear(), displayedDate.getMonth(), day),
    )

    setSelectedDate(formatedDate)
    setModalVisible(true)
  }

  const onCreateCalendarEvent = (title: string) => {
    if (title !== '') {
      setCalendarEvents([
        ...calendarEvents,
        {
          id: crypto.randomUUID(),
          date: selectedDate ?? formatDateToIsoDate(displayedDate),
          title,
        },
      ])

      setSelectedDate(null)
      setModalVisible(false)
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

        {modalVisible ? (
          <EventModal
            onCreateCalendarEvent={onCreateCalendarEvent}
            onCloseModal={onCloseModal}
            selectedDate={selectedDate ?? formatDateToIsoDate(displayedDate)}
          />
        ) : null}

        {calendarEvents.length !== 0 ? <EventList calendarEvents={calendarEvents} /> : null}
      </section>
    </>
  )
}

export default App
