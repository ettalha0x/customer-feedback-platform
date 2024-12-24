
export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-5xl font-bold text-green-600 mb-4">Thank You!</h1>
        <div className="flex justify-center">
            <img src="./favicon.ico" alt="Favicon" className="w-16 h-16" />
        </div>
        <p className="text-lg text-gray-700 mb-6">
          Your feedback has been submitted successfully. We appreciate your input!
        </p>
      </div>
    </div>
  )
}