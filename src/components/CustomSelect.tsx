import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
    id: string;
    name: string;
}

interface Props {
    label: string;
    value?: string;
    options: Option[];
    onChange: (id: string) => void;
    icon: React.ReactNode;
}

export default function CustomSelect({
    label,
    value,
    options,
    onChange,
    icon,
}: Props) {
    const [open, setOpen] = useState(false);

    const selected = options.find((o) => o.id === value);

    return (
        <div className="relative">
            <p className="text-xs text-gray-400 mb-2">{label}</p>

            <div
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between bg-[#0b1220] border border-gray-700 px-4 py-2 rounded-xl cursor-pointer hover:border-gray-500"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-[#1e293b] p-2 rounded-md">
                        {icon}
                    </div>

                    <span className="text-white">
                        {selected?.name || "Select"}
                    </span>
                </div>

                <ChevronDown size={15} className="text-gray-400" />
            </div>

            {open && (
                <div className="absolute z-50 mt-2 w-full bg-[#0b1220] border border-gray-700 rounded-xl overflow-hidden shadow-lg">
                    {options.map((o) => (
                        <div
                            key={o.id}
                            onClick={() => {
                                onChange(o.id);
                                setOpen(false);
                            }}
                            className="px-4 py-3 hover:bg-[#1e293b] cursor-pointer text-white"
                        >
                            {o.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}