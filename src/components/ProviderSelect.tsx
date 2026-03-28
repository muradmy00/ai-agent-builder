import { Cpu } from "lucide-react";
import CustomSelect from "./CustomSelect";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ProviderSelect({ value, onChange }: Props) {
  const providers = ["Gemini", "ChatGPT", "Claude", "DeepSeek"];

  return (
    <CustomSelect
      label="PROVIDER"
      value={value}
      onChange={onChange}
      icon={<Cpu size={18} className="text-blue-400" />}
      options={providers.map((p) => ({
        id: p,
        name: p,
      }))}
    />
  );
}