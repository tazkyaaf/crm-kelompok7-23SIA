const WhyUsSection = () => {
  const services = [
    { step: "STEP 1", label: "Pickup", icon: "pickup.png" },
    { step: "STEP 2", label: "Wash & Dry", icon: "wash.png" },
    { step: "STEP 3", label: "Fold", icon: "fold.png" },
    { step: "STEP 4", label: "Delivery", icon: "delivery.png" }
  ];

  return (
    <section id="service" className="bg-[#b2d7fa] text-[#253b54] py-16 text-center">
      <h2 className="text-3xl font-bold mb-10">Mengapa Kami?</h2>
      <div className="flex flex-wrap justify-center gap-9 px-4">
        {services.map(({ step, label, icon }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md py-7 w-52 flex flex-col items-center transition hover:shadow-lg"
          >
            <span className="text-blue-500 text-base mb-2 font-bold">{step}</span>
            <img src={`/assets/${icon}`} alt={label} className="w-26 h-22 mb-3" />
            <p className="text-lg font-medium">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


export default WhyUsSection;
