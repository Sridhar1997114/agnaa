import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#1C1C72] p-4">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="mb-8">Could not find requested resource</p>
      <Link 
        href="/"
        className="px-6 py-3 bg-[#1C1C72] text-white rounded-lg hover:bg-[#1C1C72]/90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
