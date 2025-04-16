"use client";

import { Textarea } from "@/components/ui/textarea";

interface QuickNotesProps {
  notes: string;
  setNotes: (notes: string) => void;
}

export const QuickNotes: React.FC<QuickNotesProps> = ({ notes, setNotes }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Quick Notes</h2>
      <Textarea
        placeholder="Pen down your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full rounded-md shadow-sm"
      />
    </div>
  );
};
