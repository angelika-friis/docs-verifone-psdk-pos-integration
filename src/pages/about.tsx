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
<p className={styles.eyebrow}>WHAT WE BUILT</p>


<p>
  This project was developed during a LIA (Learning in Work) experience, where we designed and implemented POS system from scratch,
  covering architecture, payment flows, and core system behavior.
</p>

<p>
  We started with on-device payments using a terminal and later expanded into off-device flows to support more flexible business scenarios.
  The payment layer is built on a repository abstraction over an event-driven SDK, providing clean suspending operations,
  predictable transaction handling, and stable UI integration.
</p>

<p>
  The system supports advanced flows such as split payments and refunds
</p>

<p>
  Beyond payments, we integrated barcode scanning via the terminal SDK and external printing via Epson ePOS.
  On-device flows use terminal capabilities combined with our own logic, while off-device flows required additional custom implementations.
</p>

<p>
  We implemented our own receipt system instead of relying on terminal-generated receipts. It builds receipts from real transaction data,
  including products, variants, discounts, VAT, and payment details, and supports bank slips, barcodes, branding, and refund receipts.
</p>

<p>
  Product and order management is powered by a structured Room database, enabling reliable handling of variants, pricing logic,
  and full order lifecycle tracking.
</p>
          </div>
        
        </section>
      </main>
    </Layout>
  );
}
