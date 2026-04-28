import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const quickStart = [
  { step: '01', title: 'Open project' },
  { step: '02', title: 'Install SDK' },
  { step: '03', title: 'Run app' },
];

const capabilities = [
  { title: 'Terminal emulation' },
  { title: 'Clean architecture' },
  { title: 'Feature flags' },
];

export default function Home(): ReactNode {
  return (
    <Layout title="POS App" description="Payment Integration Docs">
      <main className={styles.homePage}>

        {/* HERO */}
        <section className={styles.heroSection}>
          <div className={styles.heroSectionInner}>

            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>DEVELOPER PLATFORM</p>

              <Heading as="h1" className={styles.title}>
                Payment Integration Platform
              </Heading>

              <p className={styles.lead}>
                Build and run secure in-person payments using our Android SDK.
              </p>

              <div className={styles.actions}>
                <Link className="button button--primary button--lg" to="/docs/intro">
                  Get started
                </Link>
                <Link className="button button--secondary button--lg" to="/about">
                  About
                </Link>
              </div>
            </div>

            <div className={styles.heroPanel}>
              <Heading as="h2">Flow</Heading>
              <ul className={styles.flowList}>
                <li>Open project</li>
                <li>Install SDK</li>
                <li>Run app</li>
                <li>Start payment</li>
              </ul>
            </div>

          </div>
        </section>

        {/* QUICK START */}
        <section className={styles.section}>
          <Heading as="h2">Quick Start</Heading>

          <div className={styles.cardGrid}>
            {quickStart.map((item) => (
              <div key={item.title} className={styles.card}>
                <span className={styles.stepBadge}>{item.step}</span>
                <Heading as="h3">{item.title}</Heading>
              </div>
            ))}
          </div>
        </section>

        {/* DEVICE */}
        <section className={styles.section}>
          <Heading as="h2">Device testing</Heading>

          <div className={styles.imageGrid}>
            <div className={styles.imageCard}>
              <p>On device</p>
            </div>

            <div className={styles.imageCard}>
              <p>Off Device</p>
            </div>
          </div>
        </section>

        {/* ENV */}
        <section className={styles.envSection}>
          <Heading as="h2">Environment</Heading>

        <ul>
  <li>Android Studio </li>
  <li>Gradle Build </li>
  <li>Payment SDK </li>
  <li>RoomDatabase</li>
  <li>Terminal configuration (on & off-device)</li>
</ul>
        </section>

        {/* FEATURES */}
        <section className={styles.section}>
          <div className={styles.cardGrid}>
            {capabilities.map((card) => (
              <div key={card.title} className={styles.card}>
                <Heading as="h3">{card.title}</Heading>
              </div>
            ))}
          </div>
        </section>

      </main>
    </Layout>
  );
}