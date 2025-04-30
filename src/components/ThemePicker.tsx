
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ThemePickerProps {
  selectedTheme: string;
  onThemeSelect: (theme: string) => void;
}

const themes = [
  {
    id: "card-gradient-purple",
    name: "Purple Gradient",
    class: "card-gradient-purple",
  },
  {
    id: "card-gradient-blue",
    name: "Blue Gradient",
    class: "card-gradient-blue",
  },
  {
    id: "card-gradient-orange",
    name: "Orange Gradient",
    class: "card-gradient-orange",
  },
  {
    id: "card-gradient-green",
    name: "Green Gradient",
    class: "card-gradient-green",
  },
  {
    id: "card-gradient-pink",
    name: "Pink Gradient",
    class: "card-gradient-pink",
  },
  {
    id: "card-modern",
    name: "Modern",
    class: "card-modern",
  },
  {
    id: "card-minimal",
    name: "Minimal",
    class: "card-minimal",
  },
];

const ThemePicker: React.FC<ThemePickerProps> = ({ selectedTheme, onThemeSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Card Theme</h3>
      <RadioGroup
        value={selectedTheme}
        onValueChange={onThemeSelect}
        className="grid grid-cols-2 gap-4 pt-2"
      >
        {themes.map((theme) => (
          <div key={theme.id} className="flex items-center space-x-2">
            <RadioGroupItem value={theme.id} id={theme.id} />
            <Label
              htmlFor={theme.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded ${theme.class} shadow-sm`}
              ></div>
              <span>{theme.name}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ThemePicker;
