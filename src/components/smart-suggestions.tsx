"use client";

interface SmartSuggestionsProps {
  notes: string;
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ notes }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Smart Suggestions</h2>
      <p>Notes: {notes}</p>
      <p>AI-powered smart suggestions coming soon!</p>
    </div>
  );
};
