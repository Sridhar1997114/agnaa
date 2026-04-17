"use client";

import React, { useState } from "react";
import { Upload, X, File, Loader2, CheckCircle2 } from "lucide-react";
import { uploadFile } from "@/app/pro/actions";

interface FileUploadProps {
  projectId: string;
  onSuccess?: () => void;
}

export function FileUpload({ projectId, onSuccess }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setStatus("uploading");
    setProgress(30); // Mock progress

    const formData = new FormData();
    formData.append("file", file);

    const { error } = await uploadFile(formData, projectId);

    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setProgress(100);
      setStatus("success");
      setFile(null);
      if (onSuccess) onSuccess();
    }
    setIsUploading(false);
  };

  return (
    <div className="bg-[#14141F] border border-white/5 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-bold flex items-center gap-2">
          <Upload size={18} className="text-brand-violet" />
          Transmit Asset
        </h3>
        {file && (
          <button onClick={() => setFile(null)} className="text-brand-muted hover:text-white transition-colors">
            <X size={16} />
          </button>
        )}
      </div>

      {!file ? (
        <label className="border-2 border-dashed border-white/10 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-brand-violet/50 hover:bg-brand-violet/5 transition-all group">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <Upload size={32} className="text-brand-muted group-hover:text-brand-violet mb-3" />
          <p className="text-sm text-brand-muted font-medium">Click to select architectural file</p>
          <p className="text-[10px] text-brand-muted/50 uppercase tracking-widest mt-1">PDF, DWG, JPG (Max 50MB)</p>
        </label>
      ) : (
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-violet/20 rounded-lg flex items-center justify-center text-brand-violet">
              <File size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{file.name}</p>
              <p className="text-[10px] text-brand-muted uppercase">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>

          {status === "uploading" && (
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-violet transition-all duration-300" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <p className="text-[10px] text-brand-muted text-center font-bold animate-pulse">ENCRYPTING & TRANSMITTING...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-400/10 p-3 rounded-xl">
              <CheckCircle2 size={16} /> Asset Secured in Vault
            </div>
          )}

          {status !== "success" && (
            <button
              disabled={isUploading}
              onClick={handleUpload}
              className="w-full bg-brand-gradient text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-violet/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="animate-spin" size={20} /> : "Initiate Upload"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
