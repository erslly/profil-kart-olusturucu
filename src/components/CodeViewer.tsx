import React from 'react';
import { Card } from "../components/ui/card";
import { CardStyle, ProfileData } from "../types/profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Copy, Check } from "lucide-react";

interface CodeViewerProps {
  profile: ProfileData;
  style: CardStyle;
  htmlCode: string;
  cssCode: string;
}

const CodeViewer = ({ htmlCode, cssCode }: CodeViewerProps) => {
  const [copyStatus, setCopyStatus] = React.useState<{
    html: boolean;
    css: boolean;
  }>({ html: false, css: false });

  const copyToClipboard = async (code: string, type: 'html' | 'css') => {
    await navigator.clipboard.writeText(code);
    setCopyStatus(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopyStatus(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  return (
    <Card className="p-4 overflow-hidden">
      <Tabs defaultValue="html">
        <TabsList className="mb-4">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="html" className="relative">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2 z-10"
            onClick={() => copyToClipboard(htmlCode, 'html')}
          >
            {copyStatus.html ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto max-h-[400px] text-sm">
            <code>{htmlCode}</code>
          </pre>
        </TabsContent>
        
        <TabsContent value="css" className="relative">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 right-2 z-10"
            onClick={() => copyToClipboard(cssCode, 'css')}
          >
            {copyStatus.css ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto max-h-[400px] text-sm">
            <code>{cssCode}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CodeViewer;