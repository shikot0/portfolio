import {useState, useEffect} from 'react';
import data from '../../data.json';
import './PortfolioSection.css';
function PortfolioSection() {
    const [hiddenElements, setHiddenElements] = useState([]);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('triggered');
        }
        // else {
        //   entry.target.classList.remove('triggered');
        // }
      }) 
    }, {
      threshold: [.8]
    });

    useEffect(() => {
      setHiddenElements([...document.querySelectorAll('.scroll-trigger')]);
    },[])

    hiddenElements.forEach(el => {
      observer.observe(el);
    })


    let counter = 0;
    function prevSlide() {
      counter--;
      if(counter < 0) {
        counter = document.querySelectorAll('.slide').length-1;
      }
      carousel();
    }

    function nextSlide() {
      counter++;
      if(counter > document.querySelectorAll('.slide').length-1) {
        counter = 0;
      }
      carousel();
    }

    function carousel() {
      document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('visible-slide');
        slide.style.translate = `-${counter*100}%`;
        if([...document.querySelectorAll('.slide')].indexOf(slide) === counter) {
          slide.classList.add('visible-slide');
        }
      })
      document.querySelectorAll('.text-slide').forEach(slide => {
        slide.classList.remove('visible-slide');
        slide.style.translate = `-${counter*100}%`;
        if([...document.querySelectorAll('.text-slide')].indexOf(slide) === counter) {
          slide.classList.add('visible-slide');
        }
      })
    }

    return(
        <div id="portfolio-section">
            <h2>Portfolio</h2>
            <div className="portfolio-wrapper_desktop scroll-trigger">
              <img className='laptop-image' src={`${process.env.PUBLIC_URL}/laptop.png`} alt="laptop" />
              <div className="portfolio-images-wrapper">
                {data.slice(0,5).map((projectDetails, index) => {
                    return <div className="slide" key={index}><img src={`${process.env.PUBLIC_URL}${projectDetails.desktopImage}`} className='portfolio-image' alt={projectDetails.name}/></div>
                })}
                <button type='button' className='slider-button prev' onClick={prevSlide}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrow-left"><rect width="24" height="24" opacity="0"/><path d="M13.54 18a2.06 2.06 0 0 1-1.3-.46l-5.1-4.21a1.7 1.7 0 0 1 0-2.66l5.1-4.21a2.1 2.1 0 0 1 2.21-.26 1.76 1.76 0 0 1 1.05 1.59v8.42a1.76 1.76 0 0 1-1.05 1.59 2.23 2.23 0 0 1-.91.2zm-4.86-6l4.82 4V8.09z"/></g></g></svg>
                </button>
                <button type='button' className='slider-button next' onClick={nextSlide}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrow-right"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M10.46 18a2.23 2.23 0 0 1-.91-.2 1.76 1.76 0 0 1-1.05-1.59V7.79A1.76 1.76 0 0 1 9.55 6.2a2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1-1.3.46zm0-10v7.9l4.86-3.9z"/></g></g></svg>
                </button>
              </div>
                <div className="portfolio-text-wrapper">
                  {data.slice(0,5).map((projectDetails, index) => {
                      return (
                      <div className="text-slide" key={index}>
                        <h3>{projectDetails.name}</h3>
                        <p>Link: <a href='projectDetails.link'>{projectDetails.link}</a></p>
                        <p>{projectDetails.description}</p>
                      </div>
                      )
                  })}
                </div>
            </div>
        </div>
    )
}

export default PortfolioSection;