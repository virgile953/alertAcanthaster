"use client";

import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen flex md:flex-row flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 p-4 md:ml-[200px] mt-[60px] md:mt-0">
        <h1 className="
          text-[clamp(1.5rem,5vw,2.5rem)]
          text-blue-900 dark:text-blue-100
          mb-6
          border-b-2
          border-gray-200 dark:border-gray-700
          pb-2
        ">
          À Propos
        </h1>

        <div className="text-[clamp(14px,4vw,16px)] leading-relaxed">
          <h2 className="
            text-[clamp(1.2rem,4vw,2rem)]
            text-gray-700 dark:text-gray-200
            mt-6
            mb-4
          ">
            L&apos;Acanthaster planci : Une menace pour nos récifs
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            L&apos;Acanthaster planci, également connue sous le nom
            d&apos;étoile de mer couronne d&apos;épines, est l&apos;un des
            prédateurs les plus destructeurs des récifs coralliens du Pacifique.
          </p>

          <h3 className="text-2xl text-gray-700 dark:text-gray-200 mt-8 mb-4">
            Notre Mission
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Cette application a été développée pour aider les chercheurs et les
            gestionnaires d&apos;aires marines protégées à :
          </p>

          <ul className="space-y-2 mb-8 ml-4">
            {[
              "Localiser précisément les populations d'acanthasters",
              "Suivre leur distribution et leur densité",
              "Coordonner les efforts d'élimination",
              "Protéger efficacement nos récifs coralliens"
            ].map((item, index) => (
              <li key={index} className="
                text-gray-600 dark:text-gray-300
                pl-4
                relative
                before:content-['•']
                before:absolute
                before:left-0
                before:text-blue-500 dark:before:text-blue-400
              ">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl text-gray-700 dark:text-gray-200 mt-8 mb-4">
            Comment Utiliser l&apos;Application
          </h3>

          <p className="
            text-gray-600 dark:text-gray-300
            mb-6
            p-4
            bg-gray-50 dark:bg-gray-800
            rounded-lg
            border
            border-gray-200 dark:border-gray-700
          ">
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
