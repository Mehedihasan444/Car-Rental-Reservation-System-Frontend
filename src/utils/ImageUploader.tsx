import React from "react";
import { Input } from "@/components/ui/input";

export const ImageUploader: React.FC<{ onUpload: (files: FileList | null) => void }> = ({ onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    onUpload(files);
  };

  return (
    <div className="flex gap-2 justify-between items-center">
      <Input
        id="picture"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
};
