import NavBar from '../navbar/navbar';
import './landing.css';

function Landing () {
  return (
    <>
      <div className='flex flex-col w-full'>
        {/* header */}
        <NavBar/>
        <div className='flex flex-row items-start justify-center border-b-2 gap-10 p-10 mt-12'>
          <div>
            <h1 className="font-bold text-2xl">Your spending, unwrapped.</h1>
            <p className="max-w-md">Upload your bank statement and discover where your money really goes. Get a beautiful, Spotify Wrapped-style breakdown of your spending habits.</p>
            <div className='flex flex-row gap-6'>
              <button className='bg-black text-white font-bold py-2 px-4 mt-4 rounded-lg hover:bg-gray-800'>Get Started</button>
              <button className='bg-black text-white font-bold py-2 px-4 mt-4 rounded-lg hover:bg-gray-800'>See Demo</button>
            </div>
          </div>

          <div className='border-2 text-center p-4'>
            <h1 className='font-bold'>Drop your bank statement here</h1>
            <p className='pb-4'>or click to browse</p>
            <p>Supports PDF files from most major banks</p>
          </div>
        </div>

        {/* how it works */}
        <div className='flex flex-col justify-center border-b-2 gap-10 p-10'>
          <div>
            <h1 className="font-bold text-2xl">Why SpendWrapped?</h1>
            <p className="max-w-md">We built this because we were tired of boring budget apps. Your spending tells a story — let's make it interesting.</p>
  
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='border-2 p-4'>
              <h1 className='font-bold'>100% Private</h1>
              <p>Your data never leaves your browser. We don't store anything on our servers.</p>
            </div>

            <div className='border-2 p-4'>
              <h1 className='font-bold'>Instant Analysis</h1>
              <p>Get your spending breakdown in seconds, not minutes.</p>
            </div>

            <div className='border-2 p-4'>
              <h1 className='font-bold'>Shareable Results</h1>
              <p>Export your wrapped as an image to share with friends (or keep to yourself).</p>
            </div>

            <div className='border-2 p-4'>
              <h1 className='font-bold'>Track Over Time</h1>
              <p>Upload multiple statements to see how your spending changes month to month.</p>
            </div>
          </div>
        </div>

        {/* why spend */}
        <div className="flex flex-col items-center justify-center border-b-2 gap-10 p-10 w-full">
          <div className="text-center">
            <h1 className="font-bold text-2xl">See it in action</h1>
            <p className="max-w-md mx-auto">
              Here's what your Wrapped could look like
            </p>
          </div>

          <div className="border-2 text-center p-12 w-full max-w-lg">
            {/* your content here */}
          </div>
        </div>
      </div>      
    </>
  )
}

export default Landing;