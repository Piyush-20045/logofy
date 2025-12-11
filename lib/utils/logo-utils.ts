import axios from "axios";
import toast from "react-hot-toast";

// DOWNLOAD-IMAGE HELPER FUNCTION
// which fetches the image and converts it into "blob"(binary object) and saves it
export const downloadLogo = async (imageUrl: string, fileName: string) => {
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
    toast.error("Failed to download image");
    // Fallback: open in new tab
    window.open(imageUrl, "_blank");
  }
};

// DELETE LOGO FUNCTION
export const deleteLogo = async (logoId: Number, imageUrl: string) => {
  try {
    // API CALL TO DELETE THE LOGO from database and storage
    await axios.post("/api/delete-logo", {
      id: logoId,
      image_url: imageUrl,
    });
    toast.success("Logo deleted successfully");
  } catch (err) {
    console.error("Error in deleting", err);
    toast.error("Failed to delete logo. Please refresh the page.");
  }
};
