import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Download, Code } from "lucide-react";
import html2canvas from 'html2canvas';
import { CardStyle, ProfileData } from "../types/profile";
import CodeViewer from './CodeViewer';
import { generateHtmlCss } from '../lib/codeGenerator';

interface DownloadCardProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  profile: ProfileData;
  style: CardStyle;
}

const DownloadCard = ({ cardRef, profile, style }: DownloadCardProps) => {
  const [showCode, setShowCode] = useState(false);
  const [htmlCode, cssCode] = generateHtmlCss(profile, style);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, 
        logging: false,
        useCORS: true,
        backgroundColor: null,
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'profile-card.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'profile-card.html';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadCss = () => {
    const blob = new Blob([cssCode], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'profile-card.css';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          onClick={downloadCard}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Kartı İndir
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setShowCode(!showCode)}
          className="gap-2"
        >
          <Code className="h-4 w-4" />
          {showCode ? 'Kodu Gizle' : 'Kodu Görüntüle'}
        </Button>
      </div>
      
      {showCode && (
        <div className="space-y-4">
          <CodeViewer 
            profile={profile} 
            style={style} 
            htmlCode={htmlCode}
            cssCode={cssCode}
          />
          
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={downloadHtml}>
              HTML İndir
            </Button>
            <Button variant="outline" size="sm" onClick={downloadCss}>
              CSS İndir
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadCard;