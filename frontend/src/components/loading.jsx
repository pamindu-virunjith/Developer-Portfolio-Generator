import React from 'react'

function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
    <div className="w-20 h-20 border-6 border-[hsl(var(--primary))] border-t-black rounded-full animate-spin"></div>
  </div>
  )
}

export default Loading