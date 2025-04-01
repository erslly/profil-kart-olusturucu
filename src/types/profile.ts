
export type SocialMedia = {
    platform: 'linkedin' | 'twitter' | 'github' | 'instagram' | 'discord' |  'website';
    username: string;
    url: string;
  };
  
  export type Skill = {
    id: string;
    name: string;
  };
  
  export type ProfileData = {
    fullName: string;
    title: string;
    company: string;
    profileImage?: string;
    email: string;
    phone: string;
    bio: string;
    socialMedia: SocialMedia[];
    skills: Skill[];
  };
  
  export type CardStyle = 'minimalist' | 'creative' | 'corporate' | 'tech';