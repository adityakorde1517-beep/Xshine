export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

        <h2 className="mt-6 text-xl font-semibold text-slate-600">
          Loading...
        </h2>

        <p className="mt-2 text-slate-500">
          Please wait a moment.
        </p>

      </div>
    </div>
  );
}