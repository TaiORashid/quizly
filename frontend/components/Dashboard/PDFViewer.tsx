"use client";

import { useEffect, useRef } from "react";

interface PDFViewerProps {
  file: File | string | null;
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!file || !containerRef.current) return;

    const loadPDF = async () => {
      try {
        let url: string;
        if (file instanceof File) {
          url = URL.createObjectURL(file);
        } else {
          url = file;
        }

        // Create iframe for PDF display
        const iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.className = "w-full h-full border-0";
        iframe.style.borderRadius = "12px";
        
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
          containerRef.current.appendChild(iframe);
        }

        // Cleanup
        return () => {
          if (file instanceof File && url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
        };
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPDF();
  }, [file]);

  if (!file) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-400 dm-sans-button">No PDF loaded</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-white rounded-xl overflow-hidden shadow-lg"
    />
  );
}

