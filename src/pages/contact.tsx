import React from 'react';
import Layout from '@theme/Layout';
import styles from './contact.module.css';

const people = [
  {
    name: 'Johannes',
    image: '/img/person1.png',
    email: 'person1@email.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Angelika Friis',
    image: '/img/person2.png',
    email: 'person2@email.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Roza Belay',
    image: '/img/person3.png',
    email: 'person3@email.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Ewa',
    image: '/img/person4.png',
    email: 'person4@email.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
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
              <p className={styles.email}>{person.email}</p>

              <div className={styles.links}>
                <a href={person.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={`mailto:${person.email}`}>
                  Email
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