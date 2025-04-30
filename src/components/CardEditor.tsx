
import React, { useState } from "react";
import { CardInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ThemePicker from "./ThemePicker";
import ImageUploader from "./ImageUploader";
import CardPreview from "./CardPreview";
import { Save, User, Building } from "lucide-react";

interface CardEditorProps {
  cardInfo: CardInfo;
  onSave: (cardInfo: CardInfo) => void;
}

export const CardEditor: React.FC<CardEditorProps> = ({
  cardInfo,
  onSave,
}) => {
  const [card, setCard] = useState<CardInfo>(cardInfo);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCard({
      ...card,
      [name]: value,
    });
  };

  const handleThemeChange = (theme: string) => {
    setCard({
      ...card,
      theme,
    });
  };

  const handleImageUpload = (
    imageType: "profilePicture" | "companyLogo",
    imageUrl: string
  ) => {
    setCard({
      ...card,
      [imageType]: imageUrl,
    });
  };

  const handleImageRemove = (
    imageType: "profilePicture" | "companyLogo"
  ) => {
    setCard({
      ...card,
      [imageType]: null,
    });
  };

  const handleSave = () => {
    onSave(card);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <Card className="w-full">
        <Tabs defaultValue="employee">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="employee">Employee</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>

          <CardContent className="pt-6">
            <TabsContent value="employee">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeCode">Employee Code *</Label>
                  <Input
                    id="employeeCode"
                    name="employeeCode"
                    placeholder="E12345"
                    value={card.employeeCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={card.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Software Developer"
                    value={card.title}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio / About</Label>
                  <Input
                    id="bio"
                    name="bio"
                    placeholder="A brief description about yourself or your business"
                    value={card.bio}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    value={card.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1 123 456 7890"
                    value={card.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Business St, City"
                    value={card.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="company">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Acme Inc"
                    value={card.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://www.example.com"
                    value={card.website}
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
                    imageUrl={card.profilePicture}
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
                    imageUrl={card.companyLogo}
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
                selectedTheme={card.theme}
                onThemeSelect={handleThemeChange}
              />
            </TabsContent>
          </CardContent>
        </Tabs>

        <div className="p-6 pt-0">
          <Separator className="my-4" />
          <Button onClick={handleSave} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Card
          </Button>
        </div>
      </Card>

      <div>
        <p className="font-medium mb-3 text-sm text-muted-foreground">Preview</p>
        <CardPreview cardInfo={card} />
      </div>
    </div>
  );
};
