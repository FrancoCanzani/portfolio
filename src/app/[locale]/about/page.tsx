import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function About() {
  const t = useTranslations('About');
  const locale = useLocale();

  return (
    <section className='px-4'>
      <h1 className='text-2xl font-bold mb-1 dark:text-gray-100'>
        {t('title')}
      </h1>
      <Image
        src={'/pic.png'}
        height={140}
        width={140}
        alt='Franco Canzani'
        className='rounded-full bg-gray-100 hidden mt-2 mb-5 mx-auto sm:block sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0'
      />
      {locale == 'en' ? (
        <p className='my-5 [blockquote_&]:my-2'>
          I am a logistics and supply chain professional with a deep-rooted
          passion for technology and innovation. Originally hailing from{' '}
          <a
            href='https://es.wikipedia.org/wiki/Buenos_Aires'
            target='_blank'
            className='underline'
          >
            Buenos Aires, Argentina
          </a>
          , my journey in logistics has been marked by a relentless pursuit of
          efficiency and excellence, working with industry leaders like Ford
          Motors, DHL, and DB Schenker.
          <br />
          <br />
          From a young age, I was fascinated by the intricate workings of global
          supply chains and the pivotal role of technology in transforming
          businesses. This curiosity led me to explore the vast potential of
          tech solutions in logistics, a field where precision and
          problem-solving are paramount.
          <br />
          <br />
          My professional path began with hands-on roles in fleet management and
          logistics operations, where I honed my skills in tactical planning,
          customer service, and team coordination. These experiences equipped me
          with a unique perspective on how technology can revolutionize
          traditional industries. Transitioning to tech, I aim to leverage my
          expertise in logistics and my passion for technology to drive
          innovation in this sector. I believe my background in managing complex
          supply chains and my acute problem-solving abilities position me
          uniquely to contribute to the tech world, particularly in roles where
          these skills are crucial.
          <br />
          <br />
          My goal is to join a forward-thinking tech company, where I can blend
          my logistics insights with cutting-edge technology to create impactful
          solutions. I&apos;m excited about the endless possibilities that lie
          at the intersection of tech and logistics and am eager to be at the
          forefront of this transformation.
        </p>
      ) : (
        <p className='my-5 [blockquote_&]:my-2'>
          Soy un apasinado de la logística y la cadena de suministros con una
          profunda pasión por la tecnología y la innovación. Originario de{' '}
          <a
            href='https://es.wikipedia.org/wiki/Buenos_Aires'
            target='_blank'
            className='underline'
          >
            Buenos Aires, Argentina
          </a>
          , mi trayectoria en logística ha estado marcada por una incansable
          búsqueda de eficiencia y excelencia, trabajando con líderes de la
          industria como Ford Motors, DHL y DB Schenker.
          <br />
          <br />
          Desde joven, me he interesado por los mecanismos de las cadenas de
          suministro globales y el papel crucial de la tecnología en la
          transformación de los negocios. Esta curiosidad me llevó a explorar el
          enorme potencial de las soluciones tecnológicas en logística, un campo
          donde la precisión y la resolución de problemas son fundamentales.
          <br />
          <br />
          Mi camino profesional comenzó con roles prácticos en la gestión de
          flotas y operaciones logísticas, donde perfeccioné mis habilidades en
          planificación táctica, servicio al cliente y coordinación de equipos.
          Estas experiencias me dotaron de una perspectiva única sobre cómo la
          tecnología puede revolucionar las industrias tradicionales. En mi
          busqueda de transicionar al desarrollo de software, mi objetivo es
          aprovechar mi experiencia en logística y mi pasión por la tecnología
          para impulsar la innovación en este sector. Creo que mi experiencia en
          la gestión de cadenas de suministro complejas y mis agudas habilidades
          para resolver problemas me posicionan de manera única para contribuir
          al mundo tecnológico, especialmente en roles donde estas habilidades
          son cruciales.
          <br />
          <br />
          Mi meta es unirme a una empresa tecnológica con visión de futuro,
          donde pueda combinar mis conocimientos de logística con tecnología de
          vanguardia para crear soluciones impactantes. Estoy emocionado por las
          infinitas posibilidades que existen en la intersección de la
          tecnología y la logística y tengo ansias de estar en la vanguardia de
          esta transformación.
        </p>
      )}
    </section>
  );
}
