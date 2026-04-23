import Link from "next/link";
import { ArrowRight, Settings, Zap, ShieldCheck, Box } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-48 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Keep Your Fleet Moving. <br />
            <span className="text-blue-500">Instant Availability.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-10 font-light leading-relaxed">
            The modern way to source heavy machinery parts. Search millions of SKUs, view real-time inventory, and order instantly.
          </p>
          
          {/* Quick Search Widget */}
          <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-2xl">
            <select className="flex-1 bg-white/5 border border-white/10 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none">
              <option value="" className="text-black">Select Make...</option>
              <option value="cat" className="text-black">Caterpillar</option>
              <option value="deere" className="text-black">John Deere</option>
              <option value="komatsu" className="text-black">Komatsu</option>
            </select>
            <select className="flex-1 bg-white/5 border border-white/10 text-white p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none">
              <option value="" className="text-black">Select Model...</option>
            </select>
            <Link href="/search" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-xl transition flex items-center justify-center gap-2 sm:w-auto w-full">
              Find Parts <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shop by Category</h2>
          <p className="mt-4 text-lg text-gray-500">Everything you need to repair, rebuild, and maintain your equipment.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Construction", icon: ShieldCheck, desc: "Excavator & loader parts", color: "bg-yellow-100 text-yellow-700" },
            { name: "Agriculture", icon: Settings, desc: "Tractor & combine parts", color: "bg-green-100 text-green-600" },
            { name: "Material Handling", icon: Box, desc: "Forklift & lift parts", color: "bg-blue-100 text-blue-600" },
            { name: "Forestry", icon: Zap, desc: "Feller buncher & skidder parts", color: "bg-orange-100 text-orange-600" },
          ].map((cat, i) => (
            <Link key={i} href={`/categories/${cat.name.toLowerCase().replace(' ', '-')}`} className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300">
              <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{cat.name}</h3>
              <p className="text-gray-500 text-sm">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}