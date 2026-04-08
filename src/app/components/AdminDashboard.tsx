import { schools } from "../../config/schools";

const DEFAULT_BRAND = "#d7d128";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#070b16] text-white font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            QS Branded Pages
          </h1>
          <p className="text-white/50 mt-1">
            {schools.length} school{schools.length !== 1 && "s"} registered
          </p>
        </div>

        {schools.length === 0 ? (
          <div className="text-white/40 text-center py-20">
            No schools registered. Add entries to{" "}
            <code className="text-white/60">src/config/schools.ts</code>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => (
              <div
                key={school.slug}
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4"
              >
                {/* Header: logo + name */}
                <div className="flex items-center gap-4">
                  <img
                    src={school.logoSrc}
                    alt={school.name}
                    className="h-12 w-auto max-w-[120px] object-contain"
                  />
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold truncate">
                      {school.name}
                    </h2>
                    <code className="text-sm text-white/40">{school.slug}</code>
                  </div>
                </div>

                {/* Brand color */}
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{
                      backgroundColor: school.brandColor || DEFAULT_BRAND,
                    }}
                  />
                  <span>{school.brandColor || `${DEFAULT_BRAND} (default)`}</span>
                </div>

                {/* QR code */}
                <div className="bg-white rounded-lg p-3 self-start">
                  <img
                    src={`/qr-codes/${school.slug}.png`}
                    alt={`QR code for ${school.name}`}
                    className="w-32 h-32"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling;
                      if (fallback) (fallback as HTMLElement).style.display = "flex";
                    }}
                  />
                  <div
                    className="w-32 h-32 items-center justify-center text-center text-xs text-gray-400 hidden"
                  >
                    QR not generated.
                    <br />
                    Run <code>npm run qr</code>
                  </div>
                </div>

                {/* URL */}
                <div className="text-sm text-white/40 break-all">
                  /s/{school.slug}
                </div>

                {/* Open page button */}
                <a
                  href={`/s/${school.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-2.5 text-sm font-medium"
                >
                  Open Page
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H18m0 0v4.5m0-4.5L10.5 13.5"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
