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
        <nav className={`main-nav
