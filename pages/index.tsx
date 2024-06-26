import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import StartingForm from '@/components/starting-form/starting-form'
import Image from 'next/image'

export default function Home() {
  const greetingText = {
    beginning: 'Welcome to',
    end: 'game!',
  }

  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="description" content="Tic Tac Toe" />
        <link rel="icon" href="/logo-icon.ico" />
        <meta name="author" content="wwJavid" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <h1 className={styles.intro__title}>{greetingText.beginning}</h1>

            <Image
              src="/tic-tac-toe_logo.png"
              alt="Tic-Tac-Toe logo"
              width={300}
              height={300}
            />

            <h1 className={styles.intro__title}>{greetingText.end}</h1>
          </div>

          <StartingForm />
        </div>
      </main>
    </>
  )
}
