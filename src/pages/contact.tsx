import React from 'react';
import Layout from '@theme/Layout';
import styles from './contact.module.css';

const people = [
  {
    name: <>Johannes <br /> Lindgren</>,
    image: 'https://johannesl2.netlify.app/assets/image.webp',
    portfolio: 'https://johannesl2.netlify.app/',
    linkedin: 'https://www.linkedin.com/in/lindgren-johannes/',
    github: 'https://github.com/johannesL2',
    quote: '"Good code is its own best documentation." — Steve McConnell'
  },
  {
    name: 'Angelika Friis',
    image: '/img/person2.png',
    portfolio: 'person2@email.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    quote: ''
  },
  {
    name: 'Roza Belay',
    image: '/img/person3.png',
    portfolio: 'person3@email.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    quote: ''
  },
  {
    name: 'Ewa',
    image: '/img/person4.png',
    portfolio: 'person4@email.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    quote: ''
  },
];

export default function Contact() {
  return (
    <Layout title="Contact Us">
      <div className={styles.container}>

        <div className={styles.header}>
          <p className={styles.subtitle}>
            This project was developed as part of a LIA (Learning in Work) experience, where we designed and built a modular POS system with payments and hardware integration. The integration layer is built to be reusable and adaptable, meaning it can be connected to any POS application.
          </p>

          <h2 className={styles.title}>Meet the Team</h2>
        </div>

        <div className={styles.grid}>
          {people.map((person) => (
            <div key={person.name} className={styles.card}>
              <img
                src={person.image}
                alt={person.name}
                className={styles.image}
              />

              <h3 className={styles.name}>{person.name}</h3>
              <p className={styles.quote}>{person.quote}</p>

              <div className={styles.links}>
                <a href={person.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>

    
                <a href={person.portfolio} target="_blank" rel="noreferrer">
                  Portfolio
                </a>

                <a href={person.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}