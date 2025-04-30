
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CardInfo } from "@/types";

interface CardPreviewProps {
  cardInfo: CardInfo;
}

const CardPreview: React.FC<CardPreviewProps> = ({ cardInfo }) => {
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

  const initials = getInitials(name);

  return (
    <Card className={`w-full overflow-hidden ${theme} text-white p-6`}>
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
};

export default CardPreview;
