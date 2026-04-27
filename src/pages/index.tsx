import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const cards = [
  {
    title: 'Kom igang snabbare',
    text: 'Samla onboarding, SDK-installation och emulatorsteg sa att nya utvecklare kan starta utan att fastna.',
  },
  {
    title: 'Forsta betalflodet',
    text: 'Beskriv startTerminal, pay, print och teardownTerminal med tydliga exempel och felsokning.',
  },
  {
    title: 'Bygg en gemensam handbok',
    text: 'Anvand sajten som levande dokumentation for utvecklare, testare och framtida contributors.',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="POS App"
      description="Dokumentation for Verifone POS-integrationen">
      <main className={styles.homePage}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>POS Documentation</p>
            <Heading as="h1" className={styles.title}>
              POS App
            </Heading>
            <p className={styles.lead}>
              En snygg och tydlig startsida for Android-appen, Verifone Payment
              SDK och allt teamet behover for att komma igang och bygga vidare.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/intro">
                Oppna dokumentationen
              </Link>
              <Link className="button button--secondary button--lg" to="/blog">
                Las bloggen
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
