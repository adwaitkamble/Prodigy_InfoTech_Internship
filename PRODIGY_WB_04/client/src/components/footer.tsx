import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; 2024 Adwait Kamble. All rights reserved.</p>
            <p className="text-sm mt-1">Built with passion and modern web technologies</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm">Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span className="text-sm">in Pune, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
