import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const categories = [
    { name: "Veg", img: "/images/vegg.jpg", link: "/veg" },
    { name: "Non Veg", img: "/images/nonveg.jpg", link: "/nonveg" },
    { name: "Milk", img: "/images/dairyproducts.jpeg", link: "/milk" },
    { name: "Chocolate", img: "/images/chocolatep.jpeg", link: "/chocolate" },
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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. HERO SECTION (Split Layout) */}
      <section className="bg-orange-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Text Content Left */}
          <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Satisfy your cravings with <br />
              <span className="text-orange-500">Foody Sensations</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Fresh, mouth-watering food delivered right to your doorstep. Fast,
              easy, and undeniably tasty!
            </p>
            <Link
              to="/veg"
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/40 hover:-translate-y-1"
            >
              Explore Menu
            </Link>
          </div>

          {/* Visual Content Right */}
          <div className="md:w-1/2 w-full h-64 md:h-[400px] relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <video
              autoPlay
              muted
              loop
              className="absolute w-full h-full object-cover"
            >
              <source src="/images/h.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          What's on your mind?
        </h2>

        {/* Using a flex layout for standard app-like category circles */}
        <div className="flex flex-wrap gap-8 justify-center md:justify-between items-center">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={cat.link}
              className="group flex flex-col items-center gap-3 w-32"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md border-2 border-transparent group-hover:border-orange-400 group-hover:shadow-lg transition-all">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-orange-500 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED ITEMS SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Top Dishes for you
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                {/* Overlay gradient for a premium look */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                    {item.title}
                  </h3>
                  <span className="bg-green-100 text-green-700 font-bold px-2 py-1 text-sm rounded-lg shrink-0">
                    ₹{item.price}
                  </span>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 bg-gray-100 text-gray-700 font-medium text-sm px-2 py-1 rounded-md">
                    <span className="text-yellow-500">★</span> {item.rating}
                  </span>
                  <span className="text-orange-500 text-sm font-semibold hover:underline">
                    View Category →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
