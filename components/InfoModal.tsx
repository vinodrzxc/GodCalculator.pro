
import React, { useState } from 'react';
import { X, Mail, Send, Shield, FileText, CheckCircle2 } from 'lucide-react';
import Button from './Button';

type InfoType = 'privacy' | 'terms' | 'contact';

interface InfoModalProps {
  type: InfoType;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    setIsSent(true);
    setTimeout(() => {
      onClose();
      setIsSent(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <div className="space-y-4 text-sm leading-relaxed opacity-90" style={{ color: 'var(--text-sec)' }}>
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h3 className="text-base font-bold mt-4" style={{ color: 'var(--text-main)' }}>1. Introduction</h3>
            <p>Welcome to GodCalculator.pro. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your information when you visit our website.</p>

            <h3 className="text-base font-bold mt-4" style={{ color: 'var(--text-main)' }}>2. Data Collection</h3>
            <p>We do not collect personally identifiable information (PII) on our servers. Most calculations are performed locally on your device.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Local Storage:</strong> We use your browser's Local Storage to save your preferences (Theme, View Mode) and Calculation History. This data never leaves your device.</li>
              <li><strong>AI Features:</strong> If you use the AI Math Solver, your prompt is sent to Google's Gemini API for processing. It is not stored by us, but is subject to Google's privacy policy.</li>
            </ul>

            <h3 className="text-base font-bold mt-4" style={{ color: 'var(--text-main)' }}>3. Cookies</h3>
            <p>We use essential cookies/local storage solely for the purpose of remembering your settings (Dark/Light mode, History). We do not use tracking cookies for advertising purposes.</p>

            <h3 className="text-base font-bold mt-4" style={{ color: 'var(--text-main)' }}>4. Third-Party Services</h3>
            <p>We may use third-party services such as Google Analytics to understand website traffic. These services may collect anonymous usage data.</p>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-4 text-sm leading-relaxed opacity-90" style={{ color: 'var(--text-sec)' }}>
            <p>Last Updated: {new Date().toLocaleDateString()}</p>

            <h3 className="text-base font-bold mt-4" style={{ color: 'var(--text-main)' }}>1. Acceptance of Terms</h3>
            <p>By accessing and using GodCalculator.pro, you accept and agree to be bound by the terms and provision of this agreement.</p>

            <h3 className="text-base font-bold mt-4" style={{ color: 'var(--text-main)' }}>2. Disclaimer of Warranties</h3>
            <p>The tools and calculators provided on this website are for informational and educational purposes only.</p>
            <p className="font-semibold">We do not guarantee the accuracy, completeness, or reliability of any results.</p>
            <p>Financial, medical, and legal decisions should not be made based solely on these calculators. Always consult a qualified professional.</p>

            <h3 className="text-base font-bold mt-4" style={{ color: 'var(--text-main)' }}>3. Limitation of Liability</h3>
            <p>GodCalculator.pro and its owners shall not be liable for any damages or losses arising from the use or inability to use the tools provided on this site.</p>

            <h3 className="text-base font-bold mt-4" style={{ color: 'var(--text-main)' }}>4. Intellectual Property</h3>
            <p>All content, design, and code on this website are the property of GodCalculator.pro unless otherwise stated.</p>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
             {isSent ? (
               <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                   <CheckCircle2 className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>Message Sent!</h3>
                 <p style={{ color: 'var(--text-sec)' }}>We'll get back to you shortly.</p>
               </div>
             ) : (
               <form onSubmit={handleSend} className="flex flex-col gap-4">
                 <p className="text-sm mb-2" style={{ color: 'var(--text-sec)' }}>
                   Have a suggestion, found a bug, or just want to say hi? Fill out the form below.
                 </p>
                 <div>
                   <label className="text-xs font-bold uppercase mb-1 block opacity-70" style={{ color: 'var(--text-sec)' }}>Name</label>
                   <input 
                     required
                     type="text" 
                     className="w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                     style={{ borderColor: 'var(--border)', color: 'var(--text-main)', backgroundColor: 'var(--secondary)' }}
                     value={contactForm.name}
                     onChange={e => setContactForm({...contactForm, name: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="text-xs font-bold uppercase mb-1 block opacity-70" style={{ color: 'var(--text-sec)' }}>Email</label>
                   <input 
                     required
                     type="email" 
                     className="w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                     style={{ borderColor: 'var(--border)', color: 'var(--text-main)', backgroundColor: 'var(--secondary)' }}
                     value={contactForm.email}
                     onChange={e => setContactForm({...contactForm, email: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="text-xs font-bold uppercase mb-1 block opacity-70" style={{ color: 'var(--text-sec)' }}>Message</label>
                   <textarea 
                     required
                     rows={4}
                     className="w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                     style={{ borderColor: 'var(--border)', color: 'var(--text-main)', backgroundColor: 'var(--secondary)' }}
                     value={contactForm.message}
                     onChange={e => setContactForm({...contactForm, message: e.target.value})}
                   />
                 </div>
                 <Button variant="rose" type="submit" className="mt-2 py-3">
                   <Send className="w-4 h-4 mr-2" /> Send Message
                 </Button>
               </form>
             )}
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms of Service';
      case 'contact': return 'Contact Us';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'privacy': return <Shield className="w-5 h-5 text-emerald-500" />;
      case 'terms': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'contact': return <Mail className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border flex flex-col max-h-[85vh] animate-in zoom-in-95"
           style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        
        <div className="p-4 border-b flex justify-between items-center shrink-0"
             style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(var(--rgb-bg-app), 0.1)' }}>
          <div className="flex items-center gap-2.5">
             {getIcon()}
             <h2 className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>{getTitle()}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/10 transition-colors" style={{ color: 'var(--text-sec)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
           {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default InfoModal;
