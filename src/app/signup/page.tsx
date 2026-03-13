'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would call the validateSignup logic we built earlier
    if (!email.toLowerCase().endsWith('@scarletmail.rutgers.edu')) {
      setError('Must use a @scarletmail.rutgers.edu email.');
    } else {
      setError('');
      alert('Verification email sent to ' + email);
      // In next steps, we connect this to Supabase
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        <Link href="/" className="text-scarlet font-bold mb-6 inline-block hover:underline">← Back</Link>
        
        <div className="flex flex-col items-center mb-8">
          <Image src="/overlayicon.png" alt="Logo" width={60} height={60} />
          <h2 className="text-2xl font-black mt-4">Create Account</h2>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Rutgers Email</label>
            <input 
              type="email" 
              placeholder="netid@scarletmail.rutgers.edu"
              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-scarlet outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {error && <p className="text-red-600 text-sm font-bold">{error}</p>}

          <button className="w-full bg-scarlet text-white py-4 rounded-xl font-black text-lg hover:bg-red-800 transition-all shadow-lg">
            SEND VERIFICATION
          </button>
        </form>
      </div>
    </main>
  );
}