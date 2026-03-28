import { useQuery } from "@tanstack/react-query";
import type { AgentData } from "../types/agent";

const fetchAgentData = async (): Promise<AgentData> => {
    const res = await fetch("/data.json");
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
};

export const useAgentData = () => {
    return useQuery<AgentData>({
        queryKey: ["agent-data"],
        queryFn: fetchAgentData,
    });
};