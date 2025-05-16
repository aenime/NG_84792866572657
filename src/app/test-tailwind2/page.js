const TestTailwindPage2 = () => {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Tailwind CSS Test Page 2</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Red Background</h2>
          <p>This div has a red background color from Tailwind CSS.</p>
        </div>
        
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Green Background</h2>
          <p>This div has a green background color from Tailwind CSS.</p>
        </div>
        
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Blue Background</h2>
          <p>This div has a blue background color from Tailwind CSS.</p>
        </div>
      </div>
    </div>
  );
};

export default TestTailwindPage2;
