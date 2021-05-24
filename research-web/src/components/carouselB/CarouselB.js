import React, { useState } from "react";
import CarouselModuleB from "components/carouselB/CarouselModuleB";

function CarouselB(props, children) {
  // const [items, setItems] = useState(["3", "1", "2"]);
  const [items, setItems] = useState(["4", "5", "1", "2", "3"]);
  // const [items, setItems] = useState(["5", "6", "7", "1", "2", "3", "4"]);
  // const [items, setItems] = useState([
  //   "6",
  //   "7",
  //   "8",
  //   "9",
  //   "1",
  //   "2",
  //   "3",
  //   "4",
  //   "5",
  // ]);
  //   <section
  //   style={{
  //     width: "100vw",
  //     height: "100vh",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   }}
  // >
  return (
    <>
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
            s: { point: 576, width: 1170 },
            m: { point: 768, width: 1170 },
            l: { point: 1024, width: 1170 },
            xl: { point: 1200, width: 1170 },
            xxl: { point: 1440, width: 1170 },
          }}
        />
      </section>
    </>
  );
}

export default CarouselB;
