type EventFormProps = {
  eventTitleInput: string
  onChangeForm: (value: string) => void
  onCreateCalendarEvent: () => void
}

export const EventForm = ({
  eventTitleInput,
  onChangeForm,
  onCreateCalendarEvent,
}: EventFormProps) => {
  return (
    <div>
      <input value={eventTitleInput} onChange={(event) => onChangeForm(event.target.value)}></input>
      <button onClick={() => onCreateCalendarEvent()}>Créer</button>
    </div>
  )
}
