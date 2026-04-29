import type {ReactNode} from 'react';
import React, {useEffect, useRef} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const highlights = [
  {
    step: '01',
    title: 'On-device payments',
    text: 'Keep the checkout inside the app for a fast card-present flow with a polished customer experience.',
  },
  {
    step: '02',
    title: 'Off-device terminal support',
    text: 'Pair with an external terminal when you need a stable, flexible setup in the field.',
  },
  {
    step: '03',
    title: 'Clean Android integration',
    text: 'Work through a clear SDK structure, Room database, Gradle build, and modular docs.',
  },
];

const flowSteps = [
  {
    step: '01',
    title: 'Start from the app docs',
    text: 'Follow the POS app documentation to set up Android Studio, Gradle, and the integration flow.',
  },
  {
    step: '02',
    title: 'Choose your payment mode',
    text: 'Use on-device checkout for in-app payments or off-device terminal handling for external processing.',
  },
  {
    step: '03',
    title: 'Test and ship confidently',
    text: 'Validate the user journey with the hero previews, feature pages, and integration guides.',
  },
];

export default function Home(): ReactNode {
  const homePageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const homePage = homePageRef.current;
    if (!homePage) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = homePage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      homePage.style.setProperty('--mouse-x', `${xPercent}%`);
      homePage.style.setProperty('--mouse-y', `${yPercent}%`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Layout title="POS App" description="Verifone-style POS payment integration docs for on-device and off-device flows.">
      <main ref={homePageRef} className={styles.homePage}>
        <section className={styles.heroSection}>
          <div className={styles.heroSectionInner}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>PAYMENT INTEGRATION PLATFORM</p>

              <Heading as="h1" className={styles.title}>
                Build a smooth payment experience for on-device and off-device flows.
              </Heading>

              <p className={styles.lead}>
                This POS app brings together the Android integration, terminal handling, and documentation you need to
                move from setup to real checkout flows with less friction.
              </p>

              <div className={styles.actions}>
                <Link className="button button--primary button--lg" to="/docs/app/intro">
                  Get started
                </Link>
                <Link className="button button--secondary button--lg" to="/about">
                  About us
                </Link>
              </div>

              <div className={styles.heroPills} aria-label="Key capabilities">
                <span>Android Studio</span>
                <span>Gradle</span>
                <span>Room</span>
                <span>Terminal flow</span>
              </div>
            </div>

            <div className={styles.heroVisuals}>
              <figure className={styles.visualCard}>
                <img src="/img/hero/off-device.png" alt="Off-device payment flow preview" />
                <figcaption className={styles.visualBadge}>
      <span className={styles.badgeIcon}>🖥️</span>
      Off-device
    </figcaption>
              </figure>

              <figure className={styles.visualCard}>
                <img src="/img/hero/on-device.png" alt="On-device payment flow preview" />
                <figcaption className={styles.visualBadge}>
      <span className={styles.badgeIcon}>📱</span>
      On-device
    </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>WHAT IT HELPS WITH</p>
            <Heading as="h2">A clearer path from documentation to checkout.</Heading>
          </div>

          <div className={styles.cardGrid}>
            {highlights.map((card) => (
              <article key={card.title} className={styles.card}>
                <span className={styles.stepBadge}>{card.step}</span>
                <Heading as="h3">{card.title}</Heading>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>HOW TO MOVE FORWARD</p>
            <Heading as="h2">Use the docs as a guided flow, not a wall of text.</Heading>
          </div>

          <div className={styles.stepGrid}>
            {flowSteps.map((item) => (
              <article key={item.title} className={styles.stepCard}>
                <span className={styles.stepBadge}>{item.step}</span>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <div>
              <p className={styles.sectionLabel}>NEXT STEP</p>
              <p className={styles.sectionLabelHeading}>Open the app docs and follow the integration chapters.</p>
              <p className={styles.sectionLabelText}>
                The app docs start with the intro page and then move into architecture, UI components, and database
                structure.
              </p>
            </div>
            <Link className="button button--primary button--lg" to="/docs/app/intro">
              Open app docs
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
