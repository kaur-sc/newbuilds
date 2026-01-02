import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={langRef}>
      <button 
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors small"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLang.code.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
      </button>

      {isLangOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-fade-in-fast">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setIsLangOpen(false);
              }}
              className={`w-full text-left px-4 py-2 small hover:bg-muted/50 transition-colors flex items-center gap-3 ${
                i18n.language === lang.code ? 'font-bold text-primary' : ''
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
