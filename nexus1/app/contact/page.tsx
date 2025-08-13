"use client";
import Image from "next/image";
import Link from "next/link";
import Icon from "../../public/logo/tick-checkbox-svgrepo-com.svg";

export default function Contact() {
  return (
    <div className="bg-blue-100 min-h-screen">
      {/* Header with logo */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Image src={Icon} height={100} width={200} alt="SEC Logo" />
          </div>
        </nav>
      </header>

      {/* Main content */}
      <div className="relative isolate px-6 pt-24 lg:px-8">
        <div className="mx-auto max-w-4xl py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
              Contact Us
            </h1>
            <div className="text-lg leading-8 text-gray-600 space-y-4">
              <p>
                Have questions about SEC-NEXUS? We're here to help!
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> support@sec-nexus.edu.in</p>
                <p><strong>Phone:</strong> +91 123 456 7890</p>
                <p><strong>Address:</strong> St. Edmund's College, Shillong</p>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
