import './EventModal.css'

import { useState } from 'react'

import type { IsoDate } from '../utils/dates.types'

type EventModalProps = {
  onCreateCalendarEvent: (title: string) => void
  onCloseModal: () => void
  selectedDate: IsoDate
}

export const EventModal = ({
  onCreateCalendarEvent,
  onCloseModal,
  selectedDate,
}: EventModalProps) => {
  const [eventTitleInput, setEventTitleInput] = useState<string>('')

  const onChangeForm = (value: string) => {
    setEventTitleInput(value)
  }

  const onSubmitForm = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    onCreateCalendarEvent(eventTitleInput)
  }

  return (
    <div className="event-modal" onClick={() => onCloseModal()}>
      <div className="event-modal-content" onClick={(event) => event.stopPropagation()}>
        <button className="event-modal-close" onClick={() => onCloseModal()} aria-label="Fermer">
          x
        </button>
        <h2>
          Créer un événement pour le{' '}
          {new Date(selectedDate).toLocaleString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </h2>

        <form onSubmit={(event) => onSubmitForm(event)}>
          <label className="sr-only" htmlFor="event-title">
            Titre de l'événement
          </label>
          <input
            autoFocus
            id="event-title"
            placeholder="Titre de l'événement"
            value={eventTitleInput}
            onChange={(event) => onChangeForm(event.target.value)}
          />

          <button type="submit">Créer</button>
        </form>
      </div>
    </div>
  )
}
