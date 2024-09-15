import { Ticket } from '@/lib/types'
import React from 'react'

const FormEditTicket = ({ticket}: {ticket: Ticket | null}) => {
  if (!ticket) return null

  return (
    <div>
      <h2>Ticket Information</h2>
      <p>ID: {ticket.id}</p>
      <p>Description: {ticket.description}</p>
      <p>Status: {ticket.status}</p>
    </div>
  )
}

export default FormEditTicket