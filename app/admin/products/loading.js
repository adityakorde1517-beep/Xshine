export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header Skeleton */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <div className="mx-auto h-5 w-32 bg-slate-700 rounded animate-pulse" />

          <div className="mx-auto mt-5 h-12 w-64 bg-slate-700 rounded animate-pulse" />

          <div className="mx-auto mt-5 h-5 max-w-xl bg-slate-700 rounded animate-pulse" />

        </div>
      </section>

      {/* Content Skeleton */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        {/* Search Skeleton */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="grid md:grid-cols-2 gap-4">

            <div className="h-12 bg-slate-200 rounded-xl animate-pulse" />

            <div className="h-12 bg-slate-200 rounded-xl animate-pulse" />

          </div>
        </div>

        {/* Product Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
            >

              <div className="h-52 bg-slate-200 animate-pulse" />

              <div className="p-6">

                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />

                <div className="mt-4 h-7 w-40 bg-slate-200 rounded animate-pulse" />

                <div className="mt-4 h-4 w-full bg-slate-200 rounded animate-pulse" />

                <div className="mt-2 h-4 w-4/5 bg-slate-200 rounded animate-pulse" />

                <div className="mt-6 h-10 w-36 bg-slate-200 rounded-lg animate-pulse" />

              </div>

            </div>
          ))}

        </div>

      </section>
    </main>
  );
}