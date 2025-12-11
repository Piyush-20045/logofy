"use client";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Trash } from "lucide-react";
import { deleteLogo, downloadLogo } from "@/lib/utils/logo-utils";

interface Logo {
  id: number;
  image_url: string;
  title: string;
  desc: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    // FETCHING ALL LOGOS OF USER
    const fetchLogos = async () => {
      try {
        setLoading(true);

        // selecting all logos where user_id matches the clerk ID
        const { data, error } = await supabase
          .from("logos")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching logos:", error);
        } else {
          setLogos(data || []);
        }
      } catch (err) {
        console.error("Unexpected error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogos();
  }, [user, isLoaded]);

  // DELETE handler
  const handleDelete = async (logoId: number, imageUrl: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this logo? This cannot be undone."
      )
    )
      return;

    // Removing it from the screen immediately
    setLogos((prev) => prev.filter((logo) => logo.id !== logoId));

    await deleteLogo(logoId, imageUrl);
  };

  if (!isLoaded)
    return <div className="p-10 text-center">Loading user data...</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto md:mx-24">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="">
            <h1 className="text-3xl font-bold text-gray-800">My Logos</h1>
            <p className="pt-2 text-gray-600">
              Showing <span className="font-bold">{logos.length}</span> results
              -
            </p>
          </div>
          <Link
            href="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Create New
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500">Fetching your designs...</p>
        )}

        {/* Empty State */}
        {!loading && logos.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
            <h3 className="text-xl text-gray-600 mb-2">No logos found</h3>
            <p className="text-gray-400 mb-6">
              You haven't generated any logos yet.
            </p>
            <Link href="/generate-logo" className="text-blue-600 underline">
              Generate your first logo
            </Link>
          </div>
        )}

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col"
            >
              {/* Image Card */}
              <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden mb-4 relative flex items-center justify-center">
                <img
                  src={logo.image_url}
                  alt={logo.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text Info */}
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {logo.title || "Untitled"}
              </h3>
              <p className="h-14 text-md text-gray-500 line-clamp-2 mt-1 mb-3">
                {logo.desc || "No description"}
              </p>

              <div className="flex justify-between items-center">
                {/* Download Button */}
                <Button
                  onClick={() =>
                    downloadLogo(logo.image_url, logo.title || "logo")
                  }
                  variant="outline"
                  className="text-blue-600 border border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition cursor-pointer"
                >
                  <Download />
                  Download
                </Button>
                {/* DELETE BUTTON */}
                <Button
                  onClick={() => handleDelete(logo.id, logo.image_url)}
                  variant="destructive"
                  className="hover:bg-red-700 transition cursor-pointer"
                >
                  <Trash />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
