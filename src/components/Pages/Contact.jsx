import MetaData from '../Layouts/MetaData';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { createContact } from '../../actions/contactusAction';
import { NEW_CONTACTUS_RESET } from '../../constants/contactusConstants';
import Swal from 'sweetalert2';

const Contact = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, error, success, message } = useSelector(
        (state) => state.newContactus || {}
    );

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        dispatch(createContact(formData));
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: "Inquiry Received",
                text: "Our medical staff will be in touch shortly.",
                icon: "success",
                confirmButtonColor: '#15803d'
            });

            const timer = setTimeout(() => {
                dispatch({ type: NEW_CONTACTUS_RESET });
            }, 100);
            return () => clearTimeout(timer);
        }

        if (error) {
            Swal.fire({
                title: "Transmission Failed",
                text: "Please verify your information and try again.",
                icon: "error",
                confirmButtonColor: '#d97706',
                timer: 2000,
            });
        }
    }, [success, error, message, enqueueSnackbar, dispatch]);

    const contactInfo = [
        {
            icon: <PhoneIcon sx={{ fontSize: 28 }} />,
            title: "Phone Support",
            desc: "Speak directly with our team",
            details: ["+91 63805 18171"],
            color: "text-primary-green",
            bg: "bg-primary-green/10"
        },
        {
            icon: <EmailIcon sx={{ fontSize: 28 }} />,
            title: "Email Inquiries",
            desc: "Send us a detailed message",
            details: ["shreekishanaayushi@gmail.com"],
            color: "text-primary-orange",
            bg: "bg-primary-orange/10"
        },
        {
            icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
            title: "Headquarters",
            desc: "Visit our clinical center",
            details: ["123 Medical Innovation Lane", "Health City, HC 12345"],
            color: "text-primary-green",
            bg: "bg-primary-green/10"
        },
        {
            icon: <AccessTimeIcon sx={{ fontSize: 28 }} />,
            title: "Operating Hours",
            desc: "We are here when you need us",
            details: ["Mon - Sun: 24/7", "Always available for you"],
            color: "text-primary-orange",
            bg: "bg-primary-orange/10"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
            <MetaData title="Contact Us | Shree Kishan Aayushi" />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 bg-primary-green text-white text-center">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="absolute left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon fill="currentColor" points="0,100 100,0 100,100" />
                    </svg>
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
                        Let's Start a <span className="text-primary-orange">Conversation</span>
                    </h1>
                    <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto font-medium">
                        Whether you have a question about our medical products, pricing, or clinical procurement, our team is ready to answer all your questions.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <section className="container mx-auto px-4 -mt-10 relative z-20 pb-24">
                
                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactInfo.map((info, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${info.bg} ${info.color}`}>
                                {info.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{info.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">{info.desc}</p>
                            <div className="space-y-1">
                                {info.details.map((detail, i) => (
                                    <p key={i} className="text-gray-800 font-medium">{detail}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form & Support Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Inquiry Form */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
                        <div className="mb-8">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Send us a Message</h2>
                            <p className="text-gray-500 text-lg">Fill out the form below and we will get back to you promptly.</p>
                        </div>

                        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-green focus:border-primary-green'} rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-colors`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs font-semibold mt-2">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-green focus:border-primary-green'} rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-colors`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs font-semibold mt-2">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-green focus:border-primary-green'} rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-colors`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs font-semibold mt-2">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we assist you today?"
                                    rows="5"
                                    className={`w-full bg-gray-50 border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-green focus:border-primary-green'} rounded-xl px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-colors resize-none`}
                                />
                                {errors.message && <p className="text-red-500 text-xs font-semibold mt-2">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-10 py-4 bg-primary-orange hover:bg-orange-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-primary-orange/30 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                                {!loading && <SendIcon sx={{ fontSize: 20 }} />}
                            </button>
                        </form>
                    </div>

                    {/* Sidebar Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gradient-to-br from-primary-green to-green-800 rounded-3xl p-8 text-white shadow-xl shadow-green-900/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 text-white/10">
                                <SupportAgentIcon sx={{ fontSize: 160 }} />
                            </div>
                            
                            <div className="relative z-10">
                                <h3 className="text-2xl font-semibold mb-4">Need Urgent Help?</h3>
                                <p className="text-green-50 mb-8 opacity-90 leading-relaxed">
                                    Our clinical support team is available 24/7 for emergency inquiries and urgent medical procurement requests.
                                </p>
                                <button className="w-full py-4 bg-white text-primary-green hover:bg-gray-50 rounded-xl font-semibold text-base transition-colors shadow-md">
                                    Call Priority Line
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Why Choose Us?</h3>
                            <ul className="space-y-5">
                                {[
                                    { title: "Rapid Response", desc: "Replies within 2 hours" },
                                    { title: "Expert Team", desc: "Specialized clinical support" },
                                    { title: "Secure Data", desc: "HIPAA compliant privacy" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-green-100 text-primary-green flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-sm font-semibold">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
};

export default Contact;

