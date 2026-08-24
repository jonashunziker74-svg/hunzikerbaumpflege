import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plus,
  Trees,
  X,
} from 'lucide-react';

type Page = 'home' | 'contact';

const remoteHeroImage = 'https://images.pexels.com/photos/35089307/pexels-photo-35089307.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const remoteCanopyImage = 'https://images.pexels.com/photos/38263335/pexels-photo-38263335.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const remotePortraitImage = 'https://images.pexels.com/photos/8821017/pexels-photo-8821017.jpeg?auto=compress&cs=tinysrgb&h=900&w=720';
const heroImage = '/assets/images/WhatsApp_Image_2026-02-26_at_10.55.59.jpeg';
const canopyImage = '/assets/images/PXL_20251115_101559732.jpg';
const portraitImage = '/assets/images/P1120507_Kopie.JPG';

function BrandMark() {
  return <img className="brand-logo" src="/assets/images/Bildschirm­foto_2026-08-23_um_09.06.51.png" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/assets/images/hunziker-logo.svg'; }} alt="Hunziker Baumpflege GmbH" />;
}

function RevealSection({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.15 });

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [openService, setOpenService] = useState<number | null>(null);

  const servicesData = [
    {
      title: <>Baumpflege{"\u00A0"}&<br />Kronenschnitt</>,
      description: 'Fachgerechter Schnitt zur Erhaltung der Gesundheit, Statik und Vitalität Ihrer Bäume sowie zur Entlastung von Kronenteilen.'
    },
    {
      title: <>Baumkontrolle{"\u00A0"}&<br />Sicherheit</>,
      description: 'Regelmässige Überprüfung auf Stand- und Bruchsicherheit zur Vorsorge und Erfüllung der Verkehrssicherungspflicht.'
    },
    {
      title: <>Fällungen{"\u00A0"}&<br />Spezialfällungen</>,
      description: 'Sichere Abtragung von Bäumen auf engstem Raum mittels Seilklettertechnik oder Kranunterstützung.'
    },
    {
      title: <>Pflanzung{"\u00A0"}&<br />Beratung</>,
      description: 'Standortgerechte Auswahl und fachgerechte Pflanzung von Neubäumen inklusive fundierter Pflegeberatung.'
    }
  ];

  const [page, setPage] = useState<Page>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (nextPage: Page, anchor?: string) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.setTimeout(() => {
      document.getElementById(anchor ?? (nextPage === 'home' ? 'start' : 'kontakt'))?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <button className="brand-button" onClick={() => navigate('home', 'start')} aria-label="Zur Startseite"><BrandMark /></button>
        <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Hauptnavigation">
          <button className={page === 'home' ? 'nav-link nav-link--active' : 'nav-link'} onClick={() => navigate('home', 'start')}>Startseite</button>
          <button className={page === 'contact' ? 'nav-link nav-link--active' : 'nav-link'} onClick={() => navigate('contact', 'kontakt')}>Kontakt aufnehmen</button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </header>

      {page === 'home' ? (
        <main id="start">
          <RevealSection>
            <section className="hero-section">
              <div className="hero-copy">
                <p className="eyebrow"><Trees size={16} /> Professionelle Baumpflege</p>
                <h1>Arbeit die<br /><em>Frucht trägt.</em></h1>
                <p className="hero-intro">Professionelle Baumpflege mit Herz, Handwerk und einem sicheren Blick fürs Detail. Für gesunde Bäume und Orte, an denen man gerne bleibt.</p>
                <div className="hero-actions">
                  <button className="button button--primary" onClick={() => navigate('contact', 'kontakt')}>Kontakt aufnehmen</button>
                  <button className="text-link" onClick={() => document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' })}>Unsere Leistungen <ChevronRight size={17} /></button>
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-image-frame">
                  <img src="/assets/images/Zeder von unten Marroko .jpg" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = remoteHeroImage; }} alt="Arborist bei der Baumpflege im Sonnenschein" />
                </div>
              </div>
            </section>
          </RevealSection>

          {/* Sektion: Leistungen */}
          <RevealSection>
            <section className="services-section" id="leistungen">
              <div className="services-image">
                <img src={canopyImage} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = remoteCanopyImage; }} alt="Sonnenlicht fällt durch eine grüne Baumkrone" />
              </div>

              <div className="services-content">
                <div className="section-heading" style={{ marginBottom: '2.5rem' }}>
                  <p className="eyebrow">Was wir tun</p>
                  <h2>Mit Blick fürs Ganze.<br /><em>Für jeden Baum.</em></h2>
                </div>

                <div className="services-accordion">
                  {servicesData.map((item, index) => (
                    <div 
                      key={index} 
                      style={{ 
                        borderBottom: '1px solid #E5E5E5', 
                        padding: '1.25rem 0',
                        cursor: 'pointer',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        columnGap: '1rem',
                        alignItems: 'baseline'
                      }}
                      onClick={() => setOpenService(openService === index ? null : index)}
                    >
                      <button 
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          padding: 0, 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          transform: openService === index ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                        aria-label="Details umschalten"
                      >
                        <Plus size={20} />
                      </button>
                      
                      <h3 style={{ margin: 0, gridColumn: '2' }}>{item.title}</h3>
                      
                      <div style={{
                        gridColumn: '2',
                        display: 'grid',
                        gridTemplateRows: openService === index ? '1fr' : '0fr',
                        transition: 'grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}>
                        <div style={{ overflow: 'hidden' }}>
                          <p style={{ 
                            paddingTop: '0.75rem', 
                            paddingBottom: '1rem',
                            paddingRight: '1rem',
                            color: '#555', 
                            lineHeight: '1.6',
                            margin: 0,
                            opacity: openService === index ? 1 : 0,
                            transition: 'opacity 0.3s ease'
                          }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </RevealSection>

          {/* Grüner Balken (Unser Versprechen) */}
          <RevealSection>
            <section className="promise-section">
              <div>
                <p className="eyebrow eyebrow--light">Unser Versprechen</p>
                <h2>Arbeit <br /><em>die Frucht trägt.</em></h2>
              </div>
              <div className="promise-points">
                <p>Wir verbinden fundiertes Fachwissen mit einem respektvollen Umgang mit der Natur. Transparent, zuverlässig und immer mit dem Ziel, die beste Lösung für Ihren Baum zu finden.</p>
                <div className="promise-list">
                  <span><Check size={16} /> Persönlich beraten</span>
                  <span><Check size={16} /> Sauber ausgeführt</span>
                  <span><Check size={16} /> Langfristig gedacht</span>
                </div>
              </div>
            </section>
          </RevealSection>

          {/* Über mich Sektion */}
          <RevealSection>
            <section className="about-section">
              <div className="about-image">
                <img src="/assets/images/Portrait Jonas hunziker alt .JPG" onError={(event)=> { event.currentTarget.onerror = null; event.currentTarget.src = remotePortraitImage; }} alt="Jonas Hunziker, Inhaber und Geschäftsführer der Hunziker Baumpflege GmbH" />
                <div className="about-credentials"><span>Baumpflegespezialist FA</span><span>Landschaftsgärtner EFZ</span></div>
              </div>
              <div className="about-copy">
                <p className="eyebrow">Über mich</p>
                <h2>Entschieden, gute<br /><em>Arbeit zu leisten.</em></h2>
                <p className="about-text">Das ist mein täglicher Antrieb. Mein Ziel ist es, jederzeit erstklassige Arbeit zu liefern für die Gesundheit Ihrer Bäume und die Sicherheit auf Ihrem Grundstück. Dabei ist jeder Auftrag für mich auch eine Chance, mich weiterzuentwickeln und mit jeder Herausforderung zu wachsen, neues Fachwissen zu erlernen und meine langjährige Erfahrung in der Seilklettertechnik und Baumpflege stetig zu vertiefen.</p>
                <div className="about-signature"><strong>Jonas Hunziker</strong><span>Inhaber und Geschäftsführer</span></div>
              </div>
            </section>
          </RevealSection>
        </main>
      ) : (
        <main id="kontakt" className="contact-page">
          <section className="contact-hero">
            <div>
              <p className="eyebrow"><Mail size={16} /> Kontakt</p>
              <h1>Erzählen Sie uns<br /><em>von Ihrem Baum.</em></h1>
              <p className="hero-intro">Ob Beratung, Pflege oder eine dringende Frage: Wir freuen uns, von Ihnen zu hören.</p>
            </div>
          </section>
          <section className="contact-grid">
            <div className="contact-details">
              <div className="detail-card"><Phone size={22} /><div><span>Telefon</span><a href="tel:+41786034397">078 603 43 97</a></div></div>
              <div className="detail-card"><Mail size={22} /><div><span>E-Mail</span><a href="mailto:info@hunzikerbaumpflege.ch">info@hunzikerbaumpflege.ch</a></div></div>
              <div className="detail-card"><MapPin size={22} /><div><span>Standort</span><p>Stolten 102, 5054 Kirchleerau</p></div></div>
              <div className="detail-card"><Clock3 size={22} /><div><span>Erreichbarkeit</span><p>Mo–Fr, 08:00–17:00 Uhr</p></div></div>
            </div>
            
            {/* Kontaktformular verknüpft mit Netlify & automatischer Zurücksetzung */}
            <div className="contact-form-card">
              <p className="eyebrow">Unverbindlich anfragen</p>
              <h2>Was dürfen wir<br /><em>für Sie tun?</em></h2>
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true"
                onSubmit={(event) => {
                  event.preventDefault();
                  const formElement = event.currentTarget;
                  const formData = new FormData(formElement);

                  fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData as any).toString(),
                  })
                    .then(() => {
                      alert("Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.");
                      formElement.reset();
                    })
                    .catch((error) => alert("Fehler beim Senden: " + error));
                }}
              >
                <input type="hidden" name="form-name" value="contact" />
                
                <label>
                  Name
                  <input type="text" name="name" placeholder="Ihr Name" required />
                </label>
                
                <label>
                  E-Mail
                  <input type="email" name="email" placeholder="ihre@email.ch" required />
                </label>
                
                <label>
                  Nachricht
                  <textarea name="message" rows={4} placeholder="Erzählen Sie uns kurz, worum es geht …" required />
                </label>
                
                <button className="button button--primary" type="submit">Nachricht senden</button>
              </form>
            </div>
          </section>
        </main>
      )}

      <footer className="site-footer">
        <BrandMark />
        <div className="footer-meta">
          <span>Hunziker Baumpflege GmbH</span>
          <span>Pflanzen · Kronenschnitt · Beurteilung · Spezialfällung</span>
        </div>
        <div className="footer-social">
          <a href="mailto:info@hunzikerbaumpflege.ch" aria-label="E-Mail"><Mail size={18} /></a>
        </div>
      </footer>
    </div>
  );
}
