import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { SocialMedia } from "../types/profile";
import { Trash2 } from "lucide-react";

type SocialPlatform = "linkedin" | "twitter" | "github" | "instagram" | "discord" | "website";

interface SocialMediaInputProps {
  socialMedia: SocialMedia[];
  onChange: (socialMedia: SocialMedia[]) => void;
}

const SocialMediaInput = ({ socialMedia, onChange }: SocialMediaInputProps) => {
  const addSocialMedia = () => {
    onChange([
      ...socialMedia,
      {
        platform: "linkedin",
        username: "",
        url: "",
      },
    ]);
  };

  const updateSocialMedia = (index: number, field: keyof SocialMedia, value: string) => {
    const updated = [...socialMedia];
    updated[index] = { ...updated[index], [field]: value };
    
    if (field === 'platform' || field === 'username') {
      const platform = field === 'platform' ? value : updated[index].platform;
      const username = field === 'username' ? value : updated[index].username;
      
      if (username) {
        switch (platform) {
          case 'linkedin':
            updated[index].url = `https://linkedin.com/in/${username}`;
            break;
          case 'twitter':
            updated[index].url = `https://twitter.com/${username}`;
            break;
          case 'github':
            updated[index].url = `https://github.com/${username}`;
            break;
          case 'instagram':
            updated[index].url = `https://instagram.com/${username}`;
            break;
          case 'discord':
            updated[index].url = `https://discord.com/users/${username}`;
            break;
          case 'website':
            updated[index].url = username.includes('http') ? username : `https://${username}`;
            break;
        }
      }
    }
    
    if (field === 'url' && updated[index].platform === 'website') {
      updated[index].username = value;
    }
    
    onChange(updated);
  };

  const removeSocialMedia = (index: number) => {
    onChange(socialMedia.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Sosyal Medya
        </label>
        <Button 
          type="button" 
          onClick={addSocialMedia} 
          variant="outline" 
          size="sm"
        >
          Profile Ekle
        </Button>
      </div>
      
      {socialMedia.map((social, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-4">
            <Select 
              value={social.platform}
              onValueChange={(value: string) => {
                updateSocialMedia(index, "platform", value as SocialPlatform);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="github">GitHub</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="discord">Discord</SelectItem>
                <SelectItem value="website">Website</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="col-span-7">
            <Input
              value={social.username}
              onChange={(e) => updateSocialMedia(index, "username", e.target.value)}
              placeholder={
                social.platform === 'website' 
                  ? "URL" 
                  : social.platform === 'discord' 
                    ? "Discord ID" 
                    : "Username"
              }
            />
          </div>
          
          <div className="col-span-1 flex justify-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeSocialMedia(index)}
              className="h-9 w-9 text-destructive hover:text-destructive"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaInput;