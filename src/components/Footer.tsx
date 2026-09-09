import { MapPin, Phone, Mail } from "lucide-react";



const Footer = () => {

  const socialIcons = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/23407087990133',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.039L.785 23.4c-.117.404.256.776.659.659l4.361-1.499A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-2.178 0-4.208-.663-5.895-1.801l-.422-.268-3.633 1.247 1.247-3.633-.268-.422A9.807 9.807 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/reborn.classics?stkn=MTI1dHJmdHltejdoZw%3D%3D&utm_source=qr',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@reborn.classics?_r=1&_t=ZS-99XHwjcMnLU',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    }
  ];

  return (
    <footer className="bg-[#0e0e0e] pt-16 text-white/75 text-base overflow-hidden">
      <div className="max-w-300 mx-auto px-8 grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-x-8 gap-y-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/reborn logo3.png" alt="reborn" className="w-30 object-contain" />
          </div>
          <p className="text-white font-medium">Wear Confidence.</p>
          <p className="text-sm leading-relaxed text-white/60">
            Premium fashion for every occasion — from corporate essentials to modern streetwear. Crafted for those who lead with confidence.
          </p>
          <div className="flex gap-3 mt-2">
            {socialIcons.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[11.2px] uppercase font-bold text-white mb-4.5 tracking-widest">Quick Links</h4>
          <nav className="flex flex-col gap-2.5">
            {['Home', 'Shop by Category', 'All Products', 'About Us', 'Contact Us'].map(link => (
              <a key={link} href={link === 'Home' ? '/' : link === 'Shop by Category' ? '/en-ng/collections/mbl-all-star' : link === 'All Products' ? '/en-ng/collections/apparels' : link === 'About Us' ? '/about' : '/contact'} className="text-[13.6px] text-white/60 hover:text-white transition-colors decoration-none">
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-[11.2px] uppercase font-bold text-white mb-4.5 tracking-widest">Shop</h4>
          <nav className="flex flex-col gap-2.5">
            {['Button Shirts', 'Complete-Set', 'Hoodies & Sweatshirts', 'Trousers & Pants', 'Tote-Bag'].map(link => (
              <a key={link} href={link === 'Button Shirts' ? '/en-ng/collections/button-shirts' : link === 'Complete-Set' ? '/en-ng/collections/complete-set' : link === 'Hoodies & Sweatshirts' ? '/en-ng/collections/hoodies-sweatshirts' : link === 'Trousers & Pants' ? '/en-ng/collections/pants' : '/en-ng/collections/tote-bag'} className="text-[13.6px] text-white/60 hover:text-white transition-colors decoration-none">
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-[11.2px] uppercase font-bold text-white mb-4.5 tracking-widest">Contact Us</h4>
            <div className="flex flex-col gap-3 text-[13.6px]">
              <div className="flex items-center gap-2.5">
                <span><Mail size={18} color="#ababab" /></span>
                <a href="mailto:rebornstore@gmail.com" className="text-white/60 hover:text-white">rebornstore@gmail.com</a>
              </div>
              <div className="flex items-center gap-2.5">
                <span><Phone size={18} color="#ababab" /></span>
                <a href="tel:+2347087990133" className="text-white/60 hover:text-white">+234 708 799 0133</a>
              </div>
              <div className="flex items-center gap-2.5">
                <span><MapPin size={18} color="#ababab" /></span>
                <span className="text-white/60">Lagos State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span><img src="/images/whatsapp (1).png" alt="" className="w-5"/></span>
                <a href="https://wa.me/23407087990133" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:underline decoration-white/30">Chat on WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md text-[12px] w-fit">
            <span>🔒</span>
            <span className="text-white/60">Secure checkout via WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-13 border-t border-white/10 px-8 py-5">
        <div className="max-w-300 mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-white/40">
          <p>© 2026: all rights reserverd</p>
          <div className="flex items-center gap-2">
            <span>Wear REBORN · Wear Confidence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;