"use client";

import { useState } from "react";
import Image from "next/image";

interface Subtopic {
  id: string;
  title: string;
}

interface SidebarProps {
  mainTopic: string;
  subtopics: Subtopic[];
}

export default function Sidebar({ mainTopic, subtopics }: SidebarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="h-screen bg-white w-64 flex flex-col items-center py-6 fixed left-0 top-0 border-r border-gray-200">
      {/* Logo - centered horizontally, near top */}
      <div className="mb-8">
        <div className="bg-white rounded-lg p-3 shadow-lg">
          <Image
            src="/images/logo/logo.png"
            alt="Sensei Logo"
            width={180}
            height={54}
            priority
          />
        </div>
      </div>

      {/* Main Topic */}
      <div className="w-full px-6">
        <h2 className="text-xl font-bold text-black mb-4 dm-sans-button">
          {mainTopic}
        </h2>

        {/* Subtopics Dropdown */}
        <div className="space-y-2">
          {subtopics.map((subtopic) => (
            <div key={subtopic.id} className="w-full">
              <button
                onClick={() => toggleDropdown(subtopic.id)}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors dm-sans-button text-base font-medium"
              >
                <div className="flex items-center justify-between">
                  <span>{subtopic.title}</span>
                  <span className={`transform transition-transform ${openDropdown === subtopic.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>
              {openDropdown === subtopic.id && (
                <div className="mt-2 ml-4 space-y-1">
                  {/* Dropdown content - can be expanded later */}
                  <div className="px-4 py-2 text-sm text-gray-600">
                    Content for {subtopic.title}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

