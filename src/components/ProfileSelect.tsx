import { Headphones } from "lucide-react";
import CustomSelect from "./CustomSelect";
import type { AgentProfile } from "../types/agent";

interface Props {
  data?: { agentProfiles: AgentProfile[] };
  value: string;
  onChange: (value: string) => void;
}

export default function ProfileSelect({ data, value, onChange }: Props) {
  return (
    <CustomSelect
      label="AGENT PROFILE"
      value={value}
      onChange={onChange}
      icon={<Headphones size={18} className="text-blue-400" />}
      options={
        data?.agentProfiles.map((p) => ({
          id: p.id,
          name: p.name,
        })) || []
      }
    />
  );
}