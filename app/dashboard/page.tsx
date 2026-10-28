"use client";

import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { deleteLogo, downloadLogo } from "@/lib/utils/logo-utils";
import { useStore } from "@/stores/steps-store";

interface Logo {
  id: number;
  image_url: string;
  title: string;
  desc: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const clearStep = useStore((state) => state.clearStep);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [deleting, setDeleting] = useState<number[]>([]);
  const [downloading, setDownloading] = useState<number[]>([]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setLogos([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    const fetchLogos = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data, error } = await supabase
          .from("logos")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (!cancelled) setLogos(data || []);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchLogos();
    return () => {
      cancelled = true;
    };
  }, [user, isLoaded, retry]);

  const handleDelete = async (logo: Logo) => {
    if (
      !confirm(
        "Are you sure you want to delete this logo? This cannot be undone.",
      )
    )
      return;
    setDeleting((ids) => [...ids, logo.id]);
    try {
      const deleted = await deleteLogo(logo.id, logo.image_url);
      if (deleted)
        setLogos((items) => items.filter((item) => item.id !== logo.id));
    } finally {
      setDeleting((ids) => ids.filter((id) => id !== logo.id));
    }
  };

  const handleDownload = async (logo: Logo) => {
    setDownloading((ids) => [...ids, logo.id]);
    try {
      await downloadLogo(logo.image_url, logo.title || "logo");
    } finally {
      setDownloading((ids) => ids.filter((id) => id !== logo.id));
    }
  };

