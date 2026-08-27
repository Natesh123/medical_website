import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import { useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';

const Account = () => {
    const { user, loading } = useSelector((state) => state.user);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <MetaData title="My Profile | Shree Kishan Aayushi" />

            <main className="min-h-screen bg-slate-50 pt-20 pb-20 relative overflow-hidden">
                
                {/* Subtle Background Elements */}
                <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                    
                    {/* Top Cover Banner */}
                    <div className="h-48 md:h-64 w-full rounded-t-[2.5rem] bg-gradient-to-r from-[#064e3b] via-[#0a664e] to-[#043326] relative overflow-hidden shadow-lg mt-6">
                        {/* Premium Pattern Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#f97316]/20 rounded-full blur-2xl"></div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-20 relative z-20">
                        
                        {/* Left Column: Identity Card */}
                        <div className="lg:col-span-4">
                            <div className="bg-white rounded-[2rem] p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col items-center text-center relative h-full">
                                
                                {/* Overlapping Avatar */}
                                <div className="relative -mt-24 mb-6">
                                    <div className="w-40 h-40 rounded-full bg-white p-2 shadow-xl">
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#064e3b] to-[#043326] flex items-center justify-center overflow-hidden border border-gray-100">
                                            {user?.profilePhoto?.url ? (
                                                <img src={user.profilePhoto.url} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-6xl font-semibold text-white uppercase tracking-tight">
                                                    {user?.name?.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 w-12 h-12 bg-[#f97316] rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                        <span className="text-white text-[10px] font-semibold uppercase tracking-wider">QR</span>
                                    </div>
                                </div>

                                {/* Core Identity */}
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-5">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                                    <span className="text-[#064e3b] text-[10px] font-semibold uppercase tracking-widest">Verified Identity</span>
                                </div>
                                
                                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight mb-2 capitalize">{user?.name}</h1>
                                <p className="text-gray-500 font-medium tracking-wide text-sm mb-8">{user?.email}</p>

                                <div className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 mb-8 flex justify-between items-center mt-auto">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Account Role</span>
                                    <span className="px-4 py-1.5 bg-[#064e3b] text-white rounded-lg text-[10px] font-semibold uppercase tracking-widest shadow-sm">
                                        {user?.role || 'User'}
                                    </span>
                                </div>

                                <Link to="/account/update" className="w-full py-4 bg-[#f97316] text-white rounded-2xl text-xs font-semibold uppercase tracking-widest shadow-[0_8px_20px_-6px_rgba(249,115,22,0.5)] hover:bg-[#ea580c] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-6px_rgba(249,115,22,0.6)] transition-all duration-300 flex items-center justify-center">
                                    Edit Profile 
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Data Ledgers */}
                        <div className="lg:col-span-8 space-y-6 mt-16 lg:mt-0">
                            
                            {/* Personal Ledger Card */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 transition-all hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)]">
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-50">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#064e3b]">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide">Personal Details</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-50">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
                                        <p className="text-gray-900 font-medium text-sm capitalize">{user?.name}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-50">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Gender</p>
                                        <p className="text-gray-900 font-medium text-sm capitalize">{user?.gender || 'Not Provided'}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-50">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Account Type</p>
                                        <p className="text-gray-900 font-medium text-sm capitalize">{user?.role || 'User'}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-50">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Member Since</p>
                                        <p className="text-gray-900 font-medium text-sm">{String(user.createdAt).substr(0, 10).split('-').reverse().join('-') || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Communication Ledger Card */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 transition-all hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)]">
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-50">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#f97316]">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900 uppercase tracking-wide">Communication</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-50 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                                            <p className="text-gray-900 font-medium text-sm">{user?.email}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-50">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Mobile Number</p>
                                        <p className="text-gray-900 font-medium text-sm">{user?.phone || '+91 - Not Provided'}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Doctor Professional Details - Conditional Render */}
                    {user?.role === 'doctor' && (
                        <div className="mt-6 mx-4 md:mx-8 relative z-20">
                            <div className="bg-white rounded-[2.5rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-10 transition-all hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)]">
                                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                                    <div className="w-12 h-12 rounded-2xl bg-[#064e3b]/5 flex items-center justify-center text-[#064e3b]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 uppercase tracking-wide">Professional Registry</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Primary Clinic</p>
                                        <p className="text-gray-900 font-medium text-base">{user?.clinicname || 'N/A'}</p>
                                        <p className="text-sm text-gray-500 mt-1">{user?.clinicAddress || 'Address not provided'}</p>
                                    </div>
                                    
                                    <div className="p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Credentials</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <p className="text-gray-900 font-medium text-base">{user?.qualification || 'N/A'}</p>
                                            <span className="px-2.5 py-0.5 bg-emerald-50 text-[#064e3b] rounded-lg text-[10px] font-semibold border border-emerald-100">{user?.specialization || 'General'}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Registration ID</p>
                                        <p className="text-gray-900 font-medium text-base uppercase">{user?.registrationNumber || 'N/A'}</p>
                                        <p className="text-sm text-gray-500 mt-1">{user?.medicalCouncilName || 'Council not specified'}</p>
                                    </div>
                                    
                                    <div className="md:col-span-3 pt-4 border-t border-gray-100">
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Digital Documentation</p>
                                        <div className="flex flex-wrap gap-4">
                                            {user?.registrationCertificate?.url && (
                                                <a href={user.registrationCertificate.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-2xl hover:border-[#064e3b] hover:shadow-md transition-all group shadow-sm">
                                                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#064e3b] group-hover:scale-110 transition-transform">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                    </div>
                                                    <div>
                                                        <span className="block text-[9px] font-semibold uppercase text-gray-400 tracking-wider">Verified</span>
                                                        <span className="block text-sm font-semibold text-gray-900">Medical Certificate</span>
                                                    </div>
                                                </a>
                                            )}
                                            
                                            {user?.doctorIdProof?.url && (
                                                <a href={user.doctorIdProof.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-2xl hover:border-[#f97316] hover:shadow-md transition-all group shadow-sm">
                                                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#f97316] group-hover:scale-110 transition-transform">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                                                    </div>
                                                    <div>
                                                        <span className="block text-[9px] font-semibold uppercase text-gray-400 tracking-wider">Identity</span>
                                                        <span className="block text-sm font-semibold text-gray-900">Govt. ID Proof</span>
                                                    </div>
                                                </a>
                                            )}

                                            {!user?.registrationCertificate?.url && !user?.doctorIdProof?.url && (
                                                <span className="text-gray-400 text-sm font-medium italic">No credentials uploaded.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </>
    );
};

export default Account;
