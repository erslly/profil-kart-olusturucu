import { ProfileData, CardStyle } from "../types/profile";
import { 
  Briefcase, 
  Mail, 
  Phone, 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram, 
  Globe 
} from "lucide-react";
import { cn } from "../lib/utils";
import { FaDiscord } from "react-icons/fa";

interface ProfileCardProps {
  profile: ProfileData;
  style: CardStyle;
}

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M14.5 9a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path>
    <path d="M6.5 9a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path>
    <path d="M16 15c-1.333 1.667-3 2.5-4 2.5s-2.667-.833-4-2.5"></path>
    <path d="M9 9V8c0-1.4.9-3 3-3s3 1.6 3 3v1"></path>
  </svg>
);

const ProfileCard = ({ profile, style }: ProfileCardProps) => {
  const defaultProfileImage = "https://cdn.discordapp.com/avatars/815668704435896321/6c7e5e3bc7c2e7b795f5dfa7d7e52d24.webp?size=4096";
  
  const cardClasses = {
    minimalist: "bg-white text-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300",
    creative: "card-creative text-white shadow-lg",
    corporate: "card-corporate text-white shadow-md",
    tech: "card-tech text-white shadow-xl"
  };
  
  const nameClasses = {
    minimalist: "text-gray-800 font-semibold",
    creative: "text-white font-extrabold",
    corporate: "text-white font-bold",
    tech: "text-white font-bold"
  };
  
  const titleClasses = {
    minimalist: "text-blue-600",
    creative: "text-purple-200",
    corporate: "text-blue-200",
    tech: "text-gray-300"
  };
  
  const bioClasses = {
    minimalist: "text-gray-700",
    creative: "text-white/80",
    corporate: "text-white/80",
    tech: "text-gray-400"
  };
  
  const contactClasses = {
    minimalist: "bg-gray-100 border-t border-gray-200",
    creative: "bg-purple-700/30",
    corporate: "bg-blue-900/30",
    tech: "bg-gray-900"
  };
  
  const skillTagClasses = {
    minimalist: "bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 text-xs rounded-md",
    creative: "skill-tag-creative",
    corporate: "skill-tag-corporate",
    tech: "skill-tag-tech"
  };
  
  const socialIconClasses = {
    minimalist: "text-gray-600 hover:text-blue-600 transition-colors duration-200",
    creative: "text-white/80 hover:text-white",
    corporate: "text-white/80 hover:text-white",
    tech: "text-gray-400 hover:text-white"
  };


  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className={cn("h-5 w-5", socialIconClasses[style])} />;
      case 'twitter':
        return <Twitter className={cn("h-5 w-5", socialIconClasses[style])} />;
      case 'github':
        return <Github className={cn("h-5 w-5", socialIconClasses[style])} />;
      case 'instagram':
        return <Instagram className={cn("h-5 w-5", socialIconClasses[style])} />;
      case 'discord':
        return <FaDiscord className={cn("h-5 w-5", socialIconClasses[style])} />; 
      default:
        return <Globe className={cn("h-5 w-5", socialIconClasses[style])} />;
    }
  };
  

  return (
    <div 
      className={cn(
        "w-full aspect-[16/9] rounded-xl overflow-hidden flex flex-col transition-all",
        cardClasses[style]
      )}
    >
      <div className="flex-1 p-6">
        <div className="flex items-start gap-4">
          <div 
            className="h-24 w-24 rounded-full overflow-hidden border-4 bg-white flex-shrink-0"
            style={{ 
              borderColor: style === 'minimalist' ? '#4F46E5' : 
                          style === 'creative' ? '#D946EF' : 
                          style === 'corporate' ? '#0284C7' : '#10B981'
            }}
          >
            <img 
              src={profile.profileImage || defaultProfileImage} 
              alt={profile.fullName}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h2 
              className={cn(
                "text-2xl mb-1", 
                nameClasses[style]
              )}
            >
              {profile.fullName}
            </h2>
            
            <div className="flex items-center gap-2 mb-2">
              <p className={cn("font-medium", titleClasses[style])}>
                {profile.title}
              </p>
              {profile.company && (
                <>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3 text-gray-500" />
                    <span className="text-sm text-gray-600">{profile.company}</span>
                  </div>
                </>
              )}
            </div>
            
            {profile.bio && (
              <p className={cn("text-sm mt-2 line-clamp-2", bioClasses[style])}>
                {profile.bio}
              </p>
            )}
            
            {profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {profile.skills.slice(0, 5).map((skill) => (
                  <span 
                    key={skill.id} 
                    className={style === 'minimalist' ? skillTagClasses[style] : cn("skill-tag", skillTagClasses[style])}
                  >
                    {skill.name}
                  </span>
                ))}
                {profile.skills.length > 5 && (
                  <span className={style === 'minimalist' ? skillTagClasses[style] : cn("skill-tag", skillTagClasses[style])}>
                    +{profile.skills.length - 5}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={cn("p-4 flex items-center justify-between", contactClasses[style])}>
        <div className="flex items-center gap-4">
          {profile.email && (
            <a 
              href={`mailto:${profile.email}`} 
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">{profile.email}</span>
            </a>
          )}
          
          {profile.phone && (
            <a 
              href={`tel:${profile.phone}`} 
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors duration-200"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{profile.phone}</span>
            </a>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {profile.socialMedia.map((social, index) => (
            <a 
              key={index} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              {getSocialIcon(social.platform)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;