export default function About() {
  return (
    <section className='mt-16 px-14'>
      <h1 className='text-3xl font-black'>Franco Canzani</h1>
      <h2 className='capitalize'>Front end developer</h2>
      <a
        href='https://goo.gl/maps/kj3qRxZa2fR18fPK7'
        target='blank'
        className='hover:underline'
      >
        🌍 Denia, Alicante, Spain
      </a>
      <br />
      <br />
      <p className='text-4xl font-extralight leading-normal'>
        {/* The preferred way to include one of these characters is to use the HTML escape code.
        ' can be replaced with &apos;, &lsquo;, &#39; or &rsquo; */}
        I&#39;m a dedicated Front End Developer who is deeply passionate about
        writing software and creating exceptional user interfaces. With a strong
        foundation in front end development technologies and a drive for
        continuous learning, I am committed to contributing my skills and
        creativity to help build innovative web applications.
      </p>
    </section>
  );
}
