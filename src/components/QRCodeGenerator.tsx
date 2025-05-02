
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Download, Share, Contact } from "lucide-react";
import { CardInfo } from "@/types";
import QRCode from "react-qr-code";

interface QRCodeGeneratorProps {
  cardInfo: CardInfo;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ cardInfo }) => {
  const { toast } = useToast();
  const [vCardData, setVCardData] = useState<string>("");
  const [qrVisible, setQrVisible] = useState<boolean>(true);

  useEffect(() => {
    if (!cardInfo.name) return;

    // Generate vCard data
    const vCard = generateVCardData(cardInfo);
    setVCardData(vCard);
  }, [cardInfo]);

  const generateVCardData = (info: CardInfo): string => {
    let vCard = "BEGIN:VCARD\nVERSION:3.0\n";
    if (info.name) vCard += `FN:${info.name}\n`;
    if (info.title) vCard += `TITLE:${info.title}\n`;
    if (info.company) vCard += `ORG:${info.company}\n`;
    if (info.email) vCard += `EMAIL:${info.email}\n`;
    if (info.phone) vCard += `TEL:${info.phone}\n`;
    if (info.website) vCard += `URL:${info.website}\n`;
    if (info.address) vCard += `ADR:;;${info.address};;;\n`;
    vCard += "END:VCARD";
    
    return vCard;
  };

  const downloadQRCode = () => {
    if (!qrVisible || !vCardData) return;
    
    // Find the SVG element and convert it to a data URL
    const svg = document.querySelector('.qr-code-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${cardInfo.name || 'business'}-qr-code.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast({
        title: "QR Code Downloaded",
        description: "Your QR code has been downloaded successfully.",
      });
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const downloadVCard = () => {
    if (!vCardData) return;
    
    // Create vCard file and trigger download
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${cardInfo.name || 'contact'}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Contact Downloaded",
      description: "Your contact information has been downloaded as a vCard.",
    });
  };

  const shareCard = async () => {
    try {
      if (!vCardData || !cardInfo.name) return;
      
      const blob = new Blob([vCardData], { type: "text/vcard" });
      const file = new File([blob], `${cardInfo.name}.vcf`, { type: "text/vcard" });
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `${cardInfo.name}'s Contact Card`,
            text: `Contact information for ${cardInfo.name}`,
            files: [file],
          });
          
          toast({
            title: "Shared Successfully",
            description: "Your contact card has been shared.",
          });
        } catch (err) {
          console.error("Error sharing:", err);
          toast({
            title: "Sharing Failed",
            description: "Unable to share your contact card. Try downloading instead.",
          });
        }
      } else {
        toast({
          title: "Sharing Not Supported",
          description: "Your browser doesn't support sharing files. Try downloading instead.",
        });
      }
    } catch (error) {
      console.error("Share error:", error);
      toast({
        title: "Sharing Failed",
        description: "Unable to share. Try downloading the vCard directly.",
      });
    }
  };

  if (!cardInfo.name) {
    return (
      <Card className="w-full flex items-center justify-center p-8 text-center">
        <p className="text-muted-foreground">
          Fill in your information to generate a QR code and vCard
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <Tabs defaultValue="qrcode" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
          <TabsTrigger value="vcard">vCard</TabsTrigger>
        </TabsList>
        
        <CardContent className="pt-6">
          <TabsContent value="qrcode" className="flex flex-col items-center space-y-4">
            <div className="relative w-full max-w-xs mx-auto">
              <QRCode 
                value={vCardData}
                size={200}
                className="w-full h-auto drop-shadow-md qr-code-svg"
                level="M"
              />
              <p className="text-center text-sm text-muted-foreground mt-2 font-medium">
                Scan to add contact
              </p>
            </div>
            
            <Button 
              onClick={downloadQRCode} 
              className="w-full"
              disabled={!vCardData}
            >
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </TabsContent>
          
          <TabsContent value="vcard" className="flex flex-col space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <h3 className="font-medium">{cardInfo.name}</h3>
              <p className="text-sm text-muted-foreground">vCard Contact Information</p>
            </div>
            
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
              <Button 
                onClick={downloadVCard} 
                className="flex-1"
              >
                <Contact className="mr-2 h-4 w-4" />
                Download vCard
              </Button>
              
              <Button 
                onClick={shareCard} 
                variant="outline" 
                className="flex-1"
              >
                <Share className="mr-2 h-4 w-4" />
                Share Contact
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default QRCodeGenerator;
