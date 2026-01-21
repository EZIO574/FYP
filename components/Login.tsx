import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Hexagon, ArrowRight, Loader2 } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(email, 'Talha Younas'); // Mock login
      history.push('/');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="flex justify-center mb-8">
          <div className="bg-slate-900 p-3 rounded-xl text-white shadow-lg">
            <Hexagon size={32} strokeWidth={1.5} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-slate-900 font-display mb-2">Welcome Back</h2>
        <p className="text-center text-slate-500 mb-8 text-sm">Sign in to your automation dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="name@company.com"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-slate-600">Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 mt-6"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Sign In <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="text-center text-slate-400 text-xs mt-8">
          Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-bold">Create Account</Link>
        </p>
      </div>
    </div>
  );
};