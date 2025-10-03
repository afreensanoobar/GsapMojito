import { useGSAP } from "@gsap/react"
import { useMediaQuery } from "react-responsive"
import { ScrollTrigger, SplitText, CSSPlugin } from "gsap/all"
import React, { useRef } from "react"
import gsap from "gsap"
gsap.registerPlugin(ScrollTrigger, SplitText, CSSPlugin)

const Hero = () => {
  const videoRef = useRef()

  const isMobile = useMediaQuery({ maxWidth: 767 })

  useGSAP(() => {
    // Wait until fonts are loaded before calling SplitText
    document.fonts.ready.then(() => {
      const heroSplit = new SplitText(".title", { type: "chars, words" })
      const paragraphSplit = new SplitText(".subtitle", { type: "lines" })

      heroSplit.chars.forEach((char) => char.classList.add("text-gradient"))

      gsap.from(heroSplit.chars, {
        yPercent: 80,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.05,
      })

      gsap.from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.06,
        duration: 1.8,
        ease: "expo.out",
        delay: 1,
      })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })

        .to(".right-leaf", { y: 200 }, 0)
        .to(".left-leaf", { y: -200 }, 0)

      const startValue = isMobile ? "top 50%" : "center 60%"
      const endValue = isMobile ? " 120% top " : "bottom top"

      // Vedio animation timeline

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: videoRef.current,
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,
        },
      })

      videoRef.current.onloadedmetadata = () => {
        tl.to(videoRef.current, {
          currentTime: videoRef.current.duration,
        })
      }
    })
  }, [])

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perspiciatis ipsam repellendus id sunt voluptatum vel. Velit
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  )
}

export default Hero
