"use client";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

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

  // DOWNLOAD-IMAGE HELPER FUNCTION which fetches the image and converts it into "blob"(binary object) and saves it
  const downloadImage = async (imageUrl: string, fileName: string) => {
    try {
      // 1.Fetch the image data
      const response = await fetch(imageUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 2.Convert it into Blob(Binary Large Object)
      const blob = await response.blob();

      // 3. Create a temporary link element
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // 4. Forcing the browser to download
      link.download = fileName.endsWith(".png") ? fileName : `${fileName}.png`;

      document.body.appendChild(link);
      link.click();

      // 5. Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading image:", err);
      // fallback if error
      window.open(imageUrl, "_blank");
    }
  };

  if (!isLoaded)
    return <div className="p-10 text-center">Loading user data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
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
            href="/generate-logo"
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
              <h3 className="font-semibold text-gray-800 truncate">
                {logo.title || "Untitled"}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1 mb-3">
                {logo.desc || "No description"}
              </p>

              {/* Download Button (Optional Bonus) */}
              <button
                onClick={() =>
                  downloadImage(logo.image_url, logo.title || "logo")
                }
                className="mt-auto text-sm text-center text-blue-600 border border-blue-200 py-2 rounded-md hover:bg-blue-50 transition cursor-pointer"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
