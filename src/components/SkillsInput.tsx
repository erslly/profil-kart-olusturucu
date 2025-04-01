
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { X } from "lucide-react";
import { Skill } from "../types/profile";

interface SkillsInputProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

const SkillsInput = ({ skills, onChange }: SkillsInputProps) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() !== "" && !skills.some(s => s.name.toLowerCase() === newSkill.toLowerCase())) {
      const skill = {
        id: Date.now().toString(),
        name: newSkill.trim()
      };
      onChange([...skills, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
      Beceriler/Uzmanlık
      </label>
      
      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Beceri Ekle"
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button 
          type="button" 
          onClick={addSkill}
          disabled={newSkill.trim() === ""}
        >
          Ekle! 
        </Button>
      </div>
      
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1 group"
            >
              {skill.name}
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-primary/60 hover:text-primary transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsInput;