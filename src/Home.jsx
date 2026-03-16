import React from "react";
import { Link } from "react-router-dom";
import { Clock, Truck, ChefHat } from "lucide-react";
import "./Home.css"; // Import the custom animations!

function Home() {
  const categories = [
    { name: "Pure Veg", img: "/images/vegg.jpg", link: "/veg" },
    { name: "Non Veg", img: "/images/nonveg.jpg", link: "/nonveg" },
    { name: "Dairy & Milk", img: "/images/dairyproducts.jpeg", link: "/milk" },
    { name: "Chocolates", img: "/images/chocolatep.jpeg", link: "/chocolate" },
  ];

  const featured = [
    {
      title: "Pav Bhaji",
      img: "/images/pavbhaji.jpg",
      price: 299,
      rating: 4.5,
      link: "/veg",
    },
    {
      title: "Chicken Biryani",
      img: "/images/chickenbiryani.jpeg",
      price: 349,
      rating: 4.6,
      link: "/nonveg",
    },
    {
      title: "Lassi",
      img: "/images/lassi.webp",
      price: 199,
      rating: 4.4,
      link: "/milk",
    },
    {
      title: "Chocolate Shake",
      img: "/images/chocolatemilkshake.jpeg",
      price: 249,
      rating: 4.7,
      link: "/chocolate",
    },
  ];

  const steps = [
    {
      icon: <ChefHat size={40} className="text-orange-500" />,
      title: "Choose Your Meal",
      desc: "Browse our diverse menu and pick your favorite cravings.",
    },
    {
      icon: <Clock size={40} className="text-orange-500" />,
      title: "We Cook It",
      desc: "Our top chefs prepare your meal with fresh ingredients.",
    },
    {
      icon: <Truck size={40} className="text-orange-500" />,
      title: "Fast Delivery",
      desc: "Hot and delicious food delivered right to your doorstep.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      {/* 1. HERO SECTION (Split Layout) */}
      <section className="bg-orange-50 pt-16 pb-24 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-14">
          {/* Text Content Left */}
          <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 animate-fade-in-up">
            <div className="bg-orange-100 text-orange-600 font-bold px-4 py-1.5 rounded-full mb-6 text-sm flex items-center gap-2 border border-orange-200 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              Superfast Delivery Available
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Satisfy your cravings with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Foody Sensations
              </span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
              Fresh, mouth-watering food delivered right to your doorstep. Fast,
              easy, and undeniably tasty!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/veg"
                className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 text-center"
              >
                Explore Menu 🚀
              </Link>
              <Link
                to="/orders"
                className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 text-center"
              >
                Track Order
              </Link>
            </div>
          </div>

          {/* Visual Content Right (With Float Animation!) */}
          <div className="md:w-1/2 w-full relative h-72 sm:h-96 md:h-[500px] animate-float">
            {/* Decorative background blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-200 to-yellow-100 rounded-full blur-3xl opacity-60 -z-10"></div>

            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-200">
              <video
                autoPlay
                muted
                loop
                className="absolute w-full h-full object-cover"
              >
                <source src="/images/h.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Floating Review Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-float-delayed">
              <div className="text-3xl">⭐</div>
              <div>
                <p className="font-bold text-gray-800">4.8/5 Rating</p>
                <p className="text-xs text-gray-500 font-medium">
                  10k+ Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            What's on your mind?
          </h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-wrap gap-6 md:gap-8 justify-center items-center">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={cat.link}
              className="group flex flex-col items-center gap-4 w-32 md:w-40"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-orange-400 group-hover:shadow-2xl transition-all duration-300 relative">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <span className="font-bold text-gray-700 text-lg group-hover:text-orange-500 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW: HOW IT WORKS SECTION */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              How It Works
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Your favorite food, just three steps away!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-gray-50 rounded-3xl hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-6 relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-gray-50">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED ITEMS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Top Dishes for you
            </h2>
            <div className="w-24 h-1.5 bg-orange-500 mt-4 rounded-full"></div>
          </div>
          <Link
            to="/veg"
            className="hidden md:block text-orange-500 font-bold hover:underline"
          >
            View All Menu →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden flex flex-col h-full border border-gray-100 group"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative bg-white">
                {/* Floating Price Tag */}
                <div className="absolute -top-5 right-5 bg-green-500 text-white font-extrabold px-4 py-1.5 rounded-full shadow-lg border-2 border-white">
                  ₹{item.price}
                </div>

                <h3 className="font-extrabold text-xl text-gray-800 line-clamp-1 mb-1 mt-2">
                  {item.title}
                </h3>
                <span className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                  <span className="text-yellow-500 text-lg">★</span>{" "}
                  {item.rating} • Fast Delivery
                </span>

                <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between text-orange-500 font-bold group-hover:text-orange-600">
                  Order Now{" "}
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW: PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>

          <div className="md:w-2/3 text-center md:text-left z-10 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Get <span className="text-orange-500">20% Off</span> on your first
              order!
            </h2>
            <p className="text-gray-400 text-lg max-w-lg">
              Sign up today and use the promo code{" "}
              <span className="text-white font-bold bg-gray-700 px-2 py-1 rounded">
                RATAN20
              </span>{" "}
              at checkout to claim your discount.
            </p>
          </div>

          <div className="z-10">
            <Link
              to="/signup"
              className="bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition shadow-lg hover:shadow-orange-500/40 inline-block"
            >
              Claim Offer Now 🎉
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
