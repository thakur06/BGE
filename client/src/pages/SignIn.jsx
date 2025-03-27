import { useState } from "react";
import logo from "../assets/icons/logo.png"; // Adjust path if needed

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for sign-in logic (e.g., API call)
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo and Branding */}
        <div className="flex items-center justify-center mb-6 space-x-2">
          <img src={logo} alt="Biogas Engineering Logo" className="h-12 w-12" />
          <div className="flex flex-col text-center">
            <p className="text-amber-500 font-semibold text-xl">
              BIO<span className="text-green-500">GAS</span>
            </p>
            <p className="text-amber-500 font-semibold text-xl">ENGINEERING</p>
          </div>
        </div>

        {/* Form */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Forgot Password Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Forgot your password?{" "}
          <a href="#" className="text-green-500 hover:underline">
            Reset it
          </a>
        </p>

        {/* Sign Up Link */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-green-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;