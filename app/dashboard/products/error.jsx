"use client"

export default function Error({ error, reset }) {
  return <div>
    <div>
      ERROR
    </div>
    <button onClick={() => reset()}>Try again</button>
  </div>
}