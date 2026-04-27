import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const highlights = [
  'Android-app med betalfloden for POS',
  'Verifone Payment SDK och integrationer',
  'Setup-guide, terminalfloden och feature flags',
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="POS App"
      description="Dokumentation for Verifone POS-integrationen">
      <main className={styles.homePage}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Dokumentation</p>
            <Heading as="h1" className={styles.title}>
              POS App
            </Heading>
            <p className={styles.lead}>
              En samlad plats for Android-appen, Verifone Payment SDK,
              betalfloden och den tekniska setupen.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/intro">
                Las dokumentationen
              </Link>
              <Link className="button button--secondary button--lg" to="/blog">
                Blogg
              </Link>
            </div>
          </div>

          <div className={styles.infoCard}>
            <p className={styles.cardLabel}>Vad finns har?</p>
            <ul className={styles.featureList}>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
