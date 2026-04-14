const Email = () => {
  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        Never Miss a Blog!
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 mb-6 text-sm md:text-base">
        Subscribe to get the latest blogs, new tech, and exclusive news.
      </p>

      {/* Input + Button Combined */}
      <div className="flex w-full overflow-hidden rounded border border-gray-300">
        
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email id"
          className="flex-grow px-4 py-3 outline-none text-sm"
        />

        <button className="px-6 py-3 bg-blue-900 text-white font-semibold hover:bg-blue-800 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Email;