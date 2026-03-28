import { useState, useMemo, useCallback } from "react";
import { useAgentData } from "./hooks/useAgentData";
import { useLocalStorage } from "./hooks/useLocalStorage";

import Header from "./components/Header";
import ProfileSelect from "./components/ProfileSelect";
import SkillSelect from "./components/SkillSelect";
import LayerSelect from "./components/LayerSelect";
import ProviderSelect from "./components/ProviderSelect";
import PreviewPanel from "./components/PreviewPanel";
import SavedAgents from "./components/SavedAgents";
import DragList from "./components/DragList";

import type { AgentProfile, Layer, SavedAgent, Skill } from "./types/agent";

function App() {
  const { data, isLoading } = useAgentData();

  const [profile, setProfile] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [layers, setLayers] = useState<string[]>([]);
  const [provider, setProvider] = useState("");

  const [savedAgents, setSavedAgents] =
    useLocalStorage<SavedAgent[]>("agents", []);

  const maps = useMemo(() => {
    if (!data) {
      return {
        profile: {} as Record<string, AgentProfile>,
        skills: {} as Record<string, Skill>,
        layers: {} as Record<string, Layer>,
      };
    }

    return {
      profile: Object.fromEntries(data.agentProfiles.map((p) => [p.id, p])),
      skills: Object.fromEntries(data.skills.map((s) => [s.id, s])),
      layers: Object.fromEntries(data.layers.map((l) => [l.id, l])),
    };
  }, [data]);

  const addSkill = useCallback((id: string) => {
    setSkills((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const addLayer = useCallback((id: string) => {
    setLayers((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const saveAgent = useCallback(() => {
    const newAgent: SavedAgent = {
      name: "Agent",
      profile,
      skills,
      layers,
      provider,
    };

    setSavedAgents((prev) => [...prev, newAgent]);
  }, [profile, skills, layers, provider, setSavedAgents]);

  const handleLoad = useCallback((agent: SavedAgent) => {
    setProfile(agent.profile);
    setSkills(agent.skills);
    setLayers(agent.layers);
    setProvider(agent.provider);
  }, []);

  const handleDelete = useCallback(
    (index: number) => {
      setSavedAgents((prev) =>
        prev.filter((_, idx) => idx !== index)
      );
    },
    [setSavedAgents]
  );

  if (isLoading) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div className="space-y-5">
            <ProfileSelect data={data} value={profile} onChange={setProfile} />
            <SkillSelect data={data} onAdd={addSkill} />
            <LayerSelect data={data} onAdd={addLayer} />
            <ProviderSelect value={provider} onChange={setProvider} />

            <button
              onClick={saveAgent}
              className="w-48 bg-indigo-500 hover:bg-indigo-600 py-3 rounded-lg font-semibold shadow-lg cursor-pointer"
            >
              Save Agent
            </button>
          </div>

          <div className="space-y-6">
            <PreviewPanel
              profile={profile}
              skills={skills}
              layers={layers}
              provider={provider}
              maps={maps}
            />

            <div>
              <p className="text-sm text-gray-400 mb-3">Reorder Skills</p>

              <DragList
                items={skills.map((id) => ({
                  id,
                  name: maps.skills[id]?.name || "Unknown",
                }))}
                onChange={(newItems) =>
                  setSkills(newItems.map((i) => i.id))
                }
              />
            </div>
          </div>
        </div>

        <SavedAgents
          agents={savedAgents}
          onLoad={handleLoad}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;