import { useState, useRef} from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useTheme } from '../components/ui/theme-provider';
import ProfileForm from '../components/ProfileForm';
import ProfileCard from "../components/ProfileCard";
import StyleSelector from "../components/StyleSelector";
import DownloadCard from "../components/DownloadCard";
import { CardStyle, ProfileData } from "../types/profile";

const defaultProfile: ProfileData = {
    fullName: "ersllydev",
    title: "Front-end Developer",
    company: "nyde sikis merkezi",
    email: "dev@erslly.xyz",
    phone: "3131313131",
    bio: "nyde bana gotunu verene kadar yola devam",
    socialMedia: [
        {
            platform: "github",
            username: "ersllydev",
            url: "https://github.com/ersllydev",
        },
        {
            platform: "linkedin",
            username: "ersllydev",
            url: "https://www.linkedin.com/in/ersllydev/",
        },
    ],
    skills: [
            { id: "1", name: "UI/UX" },
            { id: "2", name: "Front-end Developer" },
            { id: "3", name: "Hentai Avcısı" },
            { id: "4", name: "Kücük meme secici" },
    ],
};

const Index = () => {
    const [profile, setProfile] = useState<ProfileData>(defaultProfile);
    const [cardStyle, setCardStyle] = useState<CardStyle>("minimalist");
    const cardRef = useRef<HTMLDivElement | null>(null);
    const { theme, setTheme } = useTheme();
  
    const toggleTheme = () => {
      setTheme(theme === "dark" ? "light" : "dark");
    };
  
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-center">Profil Kartı Oluşturucu</h1>
              <p className="text-center text-muted-foreground mt-2">
              Saniyeler içinde şık, profesyonel dijital kart oluşturun
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="text-foreground hover:bg-accent"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>
        
        <main className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <ProfileForm profile={profile} onChange={setProfile} />
            </div>
            
            <div className="lg:col-span-7 space-y-6">
              <StyleSelector selectedStyle={cardStyle} onChange={setCardStyle} />
              
              <div className="p-6 bg-card rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Card Preview</h2>
                
                <div ref={cardRef} className="w-full overflow-hidden rounded-lg shadow-md">
                  <ProfileCard profile={profile} style={cardStyle} />
                </div>
                
                <div className="mt-6">
                  <DownloadCard cardRef={cardRef} profile={profile} style={cardStyle} />
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="border-t mt-12">
            <div className="container py-6">
                <p className="text-center text-sm text-muted-foreground">
                Developed by ❤️ Erslly © {new Date().getFullYear()}
                </p>
            </div>
            </footer>

      </div>
    );
  };
  
  export default Index;