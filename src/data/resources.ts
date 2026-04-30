export type ResourceCategory = "base" | "partial" | "crafted" | "quest";

export interface ResourceDef {
    id: string;
    label: string;
    cap: number;
    category: ResourceCategory;
    rate?: number; // passive generation per second, if any
    gatherAmt?: number; // amount gained per gather press, if gatherable
    gatherCd?: number; // cooldown in seconds between gather presses
}

export const RESOURCES: Record<string, ResourceDef> = {
    prp: {
        id: "prp",
        label: "Perpetual Energy",
        cap: 100,
        category: "base",
        rate: 1,
    },
    tmp: {
        id: "tmp",
        label: "Template Metal",
        cap: 50,
        category: "base",
        gatherAmt: 5,
        gatherCd: 3,
    },
    cog: {
        id: "cog",
        label: "Cog",
        cap: 50,
        category: "partial",
    },
};
