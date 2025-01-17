"use client";

import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Navbar />
      <main style={{
        flex: 1,
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#fff",
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          color: "#1a365d",
          marginBottom: "2rem",
          borderBottom: "2px solid #e2e8f0",
          paddingBottom: "0.5rem"
        }}>À Propos</h1>

        <div style={{ fontSize: "16px", lineHeight: "1.8" }}>
          <h2 style={{
            fontSize: "2rem",
            color: "#2d3748",
            marginTop: "2rem",
            marginBottom: "1rem"
          }}>L&apos;Acanthaster planci : Une menace pour nos récifs</h2>

          <p style={{
            fontSize: "1.1rem",
            color: "#4a5568",
            marginBottom: "1.5rem"
          }}>
            L&apos;Acanthaster planci, également connue sous le nom
            d&apos;étoile de mer couronne d&apos;épines, est l&apos;un des
            prédateurs les plus destructeurs des récifs coralliens du Pacifique.
          </p>

          <h3 style={{
            fontSize: "1.5rem",
            color: "#2d3748",
            marginTop: "2rem",
            marginBottom: "1rem"
          }}>Notre Mission</h3>

          <p style={{
            fontSize: "1.1rem",
            color: "#4a5568",
            marginBottom: "1rem"
          }}>
            Cette application a été développée pour aider les chercheurs et les
            gestionnaires d&apos;aires marines protégées à :
          </p>

          <ul style={{
            listStyle: "none",
            padding: "0",
            margin: "1rem 0"
          }}>
            {[
              "Localiser précisément les populations d'acanthasters",
              "Suivre leur distribution et leur densité",
              "Coordonner les efforts d'élimination",
              "Protéger efficacement nos récifs coralliens"
            ].map((item, index) => (
              <li key={index} style={{
                padding: "0.5rem 0",
                marginBottom: "0.5rem",
                paddingLeft: "1.5rem",
                position: "relative",
                color: "#4a5568",
                fontSize: "1.1rem"
              }}>
                <span style={{
                  position: "absolute",
                  left: 0,
                  color: "#3182ce"
                }}>•</span>
                {item}
              </li>
            ))}
          </ul>

          <h3 style={{
            fontSize: "1.5rem",
            color: "#2d3748",
            marginTop: "2rem",
            marginBottom: "1rem"
          }}>Comment Utiliser l&apos;Application</h3>

          <p style={{
            fontSize: "1.1rem",
            color: "#4a5568",
            marginBottom: "1.5rem",
            padding: "1rem",
            backgroundColor: "#f7fafc",
            borderRadius: "8px",
            border: "1px solid #e2e8f0"
          }}>
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
