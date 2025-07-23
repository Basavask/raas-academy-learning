const logos = [
  { src: "/vw-logo.svg", alt: "Volkswagen" },
  { src: "/samsung-logo.svg", alt: "Samsung" },
  { src: "/cisco-logo.svg", alt: "Cisco" },
  { src: "/vimeo-logo.svg", alt: "Vimeo" },
  { src: "/pandg-logo.svg", alt: "P&G" },
  { src: "/hpe-logo.svg", alt: "Hewlett Packard Enterprise" },
  { src: "/citi-logo.svg", alt: "Citi" },
  { src: "/ericsson-logo.svg", alt: "Ericsson" },
];

export function LogosSlider() {
  return (
    <div className="w-full bg-white dark:bg-gray-900 py-12 md:py-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <p className="text-center text-gray-600 dark:text-gray-400 text-xl md:text-2xl mb-6 font-medium">
          Trusted by over 16,000 companies and millions of learners around the world
        </p>
        <div className="overflow-hidden w-full">
          <div className="flex gap-24 md:gap-32 animate-logo-scroll items-center" style={{ minWidth: '1800px', height: '96px' }}>
            {logos.concat(logos).map((logo, idx) => (
              <img key={idx} src={logo.src} alt={logo.alt} className="h-16 md:h-20 grayscale opacity-70" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 