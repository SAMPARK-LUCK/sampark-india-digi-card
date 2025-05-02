
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardInfo, CardCollection } from "@/types";
import CardPreview from "@/components/CardPreview";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { ArrowLeft, Edit, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ViewCard = () => {
  const { employeeCode } = useParams<{ employeeCode: string }>();
  const [card, setCard] = useState<CardInfo | null>(null);
  const [vCardData, setVCardData] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCard = () => {
      const savedCards = localStorage.getItem("employeeCards");
      if (savedCards && employeeCode) {
        try {
          const cardsCollection: CardCollection = JSON.parse(savedCards);
          if (cardsCollection[employeeCode]) {
            setCard(cardsCollection[employeeCode]);
            // Generate vCard data when card loads
            setVCardData(generateVCardData(cardsCollection[employeeCode]));
          }
        } catch (error) {
          console.error("Error fetching card:", error);
        }
      }
    };

    fetchCard();
  }, [employeeCode]);

  // Function to generate vCard data
  const generateVCardData = (info: CardInfo): string => {
    let vCard = "BEGIN:VCARD\nVERSION:3.0\n";
    if (info.name) vCard += `FN:${info.name}\n`;
    if (info.title || info.company) {
      vCard += `ORG:${info.company || ""}\n`;
      if (info.title) vCard += `TITLE:${info.title}\n`;
    }
    if (info.email) vCard += `EMAIL:${info.email}\n`;
    if (info.phone) vCard += `TEL:${info.phone}\n`;
    if (info.website) vCard += `URL:${info.website}\n`;
    if (info.address) vCard += `ADR:;;${info.address};;;\n`;
    vCard += "END:VCARD";
    
    return vCard;
  };

  const downloadVCard = () => {
    if (!vCardData || !card) return;
    
    // Create vCard file and trigger download
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${card.name || 'contact'}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Contact Downloaded",
      description: "Contact information has been downloaded as a vCard.",
    });
  };

  if (!card) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Card Not Found</h2>
          <p className="mb-6">The employee card you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/admin")}>Back to Admin</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {card.name}'s Card
            </h1>
            <p className="text-muted-foreground">
              Employee Code: {card.employeeCode}
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
            <Button onClick={() => navigate(`/admin?edit=${card.employeeCode}`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Card
            </Button>
          </div>
        </header>

        <div className="grid gap-6 md:gap-10 lg:grid-cols-2">
          <div className="max-w-sm mx-auto">
            <CardPreview cardInfo={card} />
            <Button 
              onClick={downloadVCard}
              variant="secondary"
              className="w-full mt-2"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Contact (VCF)
            </Button>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Share Card
            </h2>
            <QRCodeGenerator cardInfo={card} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
