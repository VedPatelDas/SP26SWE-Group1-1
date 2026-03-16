'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SAMPLE_CHATS = [
  { prompt: "What is Software Engineering?", response: "The systematic application of engineering principles to software development." },
  { prompt: "Will AI take over my job?", response: "AI is a tool to enhance human productivity, not replace the need for engineering logic!" },
  { prompt: "How do I succeed at Rutgers?", response: "Stay curious, attend your SWE lectures, and keep building great projects like this!" }
];

export default function LandingPage() {
  const [step, setStep] = useState(0); // 0: Hidden/Reset, 1: User Typing, 2: Sent, 3: AI Thinking, 4: AI Typing
  const [chatIdx, setChatIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === 0) {
      // 0. RESET STATE: Wait 1 second in total darkness before starting next prompt
      timer = setTimeout(() => {
        setStep(1);
      }, 1000);
    } 
    else if (step === 1) {
      // 1. User Typing
      const fullText = SAMPLE_CHATS[chatIdx].prompt;
      if (displayText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 40); 
      } else {
        timer = setTimeout(() => setStep(2), 800);
      }
    } else if (step === 2) {
      // 2. Sent - Pause before thinking
      timer = setTimeout(() => {
        setStep(3);
        setDisplayText(''); 
      }, 400);
    } else if (step === 3) {
      // 3. AI Thinking
      timer = setTimeout(() => {
        setStep(4);
      }, 2000); 
    } else if (step === 4) {
      // 4. AI Response
      const fullResponse = SAMPLE_CHATS[chatIdx].response;
      if (displayText.length < fullResponse.length) {
        timer = setTimeout(() => {
          setDisplayText(fullResponse.slice(0, displayText.length + 1));
        }, 25);
      } else {
        // END OF CYCLE: Wait, then hide everything (back to step 0)
        timer = setTimeout(() => {
          setStep(0);
          setDisplayText('');
          setChatIdx((prev) => (prev + 1) % SAMPLE_CHATS.length);
        }, 4000);
      }
    }

    return () => clearTimeout(timer);
  }, [step, displayText, chatIdx]);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-10 text-center flex flex-col items-center">
        <div className="relative w-72 h-72 mb-2">
          <Image src="/landingicon.png" alt="Logo" fill className="object-contain" priority />
        </div>
        <p className="text-slate-600 dark:text-slate-400 mt-2 font-semibold">
          The official AI interface for the Rutgers community.
        </p>
      </div>

      {/* The Showcase Box */}
      <div className="w-full max-w-3xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl mb-10 p-8 relative overflow-hidden">
        <div className="flex flex-col space-y-6 min-h-[260px] justify-end">
          
          {/* USER SIDE PROMPT - Only visible if step > 0 */}
          <div className={`bg-blue-600 text-white self-end p-4 rounded-2xl rounded-tr-none text-sm font-medium max-w-[80%] shadow-md transition-opacity duration-700 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            {step === 1 ? displayText : SAMPLE_CHATS[chatIdx].prompt}
            {step === 1 && <span className="animate-pulse ml-0.5 font-thin">|</span>}
          </div>
           
           {/* AI SIDE RESPONSE - Only visible if step > 2 */}
           <div className={`flex items-start gap-4 h-32 transition-opacity duration-700 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
             <div className="relative flex-shrink-0 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-inner border border-slate-200 dark:border-slate-700 flex items-center justify-center">
               {step >= 3 && (
                 <div className={`absolute inset-0 rounded-full border-4 border-t-scarlet border-transparent ${step === 3 ? 'animate-spin' : ''}`}></div>
               )}
               <div className="relative w-8 h-8">
                 <Image src="/overlayicon.png" alt="AI" fill className="object-contain p-1" />
               </div>
             </div>

             <div className="bg-white dark:bg-slate-800 self-start p-5 rounded-2xl rounded-tl-none text-sm border border-slate-200 dark:border-slate-700 shadow-sm w-full max-w-[80%] min-h-[60px]">
               {step === 3 ? (
                 <div className="flex flex-col gap-2">
                    <div className="flex gap-1 h-5 items-center">
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <span className="text-slate-400 italic text-xs uppercase tracking-widest font-bold">Analyzing Prompt...</span>
                 </div>
               ) : (
                 <span className="text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                   {displayText}
                   {step === 4 && displayText.length < SAMPLE_CHATS[chatIdx].response.length && (
                     <span className="inline-block w-1.5 h-4 bg-scarlet ml-1 animate-pulse" />
                   )}
                 </span>
               )}
             </div>
           </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link href="/login" className="w-full bg-[#cc0033] text-white text-center py-5 rounded-2xl font-black text-xl hover:bg-[#990026] transition-all shadow-xl active:scale-95 border-b-4 border-red-900">
          LOGIN WITH SCARLETMAIL
        </Link>
        <div className="flex gap-4 w-full">
          <Link href="/signup" className="flex-1 bg-white border-2 border-[#cc0033] text-[#cc0033] text-center py-4 rounded-2xl font-black text-lg hover:bg-red-50 transition-all border-b-4 border-red-100">
            CREATE ACCOUNT
          </Link>
          <Link href="/chat" className="flex-1 bg-slate-900 text-white text-center py-4 rounded-2xl font-black text-lg hover:bg-black transition-all border-b-4 border-slate-700">
            GUEST ACCESS
          </Link>
        </div>
      </div>
      <p className="mt-10 text-xs text-slate-500 font-bold uppercase tracking-widest">
        Rutgers University Restricted Access
      </p>
    </main>
  );
}