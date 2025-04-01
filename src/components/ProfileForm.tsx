import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import ImageUpload from "./ImageUpload";
import SkillsInput from "./SkillsInput";
import SocialMediaInput from "./SocialMediaInput";
import { ProfileData } from "../types/profile";

interface ProfileFormProps {
  profile: ProfileData;
  onChange: (profile: ProfileData) => void;
}

const ProfileForm = ({ profile, onChange }: ProfileFormProps) => {
  const handleChange = (field: keyof ProfileData, value: any) => {
    onChange({ ...profile, [field]: value });
  };

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border shadow-sm">
      <h2 className="text-xl font-semibold">Profil Kart</h2>

      <ImageUpload
        onImageChange={(image) => handleChange("profileImage", image)}
        currentImage={profile.profileImage || ""}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Tam İsim
        </label>
        <Input
          value={profile.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          placeholder="ersllydev"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Mesleki Ünvanınız
          </label>
          <Input
            value={profile.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Front-end Developer"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Şirket/Kuruluş
          </label>
          <Input
            value={profile.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Your Company"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Biyografi</label>
        <Textarea
          value={profile.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          placeholder="Kendinizi kısaca tanıtın (150 karakter max)"
          maxLength={150}
          className="resize-none"
          rows={3}
        />
        <p className="text-xs text-gray-500 text-right">
          {profile.bio.length}/150 karakter
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            E-mail Adresiniz
          </label>
          <Input
            type="email"
            value={profile.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="dev@erslly.xyz"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Telefon Numarası
          </label>
          <Input
            value={profile.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="11111111"
          />
        </div>
      </div>

      <SkillsInput
        skills={profile.skills}
        onChange={(skills) => handleChange("skills", skills)}
      />

      <SocialMediaInput
        socialMedia={profile.socialMedia}
        onChange={(socialMedia) => handleChange("socialMedia", socialMedia)}
      />
    </div>
  );
};

export default ProfileForm;