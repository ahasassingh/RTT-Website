import { useEffect } from 'react';
import { initLenis } from './lib/lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EditorialSection } from './components/EditorialSection';
import { SplitSection } from './components/SplitSection';
import { Mission } from './components/Mission';
import { Newsletter } from './components/Newsletter';
import { CustomCursor } from './components/CustomCursor';
import { FilmGrain } from './components/FilmGrain';

export default function App() {
  useEffect(() => {
    const lenis = initLenis();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <Navbar />

      <main className="relative">
        <Hero />
        
        <EditorialSection 
          id="explorers"
          title="A Getaway for Explorers"
          description="Royal Tour & Travels curates journeys for photographers, filmmakers, and soul-seekers who travel to feel alive. Disconnect from noise. Reconnect with the wild."
          features={[
            {
              label: "Trekking",
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
                </svg>
              )
            },
            {
              label: "Camping",
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 2 22h20L12 2Z"/>
                  <path d="m8 14 4 4 4-4"/>
                </svg>
              )
            },
            {
              label: "Adventures",
              icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M16.2 7.8 12 12l-4.2 4.2"/>
                  <path d="m7.8 7.8 8.4 8.4"/>
                </svg>
              )
            }
          ]}
        />

        <SplitSection 
          id="destinations"
          title="The Silent Language of the Mountains"
          description={[
            "Winter travel is an entirely different art form. The cold demands respect, and the mountains reward those who come prepared. Layering is everything — start with moisture-wicking base layers, add insulating mid-layers, and finish with a windproof shell.",
            "Pack merino wool, not cotton. Bring hand warmers. And remember — the best winter moments happen when you stop rushing and let the silence settle around you. Sunrise over snow peaks is worth every frozen finger."
          ]}
          image="/images/winter-forest.jpg"
          imageAlt="Snowy winter forest"
          caption="Swiss Alps, December"
        />

        <SplitSection 
          id="open-trip"
          title="The Art of Vertical Exploration"
          description={[
            "The best journeys are the ones where planning fades into the background and experience takes the lead. Travel lighter — a single carry-on forces you to choose what truly matters. Travel slower — the most memorable moments happen in the spaces between destinations.",
            "Embrace the unplanned. Talk to locals. Wake up without an alarm. The freedom of exploration is not in checking boxes — it is in losing yourself."
          ]}
          image="/images/adventure-trek.jpg"
          imageAlt="Trekker in the mountains"
          caption="Himalayas, Nepal"
          reverse
        />

        <Mission />
        <Newsletter />
      </main>
    </>
  );
}