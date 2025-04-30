
import React from "react";
import { CardInfo } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Trash2, Eye } from "lucide-react";

interface CardListProps {
  cards: CardInfo[];
  onEdit: (employeeCode: string) => void;
  onDelete: (employeeCode: string) => void;
  onView: (employeeCode: string) => void;
}

export const CardList: React.FC<CardListProps> = ({
  cards,
  onEdit,
  onDelete,
  onView,
}) => {
  if (cards.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md bg-muted/20">
        <p className="text-muted-foreground">No cards found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {cards.map((card) => (
        <Card key={card.employeeCode} className="group">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex justify-between items-center">
              <span>{card.name}</span>
              <span className="text-sm font-normal text-muted-foreground">
                #{card.employeeCode}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="text-sm text-muted-foreground">
              <p>
                {card.title} {card.company && `@ ${card.company}`}
              </p>
              <p className="text-xs mt-1">
                Last updated:{" "}
                {card.lastUpdated 
                  ? new Date(card.lastUpdated).toLocaleDateString() 
                  : "Never"}
              </p>
            </div>
          </CardContent>
          <CardFooter className="pt-0 justify-end gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onView(card.employeeCode)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(card.employeeCode)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(card.employeeCode)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
