const WhyUsSection = () => {
  const services = [
    { step: "STEP 1", label: "Pickup", icon: "pickup.svg" },
    { step: "STEP 2", label: "Wash & Dry", icon: "wasndry.svg" },
    { step: "STEP 3", label: "Fold", icon: "fold.svg" },
    { step: "STEP 4", label: "Delivery", icon: "delivery.svg" }
  ];

  return (
    <section id="service" className="bg-[#b2d7fa] text-[#253b54] py-16 text-center">
      <h2 className="text-3xl font-bold mb-10">Mengapa Kami?</h2>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {services.map(({ step, label, icon }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md py-7 w-56 flex flex-col items-center transition hover:shadow-lg"
          >
            <span className="text-blue-500 text-base mb-2 font-semibold">{step}</span>
            <img src={`/assets/${icon}`} alt={label} className="w-16 h-16 mb-3" />
            <p className="text-lg font-medium">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;
