import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

const Stepper = ({ activeStep, children }) => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`;

    const steps = [
        {
            label: "LOGIN",
            desc: <span className="font-medium">{user.name} &bull; <span className="font-normal text-slate-400">{user.email}</span></span>
        },
        {
            label: "DELIVERY ADDRESS",
            desc: <span className="font-medium">{user.name} &bull; <span className="font-normal text-slate-400">{address}</span></span>
        },
        {
            label: "ORDER SUMMARY",
            desc: <span className="font-medium">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</span>
        },
        {
            label: "PAYMENT OPTIONS",
            desc: <span className="font-medium">Pending</span>
        }
    ]

    const handleEditStep = (index) => {
        if (index === 1) {
            navigate('/shipping');
        } else if (index === 2) {
            navigate('/order/confirm');
        }
    };

    return (
        <div className="flex flex-col gap-6">

            {steps.map((step, index) => {

                return (
                    <div key={index} className="w-full">
                        {activeStep === index ? (
                            <div className="flex flex-col animate-fade-in-up">
                                <div className="flex items-center rounded-t-[2rem] bg-gradient-to-r from-emerald-600 to-teal-700 px-8 py-6 gap-5 shadow-sm relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/20 transition-colors duration-700"></div>
                                    <span className="relative z-10 h-10 w-10 flex items-center justify-center text-sm font-semibold bg-white rounded-xl text-emerald-700 shadow-lg">{index + 1}</span>
                                    <div className="relative z-10">
                                        <h2 className="font-semibold text-white text-base tracking-widest shadow-sm">{step.label}</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                            <p className="text-[9px] text-emerald-50 font-semibold uppercase tracking-widest">Current Step</p>
                                        </div>
                                    </div>
                                </div>
                                {children}
                            </div>
                        ) : (
                            <Step
                                isDesc={activeStep > index}
                                {...step}
                                index={index}
                                onClick={() => handleEditStep(index)}
                            />
                        )}
                    </div>
                )
            })}

        </div>
    );
};

const Step = ({ isDesc, label, desc, index, onClick }) => {
    // Login step (index 0) is never editable in this flow
    const isEditable = isDesc && index !== 0;

    return (
        <div 
            onClick={isEditable ? onClick : undefined}
            className={`flex items-center bg-white px-8 py-6 rounded-[2rem] border transition-all duration-500 shadow-sm relative overflow-hidden group ${
                isEditable ? 'border-emerald-200 hover:border-emerald-300 hover:shadow-md cursor-pointer' 
                : isDesc ? 'border-slate-200' 
                : 'border-slate-200 opacity-60 grayscale'
            }`}
        >
            
            {/* Active Accent Bar */}
            {isDesc && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-teal-600"></div>}

            <span className={`w-12 h-12 flex items-center justify-center text-xs font-semibold rounded-[14px] mr-5 transition-all duration-500 ${isDesc ? 'bg-emerald-50 text-emerald-600 shadow-sm group-hover:scale-105 group-hover:bg-emerald-100' : 'bg-slate-50 text-slate-400'}`}>
                {isDesc ? <CheckIcon /> : (index + 1)}
            </span>
            <div className="flex flex-col">
                <h2 className={`font-semibold uppercase tracking-widest text-xs ${isDesc ? 'text-slate-900' : 'text-slate-500'}`}>
                    {label}
                </h2>
                {isDesc && (
                    <div className={`mt-1.5 text-xs font-semibold text-slate-500 transition-colors ${isEditable ? 'group-hover:text-slate-600' : ''}`}>
                        {desc}
                    </div>
                )}
            </div>
            {isEditable && (
                <div className="ml-auto flex flex-col items-end justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Edit Step</span>
                </div>
            )}
        </div>
    )
}

export default Stepper;
