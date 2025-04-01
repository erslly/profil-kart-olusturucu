
import { ChangeEvent, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  onImageChange: (imageUrl: string | null) => void;
  currentImage: string | null;
}

const ImageUpload = ({ onImageChange, currentImage }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onImageChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Profil Resmi
      </label>
      
      {currentImage ? (
        <div className="relative inline-block">
          <img 
            src={currentImage} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-2 border-primary"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <Card
          className={`border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
            isDragging ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-500">
            Yüklemek için sürükleyip bırakın veya tıklayın
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-image"
              onChange={handleImageChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("profile-image")?.click()}
            >
              Select Image
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;