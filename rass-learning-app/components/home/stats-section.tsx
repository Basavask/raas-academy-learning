import { statsData } from './stats-data'

type Stat = {
  value: string;
  label: string;
};

export function StatsSection() {
  return (
    <section className="bg-[rgb(59,130,246)] dark:bg-black py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-white/80 mb-2 text-base md:text-lg">Built around your Aspirations.</p>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Back yourself today. Build a career that lasts a lifetime.</h2>
        <p className="text-white/80 mb-10 md:mb-14 max-w-3xl mx-auto text-base md:text-lg">
          RAAS Academy empowers you with cutting-edge, career-focused learning through a perfect mix of live instruction, hands-on projects, and expert mentorship. Our personalized upskilling journeys keep you engaged, inspired, and ready to thrive in today&apos;s dynamic world.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((stat: Stat) => (
            <div
              key={stat.label}
              className="bg-[#2563ff] rounded-xl py-10 px-6 flex flex-col items-center justify-center text-white shadow-lg"
            >
              <div className="text-5xl md:text-6xl font-extrabold mb-2">{stat.value}</div>
              <div className="text-lg md:text-xl font-medium opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 