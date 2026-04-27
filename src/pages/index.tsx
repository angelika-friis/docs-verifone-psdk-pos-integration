import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const cards = [
  {
    title: 'Get started faster',
    text: 'Bring onboarding, SDK installation and emulator setup together so new developers can get running without delays.',
  },
  {
    title: 'Understand the payment flow',
    text: 'Document startTerminal, pay, print and teardownTerminal with practical examples and troubleshooting notes.',
  },
  {
    title: 'Build a shared handbook',
    text: 'Use the site as living documentation for developers, testers and future contributors.',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="POS App"
      description="Documentation for the Verifone POS integration">
      <main className={styles.homePage}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>POS Documentation</p>
            <Heading as="h1" className={styles.title}>
              POS App
            </Heading>
            <p className={styles.lead}>
              Documentation for the Android project with Verifone Payment SDK,
              terminal emulation, feature flags and Android Studio setup.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/intro">
                Open documentation
              </Link>
              <Link className="button button--secondary button--lg" to="/blog">
                Read the blog
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.cardGrid}>
          {cards.map((card) => (
            <article key={card.title} className={styles.card}>
              <Heading as="h2">{card.title}</Heading>
              <p>{card.text}</p>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  );
}
