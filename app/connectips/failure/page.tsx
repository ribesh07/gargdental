import Link from 'next/link';

const FailurePage = ({
  searchParams,
}: {
  searchParams: { TXNID?: string };
}) => {
  const TXNID = searchParams.TXNID;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Failure Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white text-center mb-2">Payment Failed</h1>
          <p className="text-red-100 text-center">Your payment could not be processed</p>
        </div>
        
        {/* Failure Content */}
        <div className="px-8 py-6">
          {TXNID && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-medium">Transaction ID</span>
                <span className="text-gray-900 font-mono text-sm bg-gray-200 px-2 py-1 rounded">{TXNID}</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center text-red-600 bg-red-50 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Transaction Failed</span>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">Don't worry, your money is safe.</p>
            <p className="text-sm text-gray-500">Please try again or contact support if the problem persists.</p>
          </div>
          
          <Link 
            href='/' 
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Back to Home
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FailurePage;