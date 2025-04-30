
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardInfo, CardCollection } from "@/types";
import { CardList } from "@/components/CardList";
import { CardEditor } from "@/components/CardEditor";
import { Search, PlusCircle, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const [cards, setCards] = useState<CardCollection>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load cards from localStorage on mount
  useEffect(() => {
    const savedCards = localStorage.getItem("employeeCards");
    if (savedCards) {
      try {
        setCards(JSON.parse(savedCards));
      } catch (error) {
        console.error("Error parsing saved cards:", error);
      }
    }
  }, []);

  const saveCardsToStorage = (updatedCards: CardCollection) => {
    localStorage.setItem("employeeCards", JSON.stringify(updatedCards));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateCard = () => {
    const newCard: CardInfo = {
      employeeCode: "",
      name: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      bio: "",
      theme: "card-rathi-group",
      profilePicture: null,
      companyLogo: null,
      isActive: true,
      lastUpdated: new Date().toISOString(),
    };
    setSelectedCard(newCard);
    setIsEditing(true);
  };

  const handleEditCard = (employeeCode: string) => {
    if (cards[employeeCode]) {
      setSelectedCard(cards[employeeCode]);
      setIsEditing(true);
    }
  };

  const handleSaveCard = (card: CardInfo) => {
    if (!card.employeeCode) {
      toast({
        title: "Error",
        description: "Employee code is required",
        variant: "destructive",
      });
      return;
    }

    const updatedCards = {
      ...cards,
      [card.employeeCode]: {
        ...card,
        lastUpdated: new Date().toISOString(),
      },
    };

    setCards(updatedCards);
    saveCardsToStorage(updatedCards);
    setIsEditing(false);
    setSelectedCard(null);

    toast({
      title: "Success",
      description: `Card for ${card.name} (${card.employeeCode}) has been saved.`,
    });
  };

  const handleDeleteCard = (employeeCode: string) => {
    const updatedCards = { ...cards };
    delete updatedCards[employeeCode];
    setCards(updatedCards);
    saveCardsToStorage(updatedCards);

    toast({
      title: "Card Deleted",
      description: "The employee card has been removed.",
    });
  };

  const handleViewCard = (employeeCode: string) => {
    navigate(`/view/${employeeCode}`);
  };

  const filteredCards = Object.values(cards).filter(
    (card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Card Management
            </h1>
            <p className="text-muted-foreground">
              Add, edit, and manage employee business cards
            </p>
          </div>
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Card Creator
          </Button>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cards..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleCreateCard}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Card
              </Button>
            </div>

            <CardList
              cards={filteredCards}
              onEdit={handleEditCard}
              onDelete={handleDeleteCard}
              onView={handleViewCard}
            />
          </div>

          <div>
            {isEditing && selectedCard ? (
              <div className="border rounded-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {selectedCard.employeeCode
                      ? `Edit Card: ${selectedCard.employeeCode}`
                      : "Create New Card"}
                  </h2>
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
                <CardEditor
                  cardInfo={selectedCard}
                  onSave={handleSaveCard}
                />
              </div>
            ) : (
              <div className="border rounded-md p-6 flex items-center justify-center bg-muted/30 h-full">
                <div className="text-center p-12">
                  <h3 className="text-xl mb-2">No Card Selected</h3>
                  <p className="text-muted-foreground mb-4">
                    Select a card to edit or create a new one
                  </p>
                  <Button onClick={handleCreateCard} variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Card
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
