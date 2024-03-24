import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 768
      ? smallHeroVideo
      : heroVideo
  );

  useEffect(() => {
    const handleResize = () => window.innerWidth < 768 ? setVideoSrc(smallHeroVideo) : setVideoSrc(heroVideo);
    
    window.addEventListener('resize', handleResize)
    // Call the handleResize function when the component mounts to check for the device type and load appropriate video source

    return  () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);

  useGSAP(() => {
    gsap.to('#hero', {
      opacity: 1,
      delay: 2
    })

    gsap.to('#cta', {
      opacity: 1,
      y: 0,
      delay: 2
    })
  }, []) 

  return (
    <section className="w-full nav-height relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id='hero' className="hero-title">iPhone 15 Pro</p>
        <div className='md:w-10/12 w-9/12'>
          <video key={videoSrc} autoPlay muted playsInline={true} controls={false} className='pointer-events-none'>
            <source src={videoSrc} type="video/mp4"/>
          </video>
        </div>
      </div>
      <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>
        <a href="#highlights" className='btn'>Buy</a>
        <p className='font-normal text-xl'>From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero