import { useEffect } from "react";
import Glide from "@glidejs/glide";

function Home() {
  useEffect(() => {
    const glide03 = new Glide(".glide-03", {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 3000,
      animationDuration: 700,
      gap: 0,
      classes: {
        activeNav: "[&>*]:bg-slate-700",
      },
    });

    glide03.mount();
  }, []);

  return (
    <>
      <header className="border-b shadow-sm px-6 py-3 flex items-center justify-between bg-cyan-600 font-poppins">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-cyan-600 rounded-full flex items-center justify-center font-bold shadow">
            V
          </div>
          <span className="text-xl font-semibold text-white">V1</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6">
          {["Home", "About", "Contact"].map((text) => (
            <a
              key={text}
              href="#"
              className="text-sm md:text-base font-medium text-white hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              {text}
            </a>
          ))}
        </nav>
      </header>

      {/* Slider */}
      <div className="relative w-full glide-03">
        {/* Slides */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="relative w-full p-0 whitespace-nowrap flex [backface-visibility:hidden] [transform-style:preserve-3d] [touch-action:pan-Y] [will-change:transform]">
            {[
              "image-05.jpg",
              "image-01.jpg",
              "image-02.jpg",
              "image-03.jpg",
              "image-04.jpg",
            ].map((img, i) => (
              <li key={i}>
                <img
                  src={`https://Tailwindmix.b-cdn.net/${img}`}
                  className="w-full max-w-full max-h-full m-auto"
                  alt={`Slide ${i + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Controls */}
        <div
          className="absolute left-0 flex items-center justify-between w-full h-0 px-4 top-1/2"
          data-glide-el="controls"
        >
          <button
            className="inline-flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 transition duration-300 border rounded-full text-slate-700 border-slate-700 hover:text-slate-900 hover:border-slate-900 bg-white/20"
            data-glide-dir="<"
            aria-label="Previous Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            className="inline-flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 transition duration-300 border rounded-full text-slate-700 border-slate-700 hover:text-slate-900 hover:border-slate-900 bg-white/20"
            data-glide-dir=">"
            aria-label="Next Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>

        {/* Indicators */}
        <div
          className="absolute bottom-0 flex items-center justify-center w-full gap-2"
          data-glide-el="controls[nav]"
        >
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              className="p-4 group"
              data-glide-dir={`=${i}`}
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className="block w-2 h-2 transition-colors duration-300 rounded-full ring-1 ring-slate-700 bg-white/20 focus:outline-none" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
