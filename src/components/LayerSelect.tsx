import { Brain } from "lucide-react";
import CustomSelect from "./CustomSelect";
import type { Layer } from "../types/agent";

interface Props {
  data?: { layers: Layer[] };
  onAdd: (id: string) => void;
}

export default function LayerSelect({ data, onAdd }: Props) {
  return (
    <CustomSelect
      label="LAYERS"
      onChange={onAdd}
      icon={<Brain size={18} className="text-blue-400" />}
      options={
        data?.layers.map((l) => ({
          id: l.id,
          name: l.name,
        })) || []
      }
    />
  );
}