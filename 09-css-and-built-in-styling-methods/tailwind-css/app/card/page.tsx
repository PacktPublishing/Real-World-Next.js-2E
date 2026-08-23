import { ProductCard } from '../components/product-card'
import { StatusBadge } from '../components/status-badge'
import { PrimaryButton } from '../components/primary-button'
import { ThemeToggle } from '../components/theme-toggle'

export default function CardPage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 space-y-6">
      <ThemeToggle />

      <ProductCard
        title="Anodized Keyboard"
        description="A responsive, theme-aware card built entirely from utility classes."
      />

      <div className="flex gap-2">
        <StatusBadge variant="success">In stock</StatusBadge>
        <StatusBadge variant="warning">Low stock</StatusBadge>
        <StatusBadge variant="error">Discontinued</StatusBadge>
      </div>

      <div className="flex gap-2">
        {/* The React component, and the @apply class it is preferred over */}
        <PrimaryButton>Add to cart</PrimaryButton>
        <button className="btn-primary">Add to cart (@apply)</button>
      </div>
    </main>
  )
}
