import React from 'react'

function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default LoadingPage