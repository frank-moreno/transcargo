import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import "./../styles/main.scss";

const Home = ({ pageId }) => {
  const [page, setPage] = useState(null);
  const [beforeSliderContent, setBeforeSliderContent] = useState(null);
  const [sliderElements, setSliderElements] = useState([]);
  const [afterSliderContent, setAfterSliderContent] = useState([]); // Ahora un array
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
  
        // Contenido antes del slider
        const beforeSlider = sliderContent.querySelector(".before-slider");
        if (beforeSlider) {
          setBeforeSliderContent(beforeSlider.outerHTML);
          beforeSlider.remove();
        }
  
        // Slider principal
        const container = sliderContent.querySelector(".home-top-swiper-slider");
        if (container) {
          const row = container.querySelector(".row");
          if (row) {
            const boxes = Array.from(row.querySelectorAll(".box"));
            setSliderElements(boxes);
          }
          container.remove();
        }
  
        // Contenido después del slider: Ajustar enlaces dinámicamente
        const afterSliderNodes = Array.from(sliderContent.childNodes).map((node) => {
          const wrapper = document.createElement("div");
          wrapper.appendChild(node.cloneNode(true));
  
          // Ajustar enlaces
          const links = wrapper.querySelectorAll("a");
          links.forEach((link) => {
            const originalHref = link.getAttribute("href");
            if (originalHref) {
              const newHref = originalHref.replace("localhost:8000", "localhost:3000/post");
              link.setAttribute("href", newHref);
            }
          });
  
          return wrapper.innerHTML; // Retorna el contenido ajustado como HTML
        });
  
        setAfterSliderContent(afterSliderNodes);
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
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{
              delay: 6500,
              disableOnInteraction: true,
            }}
            modules={[Autoplay, FreeMode, Navigation, Thumbs]}
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
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            watchSlidesProgress={true}
            modules={[Autoplay, FreeMode, Navigation, Thumbs]}
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

      {/* Contenido después del slider: Renderiza todo el contenido dinámico */}
      {afterSliderContent.length > 0 && (
        <div className="content-after-slider">
          {afterSliderContent.map((htmlContent, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;