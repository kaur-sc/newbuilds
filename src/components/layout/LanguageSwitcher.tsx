import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'EN', flag: '🇬🇧' },
    { code: 'fr', name: 'FR', flag: '🇫🇷' },
  ];

  return (
    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border/50">
      <div className="px-2 text-muted-foreground">
        <Globe className="h-3.5 w-3.5" />
      </div>
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={i18n.language === lang.code ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => changeLanguage(lang.code)}
          className={`h-7 px-2 text-[10px] font-bold transition-all ${
            i18n.language === lang.code 
              ? 'bg-white shadow-sm text-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
}
