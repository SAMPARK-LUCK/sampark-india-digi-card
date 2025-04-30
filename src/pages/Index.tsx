
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardCreator, CardPreview, QRCodeGenerator } from "@/components";
import { Button } from "@/components/ui/button";
import { CardInfo } from "@/types";
import { Settings } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    employeeCode: "",
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
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center relative">
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute right-0 top-0"
            onClick={() => navigate('/admin')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Admin
          </Button>
          
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            DigiCard Fusion
          </h1>
          <p className="text-muted-foreground">
            Create and share your digital business cards with QR codes
          </p>
        </header>

        <div className="grid gap-6 md:gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Card Information
            </h2>
            <CardCreator 
              onCardInfoChange={setCardInfo} 
              cardInfo={cardInfo} 
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Preview & Share
            </h2>
            
            <div className="space-y-6">
              <div className="max-w-sm mx-auto">
                <CardPreview cardInfo={cardInfo} />
              </div>
              
              <QRCodeGenerator cardInfo={cardInfo} />
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            DigiCard Fusion - Create, Share, Connect. Your digital business card solution.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
