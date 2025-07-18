
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { User, Building } from "lucide-react";
import ThemePicker from "./ThemePicker";
import { CardInfo } from "@/types";
import ImageUploader from "./ImageUploader";

interface CardCreatorProps {
  onCardInfoChange: (cardInfo: CardInfo) => void;
  cardInfo: CardInfo;
}

const CardCreator: React.FC<CardCreatorProps> = ({ onCardInfoChange, cardInfo }) => {
  const { toast } = useToast();
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onCardInfoChange({
      ...cardInfo,
      [name]: value,
    });
  };

  const handleThemeChange = (theme: string) => {
    onCardInfoChange({
      ...cardInfo,
      theme,
    });
  };

  const handleImageUpload = (imageType: "profilePicture" | "companyLogo", imageUrl: string) => {
    onCardInfoChange({
      ...cardInfo,
      [imageType]: imageUrl,
    });
  };

  const handleImageRemove = (imageType: "profilePicture" | "companyLogo") => {
    onCardInfoChange({
      ...cardInfo,
      [imageType]: null,
    });
  };

  const handleReset = () => {
    const emptyCard: CardInfo = {
      employeeCode: "",  // Added employeeCode property to fix the TypeScript error
      name: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      bio: "",
      theme: "card-gradient-purple",
      profilePicture: null,
      companyLogo: null,
    };
    
    onCardInfoChange(emptyCard);
    
    toast({
      title: "Card Reset",
      description: "Your card information has been cleared.",
    });
  };

  return (
    <Card className="w-full">
      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
        </TabsList>
        
        <CardContent className="pt-6">
          <TabsContent value="personal">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder="John Doe" 
                  value={cardInfo.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="Software Developer" 
                  value={cardInfo.title}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="johndoe@example.com"
                  value={cardInfo.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  placeholder="+1 123 456 7890" 
                  value={cardInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="business">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  name="company"
                  placeholder="Acme Inc" 
                  value={cardInfo.company}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  name="website"
                  placeholder="https://www.example.com" 
                  value={cardInfo.website}
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address"
                  placeholder="123 Business St, City" 
                  value={cardInfo.address}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio / About</Label>
                <Input 
                  id="bio" 
                  name="bio"
                  placeholder="A brief description about yourself or your business"
                  value={cardInfo.bio}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images">
            <div className="grid gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Picture</h3>
                <ImageUploader
                  imageUrl={cardInfo.profilePicture}
                  onImageUpload={(imageUrl) => handleImageUpload("profilePicture", imageUrl)}
                  onImageRemove={() => handleImageRemove("profilePicture")}
                  icon={<User className="h-6 w-6" />}
                  label="Upload Profile Picture"
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Company Logo</h3>
                <ImageUploader
                  imageUrl={cardInfo.companyLogo}
                  onImageUpload={(imageUrl) => handleImageUpload("companyLogo", imageUrl)}
                  onImageRemove={() => handleImageRemove("companyLogo")}
                  icon={<Building className="h-6 w-6" />}
                  label="Upload Company Logo"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="design">
            <ThemePicker
              selectedTheme={cardInfo.theme}
              onThemeSelect={handleThemeChange}
            />
          </TabsContent>
        </CardContent>
      </Tabs>

      <div className="p-6 pt-0">
        <Separator className="my-4" />
        <Button variant="outline" onClick={handleReset} className="w-full">
          Reset Card
        </Button>
      </div>
    </Card>
  );
};

export default CardCreator;
