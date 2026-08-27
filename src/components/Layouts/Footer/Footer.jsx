import { useEffect, useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import StarsIcon from '@mui/icons-material/Stars';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HelpIcon from '@mui/icons-material/Help';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import paymentMethods from '../../../assets/images/payment-methods.svg';
import { useLocation } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const footerLinks = [
  {
    title: "About",
    links: [
      { name: "Contact Us", redirect: "/contact" },
      { name: "About Shree Kishan Aayushi", redirect: "/about" },
      { name: "Careers", redirect: "#" },
      { name: "Pharmacy Network", redirect: "#" }
    ]
  },
  {
    title: "Support",
    links: [
      { name: "Payments", redirect: "#" },
      { name: "Medicine Delivery", redirect: "#" },
      { name: "Returns & Refunds", redirect: "#" },
      { name: "FAQ", redirect: "#" }
    ]
  },
  {
    title: "Policies",
    links: [
      { name: "Terms Of Use", redirect: "#" },
      { name: "Privacy Policy", redirect: "#" },
      { name: "Medicine Safety", redirect: "#" },
      { name: "Prescription Policy", redirect: "#" }
    ]
  }
];

const Footer = () => {
  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"))
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <footer className="w-full bg-[#064e3b] text-white pt-20 pb-10 relative overflow-hidden no-print shadow-inner border-t-4 border-primary-orange">
          <div className="container mx-auto px-6 relative z-10">
            
            {/* Top Section - Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/10 rounded-3xl p-8 mb-16 backdrop-blur-sm border border-white/20">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-orange/20 flex items-center justify-center text-primary-orange">
                  <StarsIcon sx={{ fontSize: 28 }} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Premium Quality</h4>
                  <p className="text-sm text-green-100">Certified medical supplies</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-orange/20 flex items-center justify-center text-primary-orange">
                  <WorkIcon sx={{ fontSize: 28 }} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Professional Grade</h4>
                  <p className="text-sm text-green-100">Trusted by hospitals</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-orange/20 flex items-center justify-center text-primary-orange">
                  <CardGiftcardIcon sx={{ fontSize: 28 }} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Special Offers</h4>
                  <p className="text-sm text-green-100">Discounts on bulk orders</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-orange/20 flex items-center justify-center text-primary-orange">
                  <HelpIcon sx={{ fontSize: 28 }} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">24/7 Support</h4>
                  <p className="text-sm text-green-100">Expert medical assistance</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
              
              {/* Brand Profile - Column 1 */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight mb-1">
                    SHREE KISHAN <span className="text-primary-orange">AAYUSHI</span>
                  </h2>
                  <p className="text-sm font-semibold uppercase tracking-widest text-green-200">
                    Clinical Procurement Partner
                  </p>
                </div>
                <p className="text-green-50 text-base leading-relaxed max-w-sm">
                  Advancing the frontier of clinical accessibility through digital integration. Your primary partner in medical designation and procurement.
                </p>
                <div className="flex gap-4 pt-2">
                  {[FacebookIcon, TwitterIcon, LinkedInIcon].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-orange flex items-center justify-center transition-colors duration-300">
                      <Icon sx={{ fontSize: 20 }} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Navigation - Columns 2, 3, 4 */}
              <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
                {footerLinks.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-base font-semibold uppercase tracking-wider text-green-200 mb-6">{section.title}</h3>
                    <ul className="space-y-4">
                      {section.links.map((link, i) => (
                        <li key={i}>
                          <a href={link.redirect} className="text-base text-white/80 hover:text-primary-orange transition-colors duration-300">
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Operations Center - Column 5 */}
              <div className="lg:col-span-3 space-y-6">
                <h3 className="text-base font-semibold uppercase tracking-wider text-green-200 mb-6">Contact Us</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <LocationOnIcon sx={{ fontSize: 20, color: '#fcd34d' }} />
                  </div>
                  <p className="text-base text-green-50 leading-relaxed">
                    Sector 09, Shree Kishan Aayushi Plaza,<br />
                    Health Metropolis.
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <LocalPhoneIcon sx={{ fontSize: 20, color: '#fcd34d' }} />
                  </div>
                  <div>
                    <p className="text-base font-semibold">+91 63805 18171</p>
                    <p className="text-sm text-green-200">Mon-Sun: 24/7 Support</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <EmailIcon sx={{ fontSize: 20, color: '#fcd34d' }} />
                  </div>
                  <p className="text-base font-semibold">shreekishanaayushi@gmail.com</p>
                </div>

              </div>
            </div>

            {/* Bottom Footer - Copyright & Payments */}
            <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-xs text-green-200 text-center md:text-left">
                &copy; {new Date().getFullYear()} Shree Kishan Aayushi Group. All rights reserved. Registered across 14 territories.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-green-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  AES-256 Secured
                </span>
                <img src={paymentMethods} alt="Secured Payments" className="h-6 opacity-80" />
              </div>
            </div>

          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;