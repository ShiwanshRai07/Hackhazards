
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";

const FileUploadButton = ({ icon, label, accept, onFileSelect }) => {
  const inputRef = useRef(null);
  
  const handleClick = () => {
    inputRef.current?.click();
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    // Reset the input so the same file can be uploaded again
    e.target.value = '';
  };
  
  return (
    <>
      <Button 
        onClick={handleClick} 
        variant="outline" 
        size="sm"
        className="border-white/20 hover:bg-white/10 rounded-{8px}"
      >
        {icon} {label}
      </Button>
      <input 
        type="file" 
        className="hidden" 
        ref={inputRef} 
        accept={accept}
        onChange={handleFileChange}
      />
    </>
  );
};

export default FileUploadButton;