import Image from 'next/image'

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white justify-center shadow-lg rounded-lg p-2 m-2 max-w-md text-center">
        <h1 className="text-5xl font-bold text-green-600 mb-4">Thank You!</h1>
        {/* <div className="flex justify-center">
            <Image src="./bg.jpeg" width={50} height={50} alt="Favicon" className="w-16 h-16" />
        </div> */}
        <p className="text-lg text-gray-700 mb-6">
          Your feedback has been submitted successfully. We appreciate your input!
        </p>
      </div>
    </div>
  )
}