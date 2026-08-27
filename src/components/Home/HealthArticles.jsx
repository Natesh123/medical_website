import tipsImg from '../../../src/assets/images/Home/health_tips.svg';

const HealthArticles = () => {
    const articles = [
        { title: 'Daily Medication Tips', img: tipsImg, excerpt: 'Simple, practical steps for consistent medication routines.' },
        { title: 'Home Health Monitoring', img: tipsImg, excerpt: 'Choose the right devices and track vitals like a pro.' },
        { title: 'Nutrition & Immunity', img: tipsImg, excerpt: 'Basic nutrition practices that support overall wellness.' }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Health Articles</h2>
                <p className="text-sm text-gray-500">Expert tips, practical advice & quick guides</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {articles.map((a, i) => (
                    <article key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <img src={a.img} alt={a.title} className="w-full h-36 object-cover rounded-md mb-3" />
                        <h3 className="font-semibold text-gray-900">{a.title}</h3>
                        <p className="text-sm text-gray-600">{a.excerpt}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default HealthArticles;
