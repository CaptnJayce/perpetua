export interface NpcDef {
    id: string;
    name: string;
    portrait?: string;
}

export const NPCS: NpcDef[] = [
    { id: "npc1", name: "NPC 1" },
    { id: "npc2", name: "NPC 2" },
    { id: "npc3", name: "NPC 3" },
    { id: "npc4", name: "NPC 4" },
    { id: "npc5", name: "NPC 5" },
];

export const PORTRAIT_PLACEHOLDER = "/portrait-placeholder.jpg";
