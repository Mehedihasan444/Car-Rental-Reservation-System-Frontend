

const Loading = ({ loading }: { loading: boolean }) => {
    if (!loading) return null;
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  w-screen">
        <div className="flex items-center space-x-2">
          {/* Animated Spinner */}
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        </div>
        <p className="text-gray-500 mt-2">Please wait while we fetch the data.</p>
      </div>
    );
  };
  
  export default Loading;
  