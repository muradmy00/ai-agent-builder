import type { AgentProfile, Layer, Skill } from "../types/agent";


interface Maps {
    profile: Record<string, AgentProfile>;
    skills: Record<string, Skill>;
    layers: Record<string, Layer>;
}

interface Props {
    profile: string;
    skills: string[];
    layers: string[];
    provider: string;
    maps: Maps;
}

export default function PreviewPanel({
    profile,
    skills,
    layers,
    provider,
    maps,
}: Props) {
    return (
        <div className="bg-[#0b1220] p-6 rounded-2xl border border-gray-800 mt-6">
            <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Preview</h3>
                <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    LIVE LOGIC
                </span>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-xs text-gray-400">PROFILE</p>
                    <p>{maps.profile[profile]?.name || "None"}</p>
                </div>

                <div>
                    <p className="text-xs text-gray-400">SKILLS</p>
                    <div className="flex gap-2 flex-wrap">
                        {skills.map((id) => (
                            <span key={id} className="bg-gray-800 px-3 py-1 rounded-md text-sm">
                                {maps.skills[id]?.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs text-gray-400">LAYERS</p>
                    <p>{layers.map((id) => maps.layers[id]?.name).join(", ")}</p>
                </div>

                <div>
                    <p className="text-xs text-gray-400">PROVIDER</p>
                    <p className="text-blue-400">{provider}</p>
                </div>
            </div>
        </div>
    );
}