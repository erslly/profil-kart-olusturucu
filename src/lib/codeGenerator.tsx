
import { ProfileData, CardStyle, SocialMedia } from "../types/profile";

export const generateHtmlCss = (profile: ProfileData, style: CardStyle): [string, string] => {
  const cssCode = generateCss(style);
  
  const htmlCode = generateHtml(profile, style);
  
  return [htmlCode, cssCode];
};

const getSocialIconHtml = (platform: string): string => {
  const iconMap: Record<string, string> = {
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
    twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>`,
    discord: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><circle cx="12" cy="12" r="10"></circle><path d="M14.5 9a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path><path d="M6.5 9a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path><path d="M16 15c-1.333 1.667-3 2.5-4 2.5s-2.667-.833-4-2.5"></path><path d="M9 9V8c0-1.4.9-3 3-3s3 1.6 3 3v1"></path></svg>`,
    website: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon"><circle cx="12" cy="12" r="10"></circle><ellipse cx="12" cy="12" rx="4" ry="10"></ellipse><path d="M21.54 15H22M2 15h.46M2 9h.46M21.54 9H22M5.5 12H18.5"></path></svg>`,
  };
  
  return iconMap[platform] || iconMap.website;
};

const generateSocialLinks = (socialMedia: SocialMedia[]): string => {
  if (!socialMedia.length) return '';
  
  return socialMedia.map(social => `
    <a href="${social.url}" target="_blank" class="social-link">
      ${getSocialIconHtml(social.platform)}
    </a>
  `).join('');
};

const generateSkillTags = (skills: { id: string; name: string; }[], style: CardStyle): string => {
  if (!skills.length) return '';
  
  const displaySkills = skills.slice(0, 5);
  const extraSkills = skills.length > 5 ? `<span class="skill-tag skill-tag-${style}">+${skills.length - 5}</span>` : '';
  
  const skillTags = displaySkills.map(skill => 
    `<span class="skill-tag skill-tag-${style}">${skill.name}</span>`
  ).join('');
  
  return skillTags + extraSkills;
};

const generateHtml = (profile: ProfileData, style: CardStyle): string => {
  const defaultImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80";
  const profileImage = profile.profileImage || defaultImage;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.fullName} - Profile Card</title>
  <link rel="stylesheet" href="profile-card.css">
</head>
<body>
  <div class="card-container">
    <div class="profile-card ${style}">
      <div class="card-content">
        <div class="profile-header">
          <div class="profile-image" style="background-image: url('${profileImage}')"></div>
          <div class="profile-info">
            <h2 class="profile-name">${profile.fullName}</h2>
            <div class="profile-title">
              <span>${profile.title}</span>
              ${profile.company ? `<span class="company"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="5" y="5" rx="2"></rect><path d="M12 12h.01"></path></svg> ${profile.company}</span>` : ''}
            </div>
            ${profile.bio ? `<p class="profile-bio">${profile.bio}</p>` : ''}
            ${profile.skills.length ? `<div class="skills-container">${generateSkillTags(profile.skills, style)}</div>` : ''}
          </div>
        </div>
      </div>
      
      <div class="card-footer">
        <div class="contact-info">
          ${profile.email ? `<a href="mailto:${profile.email}" class="contact-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            <span>${profile.email}</span>
          </a>` : ''}
          
          ${profile.phone ? `<a href="tel:${profile.phone}" class="contact-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>${profile.phone}</span>
          </a>` : ''}
        </div>
        
        <div class="social-links">
          ${generateSocialLinks(profile.socialMedia)}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
};

const generateCss = (style: CardStyle): string => {
  const baseStyles = `
:root {
  --card-radius: 12px;
  --font-main: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-main);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.card-container {
  width: 100%;
  max-width: 600px;
  padding: 20px;
}

.profile-card {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: var(--card-radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.card-content {
  flex: 1;
  padding: 24px;
}

.profile-header {
  display: flex;
  gap: 16px;
}

.profile-image {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 4px solid;
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 24px;
  margin-bottom: 4px;
  font-weight: 700;
}

.profile-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
}

.company {
  display: flex;
  align-items: center;
  gap: 4px;
}

.profile-bio {
  font-size: 14px;
  margin-top: 8px;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 12px;
}

.skill-tag {
  padding: 4px 8px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
}

.card-footer {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-info {
  display: flex;
  gap: 16px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  text-decoration: none;
  color: inherit;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.social-link:hover {
  opacity: 0.8;
}

@media (max-width: 500px) {
  .profile-image {
    width: 72px;
    height: 72px;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .card-footer {
    padding: 12px 16px;
  }
  
  .contact-link span {
    display: none;
  }
}`;

  const styleSpecificCss = {
    minimalist: `
/* Minimalist style */
.minimalist {
  background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  color: #333;
}

.minimalist .profile-image {
  border-color: #3B82F6;
}

.minimalist .profile-name {
  color: #111;
}

.minimalist .profile-title span:first-child {
  color: #3B82F6;
}

.minimalist .profile-bio {
  color: #555;
}

.minimalist .card-footer {
  background-color: #f0f2f5;
}

.skill-tag-minimalist {
  background-color: #e2e8f0;
  color: #475569;
}`,

    creative: `
/* Creative style */
.creative {
  background: linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%);
  color: white;
}

.creative .profile-image {
  border-color: #D946EF;
}

.creative .profile-bio {
  color: rgba(255, 255, 255, 0.9);
}

.creative .card-footer {
  background-color: rgba(170, 0, 255, 0.3);
}

.skill-tag-creative {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}`,

    corporate: `
/* Corporate style */
.corporate {
  background: linear-gradient(to right, #243949 0%, #517fa4 100%);
  color: white;
}

.corporate .profile-image {
  border-color: #0284C7;
}

.corporate .profile-bio {
  color: rgba(255, 255, 255, 0.9);
}

.corporate .card-footer {
  background-color: rgba(13, 51, 85, 0.3);
}

.skill-tag-corporate {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}`,

    tech: `
/* Tech style */
.tech {
  background: linear-gradient(225deg, #111 0%, #333 100%);
  color: white;
}

.tech .profile-image {
  border-color: #10B981;
}

.tech .profile-title span:first-child {
  color: #10B981;
}

.tech .profile-bio {
  color: #aaa;
}

.tech .card-footer {
  background-color: #000;
}

.skill-tag-tech {
  background-color: #222;
  color: #10B981;
}`
  };

  return baseStyles + styleSpecificCss[style];
};
