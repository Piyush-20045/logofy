import { Download, ArrowLeft, Sparkles, LayoutDashboard } from "lucide-react";
import { downloadLogo } from "@/lib/utils/logo-utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Success = ({ formData, logoImage }: any) => {
  const router = useRouter();

  return (
    <div className="max-w-2xl w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">Logo Generated Successfully!</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {formData?.title || "Your Logo"}
        </h1>
        <p className="text-gray-600">{formData?.desc}</p>
      </div>

      {/* Logo Display */}
      <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-6 border border-gray-200">
        <div className="bg-white rounded-xl p-8 shadow-sm flex items-center justify-center">
          <img
            src={logoImage}
            alt={formData?.title || "Generated logo"}
            className="w-full max-w-md h-auto object-contain"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Button
          onClick={() => downloadLogo(logoImage, formData?.title || "logo")}
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3"
          size="lg"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Logo
        </Button>

        <Link href="/dashboard" className="flex-1">
          <Button
            variant="outline"
            className="w-full border-blue-200 text-teal-600 hover:bg-teal-50"
            size="lg"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            View All Logos
          </Button>
        </Link>
      </div>

      {/* Additional Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex-1 border-gray-200 hover:bg-gray-100"
          size="lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go Back
        </Button>
        <Link href="/create" className="flex-1">
          <Button variant="outline" className="w-full" size="lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Create Another Logo
          </Button>
        </Link>
      </div>

      {/* Info Card */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Your logo has been saved to your dashboard.
          You can download it anytime or generate variations!
        </p>
      </div>
    </div>
  );
};

export default Success;
