"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t px-8 py-6 mt-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm text-gray-600">© 2025 UAV Study Platform.</p>
        <div className="flex gap-6">
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/references"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            References
          </Link>
        </div>
      </div>
    </footer>
  );
}
