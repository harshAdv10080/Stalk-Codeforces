import { Link } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      id: "plagiarism-check",
      title: "Plagiarism Checker",
      description: "Detect if a user has been flagged for plagiarism and get detailed information about their flagged submissions.",
      icon: "🔍",
      link: "/plag",
      gradient: "from-red-400 to-pink-500"
    },
    {
      id: "profile-overview",
      title: "Profile Overview",
      description: "Visualize user statistics including question difficulty ratings, solved problems, and recent contest performances.",
      icon: "👤",
      link: "/profile",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      id: "problem-insights",
      title: "Problem Insights",
      description: "Filter solved problems based on difficulty levels and tags to identify patterns and improve your preparation strategy.",
      icon: "📊",
      link: "/problems",
      gradient: "from-green-400 to-blue-500"
    },
    {
      id: "compare-profiles",
      title: "Compare Profiles",
      description: "Compare two Codeforces users side-by-side with visual insights into their stats, problems, and tags.",
      icon: "⚖️",
      link: "/compare",
      gradient: "from-purple-400 to-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen text-secondary-800">
      {/* Hero Section */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 opacity-70"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-6xl lg:text-7xl font-extrabold mb-8 bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent leading-tight">
              Welcome to CF Stalker
            </h1>
            <p className="text-xl lg:text-2xl mb-12 text-secondary-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Stalk Codeforces profiles, detect plagiarisms, and uncover insightful trends effortlessly with our powerful analytics platform.
            </p>
            <a
              href="#features"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-large hover:shadow-glow"
            >
              <span>Explore Features</span>
              <span className="text-lg">✨</span>
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-accent-200 rounded-full opacity-20 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>

        <div className="mt-20">
          <div className="h-px bg-gradient-to-r from-transparent via-secondary-300 to-transparent"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-secondary-700 to-secondary-900 bg-clip-text text-transparent">
              Key Features
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover powerful tools designed to enhance your Codeforces experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative bg-card-gradient rounded-2xl p-8 text-center border border-secondary-200 shadow-soft hover:shadow-large transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-secondary-800 group-hover:text-primary-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                  <Link
                    to={feature.link}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r ${feature.gradient} text-white hover:shadow-glow transition-all duration-300 transform hover:scale-105`}
                  >
                    <span>Learn More</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
