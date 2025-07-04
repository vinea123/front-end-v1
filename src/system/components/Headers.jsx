function Headers() {
    return (
      <header
        className=" shadow-sm px-6 py-2 flex items-center justify-between bg-cyan-800 "
        // style={{ backgroundColor: '#009DCA' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-[#009DCA] rounded-full flex items-center justify-center font-bold shadow">
            V
          </div>
          <span className="text-xl font-poppins text-white">V1</span>
        </div>

        {/* <p className="text-sm md:text-base font-medium text-white hover:text-slate-100 transition-colors cursor-pointer">
        vinea vinea
        </p> */}
      </header>
    );
  }

  export default Headers;
