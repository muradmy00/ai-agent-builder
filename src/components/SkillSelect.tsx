import { Mail } from "lucide-react";
import CustomSelect from "./CustomSelect";
import type { Skill } from "../types/agent";

interface Props {
  data?: { skills: Skill[] };
  onAdd: (id: string) => void;
}

export default function SkillSelect({ data, onAdd }: Props) {
  return (
    <CustomSelect
      label="SKILLS"
      onChange={onAdd}
      icon={<Mail size={18} className="text-blue-400" />}
      options={
        data?.skills.map((s) => ({
          id: s.id,
          name: s.name,
        })) || []
      }
    />
  );
}