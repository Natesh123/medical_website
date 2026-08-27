// Text-only about cards (no images/icons)

const AboutCards = () => {
    const values = [
        {
            title: "Quality Care",
            description: "Trusted medical products sourced from certified suppliers"
        },
        {
            title: "Fast Delivery",
            description: "Quick and reliable shipping to your doorstep"
        },
        {
            title: "Secure Transactions",
            description: "Safe and encrypted payment processing"
        },
        {
            title: "Expert Support",
            description: "24/7 customer assistance from healthcare professionals"
        },
        {
            title: "Customer First",
            description: "Your satisfaction is our top priority"
        },
        {
            title: "Award Winning",
            description: "Recognized for excellence in healthcare retail"
        }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                        <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutCards;