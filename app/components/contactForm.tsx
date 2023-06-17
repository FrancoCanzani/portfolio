export default function ContactForm() {
  return (
    <form action='' className='flex flex-col justify-center capitalize'>
      <h1 className='mb-3 text-2xl font-bold'>Get in touch</h1>
      <div className='mb-7 md:flex md:items-center'>
        <div className='mr-2 flex flex-col'>
          <label htmlFor='name' className='font-semibold'>
            Your name
          </label>
          <input
            type='text'
            required
            className='rounded-sm px-2 py-1'
            placeholder='John Doe'
            autoFocus
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='email' className='font-semibold'>
            Email
          </label>
          <input
            required
            type='text'
            placeholder='your@email.com'
            className='rounded-sm px-2 py-1'
          />
        </div>
      </div>
      <label htmlFor='message' className='font-semibold'>
        Message
      </label>
      <textarea
        required
        name='message'
        id='message'
        className='rounded-sm px-2 py-1'
        placeholder='Say Hi!'
      ></textarea>

      <button className='mt-4 w-32 bg-black font-semibold text-white hover:bg-green-700'>
        Submit
      </button>
    </form>
  );
}
