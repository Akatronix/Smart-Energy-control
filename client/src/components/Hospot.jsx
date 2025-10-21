import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import handleConfirm from "@/utils/HospotRequest";

const Hospot = ({
  isOpen,
  onClose,
  trigger = "Open",
  title = "Set your hotspot credentials",
  description = "Please enter your hotspot SSID and password, and make sure they are correct.",
}) => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    if (!ssid || !password) {
      alert("Please enter both SSID and password");
      return;
    }

    setIsSubmitting(true);
    try {
      await handleConfirm({ ssid, password });
      onClose();
      setSsid("");
      setPassword("");
    } catch (error) {
      console.error("Error submitting hotspot credentials:", error);
      alert("Failed to submit credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="ssid"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hotspot SSID
            </label>
            <input
              id="ssid"
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter network name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Save Credentials"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Hospot;
