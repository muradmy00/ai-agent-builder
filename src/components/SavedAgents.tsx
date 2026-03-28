import type { SavedAgent } from "../types/agent";
import { ArrowRight } from "lucide-react";


interface Props {
  agents: SavedAgent[];
  onLoad: (agent: SavedAgent) => void;
  onDelete: (index: number) => void;
}

export default function SavedAgents({ agents, onLoad, onDelete }: Props) {
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Saved Agents</h2>


        <span className="flex items-center gap-1 text-blue-400 text-sm cursor-pointer hover:text-blue-300 transition group">
          View All
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {agents.map((a, i) => (
          <div
            key={i}
            className="bg-[#0b1220] border border-gray-800 p-6 rounded-2xl"
          >
            <h3 className="font-semibold">{a.name}</h3>

            <p className="text-sm text-gray-400 mt-2">
              {a.provider} • {a.skills.length} Skills • {a.layers.length} Layers
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => onLoad(a)}
                className="bg-blue-500 px-3 py-1 rounded cursor-pointer"
              >
                Load
              </button>

              <button
                onClick={() => onDelete(i)}
                className="bg-red-500 px-3 py-1 rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}