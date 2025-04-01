
import { CardStyle } from "../types/profile";
import { cn } from "../lib/utils";

interface StyleSelectorProps {
  selectedStyle: CardStyle;
  onChange: (style: CardStyle) => void;
}

const StyleSelector = ({ selectedStyle, onChange }: StyleSelectorProps) => {
  const styles: { id: CardStyle; name: string; description: string }[] = [
    {
      id: "minimalist",
      name: "Minimalist",
      description: "İnce renklere sahip temiz, profesyonel tasarım",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Ayırt edici unsurlara sahip cesur, canlı tasarım",
    },
    {
      id: "corporate",
      name: "Corporate",
      description: "Muhafazakar tasarıma sahip geleneksel, yapılandırılmış düzen",
    },
    {
      id: "tech",
      name: "Tech",
      description: "Son teknoloji hissi veren modern, şık tasarım",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Card Style</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {styles.map((style) => (
          <div
            key={style.id}
            className={cn(
              "p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-accent",
              selectedStyle === style.id 
                ? "border-primary bg-primary/5" 
                : "border-border"
            )}
            onClick={() => onChange(style.id)}
          >
            <div className="h-2 mb-2 rounded-full overflow-hidden">
              <div className={`h-full w-full card-${style.id}`}></div>
            </div>
            <h3 className="font-medium">{style.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {style.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;