  const visibleLogos = logos
    .filter((logo) =>
      `${logo.title ?? ""} ${logo.desc ?? ""}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "name") {
        return (a.title || "Untitled").localeCompare(b.title || "Untitled");
      }
      if (sort === "oldest") {
        return Date.parse(a.created_at) - Date.parse(b.created_at);
      }
      return Date.parse(b.created_at) - Date.parse(a.created_at);
    });

  return (
    <main className="min-h-[70vh] bg-[#f7f7f0] px-6 pb-20 pt-12.5 text-[#202e29] max-sm:px-5 max-sm:pb-12.5 max-sm:pt-8.5">
      <div className="mx-auto max-w-340">
        <div className="flex items-end justify-between gap-7.5 pb-9 max-md:flex-col max-md:items-start max-md:gap-5">
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.13em] text-[#61735c]">
              YOUR CREATIVE CORNER
            </p>
            <h1 className="text-[clamp(36px,3.6vw,52px)] font-[550] leading-[1.08] tracking-[-0.055em]">
              Small sparks.
              <br />
              <em className="font-[Georgia,serif] font-normal text-[#087f69]">
                Made into something.
              </em>
            </h1>
            <p className="mt-4.5 text-base leading-[1.7] text-[#63705f]">
              All your logos, in one place. Ready for their next chapter.
            </p>
          </div>
          <Link
            href="/create"
            onClick={clearStep}
            className="inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-4 rounded-md border border-[#087f69] bg-[#087f69] px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#05614f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] motion-reduce:transition-none"
          >
            <Plus size={18} /> Create a new logo
          </Link>
        </div>
        {!isLoaded || loading ? (
          <div
            className="flex min-h-77.5 flex-col items-center justify-center gap-3.5 rounded-xl border border-dashed border-[#cad5c0] bg-[#fffef9]/50 px-6 py-11 text-center text-[#087f69]"
            role="status"
          >
            <Sparkles size={32} />
            <h2 className="text-[25px] font-medium tracking-[-0.04em] text-[#294132] max-sm:text-[22px]">
              Gathering your ideas…
            </h2>
            <p className="text-[15px] leading-[1.6] text-[#687661]">
              Loading your logo collection.
            </p>
          </div>
        ) : !user ? (
          <div className="flex min-h-77.5 flex-col items-center justify-center gap-3.5 rounded-xl border border-dashed border-[#cad5c0] bg-[#fffef9]/50 px-6 py-11 text-center text-[#087f69]">
            <Sparkles size={32} />
            <h2 className="text-[25px] font-medium tracking-[-0.04em] text-[#294132] max-sm:text-[22px]">
              Your creative corner is waiting.
            </h2>
            <p className="text-[15px] leading-[1.6] text-[#687661]">
              Sign in to see your saved logos.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-4 rounded-md border border-[#087f69] bg-[#087f69] px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#05614f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] motion-reduce:transition-none"
            >
              Sign in <ArrowUpRight size={18} />
            </Link>
          </div>
        ) : error ? (
          <div
            className="flex min-h-77.5 flex-col items-center justify-center gap-3.5 rounded-xl border border-dashed border-[#cad5c0] bg-[#fffef9]/50 px-6 py-11 text-center text-[#087f69]"
            role="alert"
          >
            <h2 className="text-[25px] font-medium tracking-[-0.04em] text-[#294132] max-sm:text-[22px]">
              We couldn’t load your logos.
            </h2>
            <p className="text-[15px] leading-[1.6] text-[#687661]">
              Please try again in a moment.
            </p>
            <button
              className="inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-4 rounded-md border border-[#087f69] bg-[#087f69] px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#05614f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] motion-reduce:transition-none"
              onClick={() => setRetry((value) => value + 1)}
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-5 border-t border-[#dce2d4] py-6.5 max-md:flex-col max-md:items-start">
              <h2 className="flex items-center gap-2.5 text-xl font-semibold">
                My logos{" "}
                <span className="rounded-full bg-[#e7eddd] px-2.5 py-1 text-xs font-medium text-[#4d6546]">
                  {logos.length}
                </span>
              </h2>
              <div className="flex gap-3 max-md:w-full max-sm:flex-wrap">
                <label className="flex items-center gap-2 rounded-md border border-[#d6ddcf] bg-[#fffef9] px-3 py-3 text-[#73816a] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#087f69] max-md:flex-1 max-sm:min-w-37.5">
                  <Search size={18} />
                  <input
                    className="w-47.5 min-w-0 bg-transparent text-sm text-[#243d2d] outline-none max-md:w-full"
                    aria-label="Search logos"
                    placeholder="Find a logo…"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </label>
                <select
                  className="cursor-pointer rounded-md border border-[#d6ddcf] bg-[#fffef9] py-2.5 pl-3 pr-7.5 text-sm text-[#4d6045] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] max-[420px]:flex-1"
                  aria-label="Sort logos"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
            </div>
            {logos.length === 0 ? (
              <div className="flex min-h-77.5 flex-col items-center justify-center gap-3.5 rounded-xl border border-dashed border-[#cad5c0] bg-[#fffef9]/50 px-6 py-11 text-center text-[#087f69]">
                <Sparkles size={40} strokeWidth={1.3} />
                <h2 className="text-[25px] font-medium tracking-[-0.04em] text-[#294132] max-sm:text-[22px]">
                  A blank canvas. Endless possibilities.
                </h2>
                <p className="text-[15px] leading-[1.6] text-[#687661]">
                  Your first logo starts with a little idea.
                </p>
                <Link
                  href="/create"
                  onClick={clearStep}
                  className="inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-4 rounded-md border border-[#087f69] bg-[#087f69] px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#05614f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] motion-reduce:transition-none"
                >
                  Create your first logo <ArrowUpRight size={18} />
                </Link>
              </div>
            ) : visibleLogos.length === 0 ? (
              <div className="flex min-h-77.5 flex-col items-center justify-center gap-3.5 rounded-xl border border-dashed border-[#cad5c0] bg-[#fffef9]/50 px-6 py-11 text-center text-[#087f69]">
                <Search size={32} />
                <h2 className="text-[25px] font-medium tracking-[-0.04em] text-[#294132] max-sm:text-[22px]">
                  No matching logos.
                </h2>
                <p className="text-[15px] leading-[1.6] text-[#687661]">
                  Try another name or clear your search.
                </p>
                <button
                  className="mt-2 inline-flex min-h-12 cursor-pointer items-center justify-center gap-4 rounded-md border border-[#cdd6c6] px-5 py-3.5 text-[15px] font-semibold text-[#294b37] transition-colors hover:bg-[#edf1e5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] motion-reduce:transition-none"
                  onClick={() => setQuery("")}
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5 min-[420px]:grid-cols-2 md:grid-cols-3 md:gap-4.5 min-[1100px]:grid-cols-4 min-[1100px]:gap-6">
                {visibleLogos.map((logo) => (
                  <article
                    key={logo.id}
                    className="min-w-0 overflow-hidden rounded-lg border border-[#e1e5d9] bg-[#fffef9] transition-shadow hover:border-[#b9cbb0] hover:shadow-[0_8px_24px_#203b2d09] motion-reduce:transition-none"
                  >
                    <div className="aspect-square overflow-hidden border-b border-[#e1e5d9] bg-[#eeefe7]">
                      <img
                        src={logo.image_url}
                        alt={logo.title || "Untitled logo"}
                        loading="lazy"
                        className="size-full object-contain"
                      />
                    </div>
                    <div className="p-4.5 min-[420px]:max-sm:p-3">
                      <h3
                        title={logo.title}
                        className="truncate text-lg font-semibold tracking-tight min-[420px]:max-sm:text-base"
                      >
                        {logo.title || "Untitled"}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 h-11.25 text-sm leading-[1.6] text-[#687661] min-[420px]:max-sm:text-[13px]">
                        {logo.desc ||
                          "A fresh identity, ready to make its mark."}
                      </p>
                      <div className="mt-4 flex items-center gap-2 border-t border-[#e5e8df] pt-3.5 max-sm:flex-wrap">
                        <button
                          className="inline-flex min-h-10.5 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md bg-[#edf3e7] p-2.5 text-[13px] font-semibold text-[#087f69] hover:bg-[#e1ebd8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] disabled:cursor-wait disabled:opacity-60 max-sm:gap-1 max-sm:p-2 min-[420px]:max-sm:text-xs"
                          onClick={() => handleDownload(logo)}
                          disabled={
                            downloading.includes(logo.id) ||
                            deleting.includes(logo.id)
                          }
                        >
                          <Download size={16} />
                          {downloading.includes(logo.id)
                            ? "Downloading…"
                            : "Download"}
                        </button>
                        <button
                          className="inline-flex min-h-10.5 min-w-10.5 cursor-pointer items-center justify-center gap-2 rounded-md p-2.5 text-[13px] font-semibold text-[#78816f] hover:bg-[#fcece5] hover:text-[#a42d29] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f69] disabled:cursor-wait disabled:opacity-60"
                          onClick={() => handleDelete(logo)}
                          disabled={deleting.includes(logo.id)}
                          aria-label={`Delete ${logo.title || "untitled logo"}`}
                          title="Delete logo"
                        >
                          <Trash2 size={16} />
                          {deleting.includes(logo.id) && <span>Deleting…</span>}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
