// The card as the chapter leaves it: responsive padding and type through the
// md:/lg: prefixes, and a dark: counterpart for every colour utility.
export function ProductCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="p-4 md:p-8 lg:p-12 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
      <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}
