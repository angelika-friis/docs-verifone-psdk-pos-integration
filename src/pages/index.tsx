import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const quickStart = [
  {
    step: '1',
    title: 'Import in Android Studio',
    text: 'Open the project in Android Studio and prepare the workspace before running the app module.',
  },
  {
    step: '2',
    title: 'Build and sync Gradle',
    text: 'Run a clean build, sync the Gradle files and make sure the app module is selected for launch.',
  },
  {
    step: '3',
    title: 'Install Payment SDK',
    text: 'Add the Verifone PaymentSDK AAR to app/libs so the integration layer can connect to the runtime.',
  },
];

const capabilities = [
  {
    title: 'Terminal emulation',
    text: 'Use the emulated terminal mode to test payment and refund flows without a physical device.',
  },
  {
    title: 'Integration contract',
    text: 'Keep the UI layer focused on PaymentContract while the integration module owns SDK setup and lifecycle.',
  },
  {
    title: 'Feature flags',
    text: 'Separate debug and release flags so temporary functionality stays easy to control and remove.',
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
              An Android reference app for Verifone Payment SDK with terminal
              emulation, refund support, feature flags and an integration layer
              built to keep UI and payment runtime separated.
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

          <div className={styles.heroPanel}>
            <p className={styles.heroPanelLabel}>Core flow</p>
            <Heading as="h2" className={styles.heroPanelTitle}>
              From setup to payment
            </Heading>
            <ul className={styles.flowList}>
              <li>Import the Android project and sync Gradle</li>
              <li>Install PaymentSDK-3.68.14.aar in app/libs</li>
              <li>Start the terminal and run payment or refund flows</li>
              <li>Print receipts and manage terminal teardown cleanly</li>
            </ul>
          </div>
        </section>

        <section className={styles.quickStartSection}>
          <div className={styles.sectionIntro}>
            <p className={styles.sectionEyebrow}>Quick start</p>
            <Heading as="h2">The first things a developer needs</Heading>
            <p>
              The zipped project already tells us what matters most: Android
              Studio setup, Gradle build, Payment SDK installation and emulator
              readiness.
            </p>
          </div>
          <div className={styles.quickStartGrid}>
            {quickStart.map((item) => (
              <article key={item.title} className={styles.card}>
                <p className={styles.stepBadge}>{item.step}</p>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cardGrid}>
          {capabilities.map((card) => (
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
