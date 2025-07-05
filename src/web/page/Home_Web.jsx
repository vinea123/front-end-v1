function Home() {
    return (
      <>
      <header className="shadow-sm px-6 py-2 flex items-center justify-between bg-cyan-800">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-white text-[#009DCA] rounded-full flex items-center justify-center font-bold shadow">
      V
    </div>
    <span className="text-xl font-poppins text-white">V1</span>
  </div>

  {/* Navigation Links */}
  <nav className="hidden md:flex gap-6 font-poppins">
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

      <main className="p-6 font-poppins text-gray-800">
        <h1 className="text-2xl font-semibold">Welcome to the Dashboard!</h1>
        <p className="mt-2 text-sm text-gray-600">We're glad to have you here, Vinea.</p>
      </main>
      </>
      
      
    );
}

export default Home;
