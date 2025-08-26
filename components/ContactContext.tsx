'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface ContactContextType {
  isContactDialogOpen: boolean
  prefilledMachine: string | undefined
  openContactDialog: (prefilledMachine?: string) => void
  closeContactDialog: () => void
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [prefilledMachine, setPrefilledMachine] = useState<string | undefined>(undefined)

  const openContactDialog = (machineName?: string) => {
    setPrefilledMachine(machineName)
    setIsContactDialogOpen(true)
  }

  const closeContactDialog = () => {
    setIsContactDialogOpen(false)
    setPrefilledMachine(undefined)
  }

  return (
    <ContactContext.Provider value={{
      isContactDialogOpen,
      prefilledMachine,
      openContactDialog,
      closeContactDialog
    }}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContact() {
  const context = useContext(ContactContext)
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider')
  }
  return context
}
