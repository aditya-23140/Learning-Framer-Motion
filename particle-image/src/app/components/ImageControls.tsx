import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type ImageControlsProps = {
  onImageUpload: (imageUrl: string) => void;
  onReset: () => void;
  defaultImage?: string;
};

export default function ImageControls({
  onImageUpload,
  onReset,
  defaultImage = "/placeholder.svg",
}: ImageControlsProps) {
  const [imageName, setImageName] = useState<string>("No image selected");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDefaultImage = () => {
    setImageName("Default image");
    onImageUpload(defaultImage);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 space-y-2 w-full">
            <div className="flex justify-between items-center">
              <Label htmlFor="image-upload">Upload Image</Label>
              <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                {imageName}
              </span>
            </div>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDefaultImage} variant="outline">
              Use Default
            </Button>
            <Button onClick={onReset} variant="default">
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
