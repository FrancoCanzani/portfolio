import Header from '@/components/header';

export default function Component() {
  return (
    <div className='py-12'>
      <Header />
      <main className='mx-auto py-12 px-4'>
        <section className='mb-10'>
          <h2 className='text-5xl font-bold capitalize'>
            Independent software developer.
          </h2>
          <div className='flex flex-wrap gap-2 mt-4'>
            <span>For anyone</span>
            <span>Web Design</span>
            <span>Product Design</span>
            <span>Advisor</span>
          </div>
          <p className='mt-4'>
            I design and build software with the goal of telling stories,
            reducing friction, and crafting digital experiences that are a joy
            to use.
          </p>
        </section>
        <section>
          <h3 className='text-2xl font-semibold mb-6'>Select Work</h3>
          <div className='grid grid-cols-1 gap-4'></div>
        </section>
      </main>
    </div>
  );
}
