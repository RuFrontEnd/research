import React, { useState } from "react";
import CarouselModuleB from "components/carouselB/CarouselModuleB";

function CarouselB(props, children) {
  const [items, setItems] = useState(["4", "5", "1", "2", "3"]);
  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CarouselModuleB
        CarouselItems={items}
        width={1170}
        buttonSize={100}
        breakpoints={{
          s: { point: 576, width: 400 },
          m: { point: 768, width: 800 },
          l: { point: 1024, width: 960 },
          xl: { point: 1200, width: 1170 },
          xxl: { point: 1440, width: 1170 },
        }}
      />
    </section>
  );
}

export default CarouselB;
