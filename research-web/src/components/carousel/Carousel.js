import CarouselModule from "components/carousel/CarouselModule";

function Carousel() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <section>
      <CarouselModule activation={0} cards={cards} />
    </section>
  );
}

export default Carousel;
