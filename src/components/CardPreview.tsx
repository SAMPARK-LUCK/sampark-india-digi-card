
import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CardInfo } from "@/types";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";

interface CardPreviewProps {
  cardInfo: CardInfo;
}

const CardPreview: React.FC<CardPreviewProps> = ({ cardInfo }) => {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);
  const { name, title, company, email, phone, website, address, bio, theme, profilePicture, companyLogo } = cardInfo;
  
  // Get initials for the avatar
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, { 
        backgroundColor: null,
        scale: 2 // Higher quality
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${name || 'business'}-card.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Card Downloaded",
        description: "Your business card has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error downloading card:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your card. Please try again.",
        variant: "destructive",
      });
    }
  };

  const initials = getInitials(name);

  const isRathiTheme = theme === "card-rathi-group";

  const cardContent = isRathiTheme ? (
    <Card ref={cardRef} className="w-full overflow-hidden bg-white border-2 border-gray-200 text-black">
      {/* Top section with name, title and logo */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl font-bold uppercase tracking-wide">
              {name || "FULL NAME"}
            </h2>
            <div className="w-12 h-0.5 bg-red-600 mb-1" />
            <p className="text-sm font-medium">
              {title || "Job Title"}
            </p>
          </div>
          
          {companyLogo ? (
            <img 
              src={companyLogo} 
              alt="Company Logo" 
              className="h-12 w-auto object-contain" 
            />
          ) : (
            <div className="h-12 w-24 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
              Company Logo
            </div>
          )}
        </div>
      </div>
      
      {/* Company banner */}
      <div className="bg-yellow-400 p-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold uppercase tracking-wide text-black">
            {company || "COMPANY NAME"}
          </h3>
          <p className="text-xs text-black">
            {company ? "An ISO 9001:2008 Certified Co." : ""}
          </p>
        </div>
      </div>
      
      {/* Contact information */}
      <div className="p-4 space-y-2">
        <div className="flex flex-wrap gap-3">
          {phone && (
            <div className="flex items-center space-x-2">
              <span className="text-sm">📞</span>
              <span className="text-sm">{phone}</span>
            </div>
          )}
          
          {email && (
            <div className="flex items-center space-x-2">
              <span className="text-sm">📧</span>
              <span className="text-sm">{email}</span>
            </div>
          )}
          
          {website && (
            <div className="flex items-center space-x-2">
              <span className="text-sm">🌐</span>
              <span className="text-sm">{website}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  ) : (
    <Card ref={cardRef} className={`w-full overflow-hidden ${theme} text-white p-6`}>
      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="w-24 h-24 bg-white/30 hover:scale-105 transition-transform">
          {profilePicture ? (
            <AvatarImage src={profilePicture} alt={name} className="object-cover" />
          ) : (
            <AvatarFallback className="text-2xl font-bold">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {name || "Your Name"}
          </h2>
          <p className="text-sm opacity-90">
            {title || "Job Title"} 
            {company ? ` @ ${company}` : ""}
          </p>
        </div>
        
        {companyLogo && (
          <div className="py-2">
            <div className="bg-white/90 rounded-lg p-2 w-16 h-16 mx-auto flex items-center justify-center">
              <img 
                src={companyLogo} 
                alt={`${company} logo`} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
        
        <Separator className="bg-white/30" />
        
        <div className="grid gap-2 w-full">
          {email && (
            <div className="flex items-center justify-center space-x-2">
              <span className="font-medium">Email:</span>
              <span className="opacity-90">{email}</span>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center justify-center space-x-2">
              <span className="font-medium">Phone:</span>
              <span className="opacity-90">{phone}</span>
            </div>
          )}
          
          {website && (
            <div className="flex items-center justify-center space-x-2">
              <span className="font-medium">Web:</span>
              <span className="opacity-90">{website}</span>
            </div>
          )}
          
          {address && (
            <div className="flex items-center justify-center space-x-2">
              <span className="font-medium">Address:</span>
              <span className="opacity-90">{address}</span>
            </div>
          )}
        </div>
        
        {bio && (
          <>
            <Separator className="bg-white/30" />
            <div className="w-full">
              <p className="text-sm italic opacity-90">{bio}</p>
            </div>
          </>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-4">
      {cardContent}
      <Button 
        onClick={downloadCard} 
        variant="outline" 
        className="w-full"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Card Preview
      </Button>
    </div>
  );
};

export default CardPreview;
