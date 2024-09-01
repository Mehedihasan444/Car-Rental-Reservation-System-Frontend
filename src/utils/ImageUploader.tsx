import React from "react";

interface ImageUploaderProps {
  onUpload: (file: File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onUpload(file);
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="border border-gray-300 p-2 rounded"
    />
  );
};
