import { isIsoDate, type IsoDate } from './dates.types'

export const formatDateToIsoDate = (date: Date): IsoDate => {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  const isoDate = `${year}-${month}-${day}`

  if (!isIsoDate(isoDate)) {
    throw new Error(`Invalid ISO date generated: ${isoDate}`)
  }

  return isoDate
}
