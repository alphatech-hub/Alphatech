// components/admin/ImageUploader.tsx
"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader } from "lucide-react";

type Props = {
  images: string[];
  onImagesChange: (urls: string[]) => void;
  maxImages?: number;
  label?: string;
};

export default function ImageUploader({
  images,
  onImagesChange,
  maxImages = 5,
  label = "Product images",
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    if (!files.length) return;
    setUploading(true);
    setError("");

    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (images.length + newUrls.length >= maxImages) break;

      // Convert file to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");
        newUrls.push(data.url);
      } catch (err: any) {
        setError(err.message);
        break;
      }
    }

    onImagesChange([...images, ...newUrls]);
    setUploading(false);
  }

  function removeImage(index: number) {
    onImagesChange(images.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="font-body text-xs text-slate-400 block mb-2">{label}</label>

      {/* Current images */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-3">
          {images.map((url, i) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="h-20 w-20 object-cover rounded-lg border border-slate-700"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 font-mono text-[8px] bg-blue-700 text-white px-1 rounded">MAIN</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      {images.length < maxImages && (
        <div
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            uploading ? "border-slate-600 cursor-not-allowed" : "border-slate-700 hover:border-sky-500"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader className="h-6 w-6 text-sky-400 animate-spin" />
              <p className="font-body text-sm text-slate-400">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-6 w-6 text-slate-500" />
              <p className="font-body text-sm text-slate-400">
                Click to upload images
              </p>
              <p className="font-body text-xs text-slate-600">
                JPG, PNG, WEBP · Max {maxImages} images · First image is the main photo
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-2 text-xs text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
          {error}
          {error.includes("not configured") && (
            <span className="block mt-1 text-slate-400">
              You need to add Cloudinary keys to .env.local — see the README for instructions.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
