"use client";

import { useState } from "react";

interface ResearchStudy {
  title: string;
  details: string;
  description: string;
  link?: string;
}

interface RecentPublication {
  title: string;
  source: string;
  date: string;
  summary: string;
  link?: string;
}

interface ReferencesProps {
  researchStudies: ResearchStudy[];
  recentPublications: RecentPublication[];
  onEdit: () => void;
}

export default function References({
  researchStudies,
  recentPublications,
  onEdit,
}: ReferencesProps) {
  const [activeTab, setActiveTab] = useState<'studies' | 'publications'>('studies');
  const [showAllStudies, setShowAllStudies] = useState(false);
  const [showAllPublications, setShowAllPublications] = useState(false);

  const displayedStudies = showAllStudies ? researchStudies : researchStudies.slice(0, 3);
  const displayedPublications = showAllPublications ? recentPublications : recentPublications.slice(0, 3);

  return (
    <>
      {/* Header - Outside the card */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">References</h2>
        </div>
        <button 
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors cursor-pointer"
        >
          Edit
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('studies')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors cursor-pointer relative ${
              activeTab === 'studies'
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span>Research Studies</span>
              <span className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-normal text-gray-700">
                {researchStudies.length}
              </span>
            </div>
            {activeTab === 'studies' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('publications')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors cursor-pointer relative ${
              activeTab === 'publications'
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span>Recent Publications</span>
              <span className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-normal text-gray-700">
                {recentPublications.length}
              </span>
            </div>
            {activeTab === 'publications' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'studies' ? (
            <div className="space-y-0">
              {displayedStudies.map((study, index) => (
                <div key={index} className={`space-y-3 ${index < displayedStudies.length - 1 ? 'pb-6 mb-6 border-b border-gray-200' : ''}`}>
                  <h3 className="text-base font-bold text-gray-900">{study.title}</h3>
                  <div className="px-3 py-1.5 bg-blue-50  rounded-md inline-block">
                    <span className="text-sm text-blue-700 font-light">
                      {study.details}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{study.description}</p>
                </div>
              ))}
              
              {researchStudies.length > 3 && !showAllStudies && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setShowAllStudies(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                  >
                    Show {researchStudies.length - 3} More Studies
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-0">
              {displayedPublications.map((publication, index) => (
                <div key={index} className={`space-y-3 ${index < displayedPublications.length - 1 ? 'pb-6 mb-6 border-b border-gray-200' : ''}`}>
                  <h3 className="text-base font-bold text-gray-900">{publication.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{publication.source}</span>
                    <span>•</span>
                    <span>{publication.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{publication.summary}</p>
                  {publication.link && (
                    <a
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      View Publication →
                    </a>
                  )}
                </div>
              ))}
              
              {recentPublications.length > 3 && !showAllPublications && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setShowAllPublications(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                  >
                    Show {recentPublications.length - 3} More Publications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

