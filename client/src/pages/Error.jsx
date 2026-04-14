import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[80vh] px-4 bg-gradient-to-br from-gray-100 to-gray-200">
      
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
        
        {/* 404 */}
        <h1 className="text-5xl font-extrabold text-blue-900 mb-2">
          404
        </h1>

        {/* Text */}
        <p className="text-lg font-semibold text-gray-700 mb-1">
          Page Not Found
        </p>
        <p className="text-gray-500 mb-5 text-sm">
          The page you are looking for doesn’t exist.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-900 text-white px-5 py-2 rounded-full hover:bg-blue-800 transition shadow"
          >
            Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-blue-900 text-white px-5 py-2 rounded-full hover:bg-blue-800 transition shadow"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default Error;