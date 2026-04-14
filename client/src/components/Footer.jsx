import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300 mt-10">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3"><span className="text-blue-900">Quick</span>blog</h2>
          <p className="text-sm leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit numquam nam expedita reiciendis hic nesciunt reprehenderit. Natus magnam sit fugit.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Best Seller</li>
            <li className="hover:text-white cursor-pointer">Offers & Deals</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Delivery Information</li>
            <li className="hover:text-white cursor-pointer">Returns & Refund Policy</li>
            <li className="hover:text-white cursor-pointer">Payment Methods</li>
            <li className="hover:text-white cursor-pointer">Track your Order</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Instagram</li>
            <li className="hover:text-white cursor-pointer">Twitter</li>
            <li className="hover:text-white cursor-pointer">Facebook</li>
            <li className="hover:text-white cursor-pointer">YouTube</li>
            <li className="hover:text-white cursor-pointer">Linkedin</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        <p className="flex items-center justify-center gap-1">
          Copyright 2016 <FaRegCopyright /> Quickblog Rizwan - All Right Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer