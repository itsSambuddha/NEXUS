"use client";
// Import necessary React hooks and Next.js components
import { useRouter } from "next/navigation";

/**
 * Home page component - Landing page for SEC-NEXUS application
 * Features a modern hero section with call-to-action buttons
 * Handles user authentication check and routing
 */
export default function Home() {
  // Initialize Next.js router for navigation
  const router = useRouter();

  return (
    // Main container for the landing page with blue background
    <div className="bg-blue-100 min-h-screen">
      {/* Hero section with gradient background */}
      <div className="relative isolate px-6 pt-24 lg:px-8">
        {/* Decorative gradient background */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80dbff] to-[#0051ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        
        {/* Main content section */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          {/* Notification banner with college website link */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Click the link to visit St. Edmund's College Official Website{" "}
              <a
                href="https://sec.edu.in/"
                target="_blank"
                className="font-semibold text-[#2e95f0]"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Click here <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          
          {/* Main hero content */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to SEC-NEXUS
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Event creation, registration, and management are often handled across multiple platforms such as Google Forms, WhatsApp, and spreadsheets, leading to inefficiency, data loss, and a fragmented experience for both organisers and participants. There is no unified, real-time system to manage events end-to-end, resulting in communication delays, duplicate work and a lack of scalability.
            </p>
            
            {/* Call-to-action buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                className="rounded-md bg-[#2e9cf0] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#002f81] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  // Check if user is logged in, redirect accordingly
                  if (localStorage.getItem("userInfo") != null) {
                    router.push("/landing");
                  } else {
                    router.push("/login");
                  }
                }}
              >
                Get started
              </button>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative gradient */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80ddff] to-[#2e7ff0] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
