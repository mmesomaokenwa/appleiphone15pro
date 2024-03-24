import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import gsap from "gsap"
import { pauseImg, playImg, replayImg } from "../utils"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollTrigger)

const VideoCarousel = () => {
  const videoRef = useRef([])
  const videoSpanRef = useRef([])
  const videoDivRef = useRef([])

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    id: 0,
    isLast: false,
    isPlaying: false
  })

  const [loadedData, setLoadedData] = useState([])

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * video.id}%)`,
      duration: 2,
      ease: 'power2.inOut'
    })

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none'
      }, 
      onComplete: () => setVideo(prev => ({...prev, startPlay: true, isPlaying: true}))
    })
  }, [video.id, video.isEnd])

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!video.isPlaying) {
        videoRef.current[video.id].pause()
      } else {
        video.startPlay && videoRef.current[video.id].play()
      }
    }
  }, [video.startPlay, video.id, video.isPlaying, loadedData])

  useEffect(() => {
    let currentProgress = 0
    let span = videoSpanRef.current

    if (span[video.id]) {
      let anim = gsap.to(span[video.id], {
        onUpdate: () => { 
          const progress = Math.ceil(anim.progress() * 100)

          if (progress !== currentProgress) {
            currentProgress = progress

            gsap.to(videoDivRef.current[video.id], {
              width: window.innerWidth < 760
                ? '10vw'
                : window.innerWidth < 1200
                  ? '10vw'
                  : '4vw'
            })

            gsap.to(span[video.id], {
              width: `${currentProgress}%`,
              backgroundColor: 'white'
            })
          }
        },
        onComplete: () => {
          if (video.isPlaying) {
            gsap.to(videoDivRef.current[video.id], {
              width: '12px'
            })

            gsap.to(span[video.id], {
              backgroundColor: '#afafaf'
            })
          }
        }
      })

      if (video.id === 0) anim.restart()

      const animUpdate = () => anim.progress(videoRef.current[video.id].currentTime / hightlightsSlides[video.id].videoDuration)

      if (video.isPlaying) gsap.ticker.add(animUpdate)
      else gsap.ticker.remove(animUpdate)
    }
  }, [video.id, video.startPlay])

  const handleLoadedMetaData = (index, e) => setLoadedData(prev => [...prev, e])

  const handleProcess = (type, index) => {
    if (type === 'end') setVideo(prev => ({ ...prev, isEnd: true, id: index + 1 }))
    else if (type === 'last') setVideo(prev => ({ ...prev, isLast: true }))
    else if (type === 'reset') setVideo(prev => ({ ...prev, isLast: false, id: 0 }))
    else if (type === 'play' || type === 'pause') setVideo(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
  }
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((slide, index) => (
          <div key={slide.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[index] = el)}
                  onLoadedMetadata={handleLoadedMetaData}
                  onEnded={() => {
                    index !== 3
                      ? handleProcess('end', index)
                      : handleProcess('last')
                  }}
                  onPlay={() =>
                    setVideo((prev) => ({ ...prev, isPlaying: true }))
                  }
                  className={`${slide.id === 2 && 'translate-x-44'} pointer-events-none`}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((ref, index) => (
            <span
              key={index}
              ref={(el) => (videoDivRef.current[index] = el)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                ref={(el) => (videoSpanRef.current[index] = el)}
                className="absolute h-full w-full rounded-full"
              />
            </span>
          ))}
        </div>
        <button className="control-btn" onClick={video.isLast
          ? () => handleProcess('reset')
          : !video.isPlaying ? () => handleProcess('play')
          : () => handleProcess('pause')
        }>
          <img
            src={
              video.isLast ? replayImg : !video.isPlaying ? playImg : pauseImg
            }
            alt={
              video.isLast ? 'replay' : !video.isPlaying ? 'play' : 'pause'
            }
          />
        </button>
      </div>
    </>
  );
}

export default VideoCarousel