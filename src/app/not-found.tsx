import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0d0e10] px-6 text-white">
      <div className="text-center">
        <p className="text-sm font-bold text-[#b7ff3c]">
          404
        </p>

        <h1 className="mt-3 text-3xl font-bold uppercase md:text-4xl">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm text-gray-400">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#b7ff3c] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#c9ff70]"
        >
          Go to Workouts
        </Link>
      </div>
    </main>
  );
}