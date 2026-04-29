import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './about.module.css';

const pillars = [
  {
    title: 'Built for payment flows',
    text: 'The project focuses on the user journey around on-device and off-device payment handling.',
  },
  {
    title: 'Clear documentation structure',
    text: 'The docs are organized so you can move from intro to architecture, UI components, and database notes.',
  },
  {
    title: 'Practical Android setup',
    text: 'The stack is centered on Android Studio, Gradle, Room, and integration steps that are easy to follow.',
  },
];

export default function AboutPage(): ReactNode {
  return (
    <Layout title="About us" description="About the POS app and the integration focus behind the documentation.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>ABOUT US</p>
         <Heading as="h1">
  Integrating POS systems, payment terminals, and business logic into one consistent flow.
</Heading>
          <p>
            This project is a focused POS documentation site for developers working with terminal and in-app payment
            flows. The goal is to make the app, the integration layer, and the supporting docs feel consistent.
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" to="/docs/app/intro">
              Read the app docs
            </Link>
            <Link className="button button--secondary button--lg" to="/">
              Back to home
            </Link>
          </div>
        </section>

        <section className={styles.grid}>
          {pillars.map((item) => (
            <article key={item.title} className={styles.card}>
              <Heading as="h2">{item.title}</Heading>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className={styles.banner}>
          <div>
            <p className={styles.eyebrow}>WHAT TO EXPECT</p>
            <Heading as="h3">A calm structure, a consistent color system, and a better starting point for the app.</Heading>
          </div>
          <div style={{ marginTop: '2rem' }}>
 <Link className="button button--primary button--lg" to="/docs/app/architecture">
  Explore architecture
</Link>
</div>
        </section>
      </main>
    </Layout>
  );
}
