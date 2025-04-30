
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  imageUrl: string | null;
  onImageUpload: (imageUrl: string) => void;
  onImageRemove: () => void;
  icon: React.ReactNode;
  label: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  onImageUpload,
  onImageRemove,
  icon,
  label,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/i)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid image file (JPEG, PNG, GIF, WebP)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 2MB",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Convert the file to a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageUpload(event.target.result as string);
      }
      setIsLoading(false);
    };

    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read the image file",
        variant: "destructive",
      });
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
      />

      {imageUrl ? (
        <div className="space-y-4">
          <Card className="p-2 w-32 h-32 mx-auto overflow-hidden">
            <img
              src={imageUrl}
              alt="Uploaded image"
              className="w-full h-full object-cover"
            />
          </Card>
          
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              disabled={isLoading}
            >
              Change
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onImageRemove}
              disabled={isLoading}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={triggerFileInput}
          variant="outline"
          disabled={isLoading}
          className="w-full py-8 flex flex-col items-center justify-center gap-2 border-dashed"
        >
          {isLoading ? (
            <div className="animate-pulse">Uploading...</div>
          ) : (
            <>
              {icon}
              <span>{label}</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;
