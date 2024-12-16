import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import "./../styles/main.scss";

const Home = ({ pageId }) => {
  const [page, setPage] = useState(null);
  const [beforeSliderContent, setBeforeSliderContent] = useState(null);
  const [sliderElements, setSliderElements] = useState([]);
  const [afterSliderContent, setAfterSliderContent] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null); // Estado para thumbsSwiper
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/wp-json/wp/v2/pages/${pageId}`);
        const pageData = response.data;
        setPage(pageData);

        const sliderContent = document.createElement("div");
        sliderContent.innerHTML = pageData.content.rendered;

        // Procesar contenido antes y después del slider
        const beforeSlider = sliderContent.querySelector(".before-slider");
        if (beforeSlider) {
          setBeforeSliderContent(beforeSlider.outerHTML);
          beforeSlider.remove();
        }

        const container = sliderContent.querySelector(".home-top-swiper-slider");
        if (container) {
          const row = container.querySelector(".row");
          if (row) {
            const boxes = Array.from(row.querySelectorAll(".box"));
            setSliderElements(boxes);
          }
          container.remove();
        }

        const afterSlider = sliderContent.querySelector(".after-slider");
        if (afterSlider) {
          setAfterSliderContent(afterSlider.outerHTML);
          afterSlider.remove();
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    };

    fetchPage();
  }, [pageId]);

  if (!page) {
    return <p className="container">Loading...</p>;
  }

  return (
    <div className="home-container">
      {/* Contenido antes del slider */}
      {beforeSliderContent && (
        <div
          className="content-before-slider"
          dangerouslySetInnerHTML={{ __html: beforeSliderContent }}
        />
      )}

      {/* Slider principal */}
      {sliderElements.length > 0 && (
        <>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{
              delay: 6500,
              disableOnInteraction: true,
            }}
            modules={[Autoplay,FreeMode, Navigation, Thumbs]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="main-swiper"
          >
            {sliderElements.map((element, index) => (
              <SwiperSlide key={index}>
                <div dangerouslySetInnerHTML={{ __html: element.innerHTML }} />
                <div className="autoplay-progress" slot="container-end">
                  <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                  </svg>
                  <span ref={progressContent}></span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <Swiper
            onSwiper={setThumbsSwiper} // Enlaza el Swiper secundario con el principal
            spaceBetween={10}
            slidesPerView={4} // Mostrar 4 miniaturas a la vez
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            watchSlidesProgress={true} // Necesario para sincronizar con el slider principal
            modules={[Autoplay,FreeMode, Navigation, Thumbs]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="thumbnail-swiper"
          >
            {sliderElements.map((element, index) => (
              <SwiperSlide key={index}>
                <div dangerouslySetInnerHTML={{ __html: element.innerHTML }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}

      {/* Contenido después del slider */}
      {afterSliderContent && (
        <div
          className="content-after-slider"
          dangerouslySetInnerHTML={{ __html: afterSliderContent }}
        />
      )}
    </div>
  );
};

export default Home;