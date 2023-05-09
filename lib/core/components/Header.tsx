import React from 'react'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 md:p-10 w-screen">
      <h1 className="text-2xl font-bold">Boniche Gang</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/sign-in">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
