import { Step, StepLabel, Stepper } from '@mui/material';
import { formatDate } from '../../utils/functions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';

const TrackStepper = ({ activeStep, orderOn, shippedAt, deliveredAt }) => {

    const steps = [
        {
            status: "Ordered",
            dt: formatDate(orderOn),
            icon: <InventoryIcon fontSize="small" />
        },
        {
            status: "Shipped",
            dt: formatDate(shippedAt),
            icon: <LocalShippingIcon fontSize="small" />
        },
        {
            status: "Delivered",
            dt: formatDate(deliveredAt),
            icon: <CheckCircleIcon fontSize="small" />
        },
    ];

    const CustomStepIcon = ({ active, completed, icon }) => {
        if (completed) {
            return (
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] z-10 relative transform hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            );
        }
        if (active) {
            return (
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(245,158,11,0.5)] z-10 relative ring-4 ring-yellow-50 animate-pulse-scale">
                    {icon}
                </div>
            );
        }
        return (
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-slate-50/80 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-300 z-10 relative shadow-sm">
                {icon}
            </div>
        );
    };

    return (
        <div className="w-full">
            <Stepper activeStep={activeStep} alternativeLabel className="w-full !bg-transparent">
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index}
                        completed={activeStep > index}
                    >
                        <StepLabel
                            StepIconComponent={(props) => (
                                <CustomStepIcon 
                                    active={props.active} 
                                    completed={props.completed} 
                                    icon={item.icon}
                                />
                            )}
                        >
                            <div className="flex flex-col items-center mt-3 md:mt-4 gap-1.5">
                                <span className={`text-[11px] md:text-sm font-semibold uppercase tracking-widest ${activeStep >= index ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {item.status}
                                </span>
                                {item.dt !== "Invalid Date" && (
                                    <span className="text-[9px] md:text-xs font-semibold text-slate-400/80 uppercase tracking-wider">
                                        {item.dt}
                                    </span>
                                )}
                            </div>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default TrackStepper;
