import { Carousel } from 'react-carousel-minimal';

function CarouselBox() {
 const data = [
    {
        image: "https://media.glamour.ru/photos/61701b47854ef439051bde3c/16:9/w_2560%2Cc_limit/GettyImages-1347269163.jpg",
      },
      {
        image: "https://www.rukzakoff.ru/wa-data/public/photos/74/14/1474/1474.970.jpg",
      },
      {
        image: "https://modnaya-krasivaya.ru/moda/2019/04/modnye-sumki-2.jpg",
      },
      {
        image: "https://krasavica.info/uploads/posts/2022-02/1646041698_4-krasavica-info-p-modnie-trendi-sumok-devushka-krasivo-foto-4.jpg"
      },
      {
        image: "https://assets.vogue.ru/photos/5dc5355c96599000082e2703/master/w_1600%2Cc_limit/17_5X5A4831.jpg",
      }
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={data}
            time={4000}
            width="850px"
            height="500px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CarouselBox;