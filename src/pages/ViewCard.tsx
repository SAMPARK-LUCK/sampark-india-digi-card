
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardInfo, CardCollection } from "@/types";
import CardPreview from "@/components/CardPreview";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { ArrowLeft, Edit } from "lucide-react";

const ViewCard = () => {
  const { employeeCode } = useParams<{ employeeCode: string }>();
  const [card, setCard] = useState<CardInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = () => {
      const savedCards = localStorage.getItem("employeeCards");
      if (savedCards && employeeCode) {
        try {
          const cardsCollection: CardCollection = JSON.parse(savedCards);
          if (cardsCollection[employeeCode]) {
            setCard(cardsCollection[employeeCode]);
          }
        } catch (error) {
          console.error("Error fetching card:", error);
        }
      }
    };

    fetchCard();
  }, [employeeCode]);

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
