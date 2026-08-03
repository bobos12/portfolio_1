/* Shared preview chrome used by both the Projects showcase and the detail modal */

export const previewUrl = (project) => {
  const raw = project.live_demo_link || project.source_code_link;
  if (!raw) return "preview";
  try {
    const { hostname, pathname } = new URL(raw);
    const host = hostname.replace(/^www\./, "");
    const path = pathname === "/" ? "" : pathname;
    const full = host + path;
    return full.length > 46 ? `${full.slice(0, 45)}…` : full;
  } catch {
    return raw;
  }
};

/**
 * Deployment status pill.
 * `status: "dev"` marks a project that is deployed but still being built out.
 */
export const StatusBadge = ({ project, className = "" }) => {
  if (!project.live_demo_link) return null;

  const inDev = project.status === "dev";
  const tone = inDev
    ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
    : "border-emerald-400/25 bg-emerald-400/10 text-emerald-300";
  const dot = inDev ? "bg-amber-400" : "bg-emerald-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-[3px] backdrop-blur-sm ${tone} ${className}`}
    >
      <span className={`live-dot block h-1.5 w-1.5 rounded-full ${dot}`} />
      <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">
        {inDev ? "In Dev" : "Live"}
      </span>
    </span>
  );
};

/** Browser-window frame. `children` fills the 16:10 screen area. */
export const BrowserFrame = ({ project, className = "", children }) => (
  <div
    className={`overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] ${className}`}
  >
    <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.025] px-4 py-3">
      <div className="flex shrink-0 gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-black/40 px-3 py-1.5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-3 w-3 shrink-0 text-white/25"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span className="truncate font-mono text-[10.5px] text-white/35">
          {previewUrl(project)}
        </span>
      </div>

      <StatusBadge project={project} className="shrink-0" />
    </div>

    <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
      {children}
    </div>
  </div>
);
