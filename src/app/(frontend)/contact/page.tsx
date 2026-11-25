export const metadata = { title: 'Contact Us' }

// Placeholder: set your real address in CONTACT_EMAIL (.env).
const email = process.env.CONTACT_EMAIL || 'hello@example.com'

const field = 'mt-1 block w-full border border-ink bg-paper px-3 py-2'

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>
}) {
  const { product } = await searchParams
  const subject = product ? `Enquiry about ${product}` : 'Enquiry'

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
      <p className="mt-4 text-mute">Questions about a product, sizes or delivery? Send us a message.</p>

      {/* mailto form: opens the visitor's email app. Swap for an API route if you need server-side delivery. */}
      <form action={`mailto:${email}`} method="post" encType="text/plain" className="mt-10 space-y-5">
        <input type="hidden" name="subject" value={subject} />
        <div>
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input id="name" name="name" autoComplete="name" required aria-required="true" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" type="email" name="email" autoComplete="email" required aria-required="true" className={field} />
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            aria-required="true"
            defaultValue={product ? `I'd like to know more about ${product}.` : ''}
            className={field}
          />
        </div>
        <button type="submit" className="bg-ink px-6 py-3 font-medium text-paper transition hover:bg-ink/85">
          Send message
        </button>
      </form>

      <p className="mt-8 text-sm text-mute">
        Or email{' '}
        <a className="text-ink underline underline-offset-4" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
    </div>
  )
}
