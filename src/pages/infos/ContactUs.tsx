import { useState } from "react";


const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic matching the initContactForm() in main.js
    const whatsappMsg = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/2348134715916?text=${whatsappMsg}`, '_blank');
  };

  return (
    <section className="min-h-screen bg-[#f8f5f0] py-20 px-6 font-['room',sans-serif] text-[#36454f]">
      <div className="max-w-5xl mx-auto py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-4 tracking-tight uppercase">Contact Reborn</h1>
          <p className="text-lg opacity-80">We’d love to hear from you. Send us a message below.</p>
        </header>

        <div className="flex justify-between  gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-widest">General Inquiries</h3>
              <p className="opacity-70">info@reborn.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-widest">WhatsApp</h3>
              <p className="opacity-70">+234 708 799 0133</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-sm w-full md:w-1/2 rounded-lg">
            <div>
              <label className="block text-xs font-bold uppercase mb-2 tracking-widest">Full Name</label>
              <input 
                type="text" 
                placeholder="NAME"
                required
                className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-2 tracking-widest">Email</label>
              <input 
                type="email" 
                placeholder="EMAIL"
                required
                className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-2 tracking-widest">Message</label>
              <textarea 
                rows={4}
                placeholder="MESSAGE"
                required
                className="w-full border-b border-gray-300 py-2 focus:border-black outline-none transition-colors resize-none"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-[#36454f] text-white py-4 px-8 uppercase tracking-widest hover:bg-black transition-all"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;