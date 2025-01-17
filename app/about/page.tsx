"use client";

import Link from 'next/link';

export default function About() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav style={{
        width: '200px',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <Link href="/" style={{
          padding: '10px',
          textDecoration: 'none',
          color: '#333',
          borderRadius: '4px',
          backgroundColor: '#fff'
        }}>
          Home
        </Link>
        <Link href="/about" style={{
          padding: '10px',
          textDecoration: 'none',
          color: '#333',
          borderRadius: '4px',
          backgroundColor: '#fff'
        }}>
          About
        </Link>
        <Link href="/data" style={{
          padding: '10px',
          textDecoration: 'none',
          color: '#333',
          borderRadius: '4px',
          backgroundColor: '#fff'
        }}>
          Data
        </Link>
      </nav>
      <main style={{
        flex: 1,
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1>À Propos</h1>
        <div style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <h2>L&apos;Acanthaster planci : Une menace pour nos récifs</h2>
          <p>
            L&apos;Acanthaster planci, également connue sous le nom d&apos;étoile de mer couronne d&apos;épines,
            est l&apos;un des prédateurs les plus destructeurs des récifs coralliens du Pacifique.
          </p>

          <h3>Notre Mission</h3>
          <p>
            Cette application a été développée pour aider les chercheurs et les gestionnaires
            d&apos;aires marines protégées à :
          </p>
          <ul>
            <li>Localiser précisément les populations d&apos;acanthasters</li>
            <li>Suivre leur distribution et leur densité</li>
            <li>Coordonner les efforts d&apos;élimination</li>
            <li>Protéger efficacement nos récifs coralliens</li>
          </ul>

          <h3>Comment Utiliser l&apos;Application</h3>
          <p>
            Lors de vos observations en mer, cliquez simplement sur la carte pour signaler
            la présence d&apos;acanthasters. Indiquez le nombre d&apos;individus observés et
            votre niveau de certitude. Ces données sont essentielles pour organiser les
            campagnes d&apos;éradication.
          </p>
        </div>
      </main>
    </div>
  );
}
