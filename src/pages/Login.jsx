import { motion } from "framer-motion";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({
        emailOrPhone: formData.emailOrPhone,
        password: formData.password
      });
      navigate('/');

    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-[#1a1a1a] flex items-center justify-center p-4"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #2a2a2a 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}
    >
      <div className="absolute inset-0 bg-purple-600/5"></div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 mt-2">Log in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors" />
                <input
                  type="email"
                  placeholder="Email Or Phone"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 pl-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                />
              </div>

              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 pl-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400 hover:text-gray-300 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-gray-600 bg-white/5 text-purple-500 focus:ring-purple-400" />
                Remember me
              </label>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                Forgot Password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              Log In
            </motion.button>
          </form>

          <p className="mt-8 text-center text-gray-400">
            Don't have an account?{" "}
            <Link to={'/signup'} className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              Create Account
            </Link>
          </p>

          <div className="absolute -bottom-2 -left-2 w-72 h-72 bg-purple-500/30 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute -top-2 -right-2 w-72 h-72 bg-pink-500/30 rounded-full blur-[100px] -z-10"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
