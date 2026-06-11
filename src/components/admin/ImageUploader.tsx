"use client";

import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, isFirebaseEnabled } from "@/lib/firebase";
import { Loader, UploadCloud } from "lucide-react";

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ onUploadSuccess, label = "Upload Image to Firebase" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isFirebaseEnabled || !storage) {
      alert("Firebase Storage is not enabled or configured correctly in environment variables.");
      return;
    }

    setUploading(true);
    setProgress(0);

    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percentage);
      },
      (error) => {
        console.error("Upload failed:", error);
        alert("Upload failed: " + error.message);
        setUploading(false);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadSuccess(downloadUrl);
        } catch (err: any) {
          alert("Failed to retrieve download URL: " + err.message);
        } finally {
          setUploading(false);
        }
      }
    );
  };

  return (
    <div className="flex flex-col">
      <label className="relative flex items-center justify-center border border-dashed border-slate-800 hover:border-blue-600/50 bg-slate-950 px-4 py-2 rounded-lg cursor-pointer transition-colors text-xs font-semibold text-slate-400 hover:text-white h-10 select-none">
        {uploading ? (
          <div className="flex items-center space-x-2">
            <Loader className="h-4 w-4 animate-spin text-blue-600" />
            <span>Uploading... {progress}%</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <UploadCloud className="h-4 w-4 text-blue-600" />
            <span>{label}</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
