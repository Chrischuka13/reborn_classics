import React, { useState } from 'react';

export const MediaUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile); // Must match the key 'file' in upload.single('file')

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUploadedUrl(data.url);
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md max-w-md space-y-4">
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-black file:text-white hover:file:bg-neutral-800 cursor-pointer"
      />

      <button
        type="button"
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="w-full bg-black text-white py-2 font-medium disabled:bg-gray-400"
      >
        {uploading ? 'Uploading to Cloudinary...' : 'Upload Media'}
      </button>

      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-xs text-green-600 font-semibold mb-2">Upload Complete!</p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs underline text-blue-600 break-all"
          >
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
};