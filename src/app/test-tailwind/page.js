'use client';

const TestTailwindPage = () => {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Tailwind CSS Test Page</h1>
      
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
      
      <div className="mt-10 p-6 border-2 border-purple-500 rounded-lg">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Tailwind Utility Classes</h2>
        
        <div className="space-y-4">
          <p className="font-bold underline">This text is bold and underlined</p>
          <p className="italic text-green-700">This text is italic and green</p>
          <p className="line-through text-red-600">This text has a strikethrough and is red</p>
          <p className="text-lg uppercase tracking-wide">This text is large, uppercase, and has wide letter spacing</p>
        </div>
      </div>
    </div>
  );
};

export default TestTailwindPage;
