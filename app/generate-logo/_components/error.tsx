import Link from "next/link";
import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="text-center max-w-md">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mb-6">
        We couldn't generate your logo. This might be due to high demand or a
        temporary issue.
      </p>
      <div className="flex flex-col gap-3">
        <Link href="/create">
          <Button className="w-full bg-teal-600 hover:bg-teal-700">
            Try Again
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="w-full">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
