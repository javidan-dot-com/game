import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import StartingForm from '@/components/starting-form/starting-form'
import Image from 'next/image'

export default function Home() {
  const greeting = 'Welcome to '

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <h1 className={styles.intro__title}>{greeting}</h1>

            <Image
              src="/tic-tac-toe-logo.png"
              alt="Tic-Tac-Toe logo"
              width={300}
              height={300}
            />
          </div>

          <StartingForm />
        </div>
      </main>
    </>
  )
}
