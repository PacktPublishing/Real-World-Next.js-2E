// Extracting a React component is usually better than @apply: it gives
// reusability, can encapsulate behaviour, accept props, and compose with other
// components. A CSS class can only handle the visual layer.
export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-4 py-2 bg-brand text-white font-medium rounded-lg
                 hover:bg-brand-dark transition-colors"
      {...props}
    >
      {children}
    </button>
  )
}
