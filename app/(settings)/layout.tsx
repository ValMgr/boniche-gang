import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div >
      {children}
    </div>
  )
}
