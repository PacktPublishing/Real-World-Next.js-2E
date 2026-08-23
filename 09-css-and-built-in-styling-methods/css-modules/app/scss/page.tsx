import extended from './Buttons.module.scss'
import nested from './Button.module.scss'

export default function ScssPage() {
  return (
    <main style={{ display: 'grid', gap: '16px', padding: '24px' }}>
      <section style={{ display: 'flex', gap: '8px' }}>
        <h2>@extend</h2>
        <button className={extended['button-default']}>Default</button>
        <button className={extended['button-success']}>Success</button>
        <button className={extended['button-danger']}>Danger</button>
      </section>
      <section style={{ display: 'flex', gap: '8px' }}>
        <h2>Nesting</h2>
        <button className={nested.button}>Default</button>
        <button className={`${nested.button} ${nested.success}`}>
          Success
        </button>
        <button className={`${nested.button} ${nested.danger}`}>Danger</button>
      </section>
    </main>
  )
}
