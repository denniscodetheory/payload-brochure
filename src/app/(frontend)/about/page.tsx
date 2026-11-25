export const metadata = { title: 'About Us' }

// Placeholder copy: replace with Den Modular's real story before launch.
const points = [
  ['Modular by design', 'Every cabinet, bed base and rack is a module with standard widths, so pieces fit together and can be rearranged.'],
  ['Made to be changed', 'Add a unit, swap a finish or move a set to a new room without starting over.'],
  ['Simple to plan', 'Fewer parts and clear dimensions make it easier to measure the room and choose the right set.'],
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">About Us</h1>
      <p className="mt-6 text-lg">
        Den Modular makes modular furniture for the kitchen, bedroom and living room. This page is
        placeholder text: replace it with your company story, location and team.
      </p>
      <ul className="mt-12 grid gap-8 border-t border-ink pt-10 sm:grid-cols-3">
        {points.map(([t, d]) => (
          <li key={t} className="reveal">
            <h2 className="font-bold">{t}</h2>
            <p className="mt-2 text-sm text-mute">{d}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
