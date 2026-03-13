import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* 1. Header & Logo */}
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-scarlet rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
          R
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Scarlet AI</h1>
        <p className="text-slate-500 mt-2">The official AI interface for the Rutgers community.</p>
      </div>

      {/* 2. The Loop/Preview Box */}
      <div className="w-full max-w-3xl aspect-video bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl shadow-xl mb-8 p-6 overflow-hidden relative">
        <div className="flex flex-col space-y-4">
           <div className="bg-scarlet/10 self-end p-3 rounded-lg text-sm max-w-[80%]">
             What is the Aksharpurushottam Upasana?
           </div>
           <div className="bg-slate-100 dark:bg-slate-800 self-start p-3 rounded-lg text-sm max-w-[80%] animate-pulse">
             Generating answer...
           </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      </div>

      {/* 3. Navigation Actions */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link href="/login" className="flex-1 bg-scarlet text-white text-center py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md">
          Login with @scarletmail
        </Link>
        <Link href="/chat" className="flex-1 bg-white border border-slate-300 text-slate-700 text-center py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
          Try as Guest
        </Link>
      </div>

      <p className="mt-6 text-xs text-slate-400">Restricted to Rutgers University students and faculty.</p>
    </main>
  );
}