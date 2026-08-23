import styles from './Buttons.module.css'

export default function ButtonsPage() {
  return (
    <main style={{ display: 'flex', gap: '8px', padding: '24px' }}>
      <button className={styles['button-default']}>Default</button>
      <button className={styles['button-success']}>Success</button>
      <button className={styles['button-danger']}>Danger</button>
      <button className={styles['button-shared']}>Composed from base</button>
    </main>
  )
}
