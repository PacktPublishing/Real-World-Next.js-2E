'use client'

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <>
      <button className="button">{children}</button>
      <style jsx>{`
        .button {
          padding: 1em;
          border-radius: 1em;
          border: none;
          background: green;
          color: white;
        }
      `}</style>
    </>
  )
}
