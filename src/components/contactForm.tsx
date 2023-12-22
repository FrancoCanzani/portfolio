export default function ContactForm() {
  return (
    <form action=''>
      <div className='space-y-4'>
        <div className='space-y-1'>
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Name
          </label>
          <input
            className='ring-1 p-2 flex w-full ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-white border-gray-100 shadow-md dark:shadow-none shadow-gray-300/10 dark:border-gray-800/50'
            id='name'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Email
          </label>
          <input
            className='ring-1 p-2 flex w-full ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-white border-gray-100 shadow-md dark:shadow-none shadow-gray-300/10 dark:border-gray-800/50'
            id='email'
            placeholder='Enter your email'
            type='email'
            required
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Message
          </label>
          <textarea
            className='ring-1 p-2 flex w-full ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-white border-gray-100 shadow-md dark:shadow-none shadow-gray-300/10 dark:border-gray-800/50'
            id='message'
            placeholder='Enter your message'
            required
          ></textarea>
        </div>
        <button className='p-2 ring-1 ring-transparent rounded-md bg-white/50 dark:bg-black border hover:ring-white border-gray-100 shadow-md dark:shadow-none shadow-gray-300/10 dark:border-gray-800/50'>
          Send message
        </button>
      </div>
    </form>
  );
}
