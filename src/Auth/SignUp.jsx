import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5001/api/contect/signup/SA";

export const SignUp = ({ isOpen = true, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');   
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); 

    if ((Password !== confirmPassword) && Password == "" ) {
      return <span className="text-red-500 text-xs block mt-1">Not Match</span>;
    } else if((Password !== confirmPassword)){
      return <span className="text-red-500 text-xs block mt-1">Not Match</span>;
    } 

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name:name,      
          Email:email,     
          Password,
          Roll: "EU"
        })
      });

      if (res.ok) {
        const message = "Successfully registered"; 
        if (onClose) onClose();
      } else {
        
      }
    } catch (error) {
      
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/20 relative overflow-hidden">
        
        {onClose && (
          <button onClick={onClose} type="button" className="absolute top-4 right-4 text-slate-300 hover:text-white transition-colors z-20">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-extrabold text-white text-center mb-8 tracking-tight">Create Account</h2>
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-slate-400 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-slate-400 transition-all"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                id="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-slate-400 transition-all"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-slate-400 transition-all"
                required
              />
              {confirmPassword ? (
                Password !== confirmPassword ? (
                  <span className="text-red-500 text-xs block mt-1">Not Match</span>
                ) : (
                  <span className="text-green-500 text-xs block mt-1">Matched</span>
                )
              ) : null}
            </div>
            
            <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-indigo-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-1 mt-6">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
