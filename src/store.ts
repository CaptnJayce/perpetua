import { create } from "zustand";
import { RESOURCES } from "./data/resources";
import { RECIPES } from "./data/recipes";

interface GameState {
    resources: Record<string, number>;
    cooldowns: Record<string, number>;

    tick: (delta: number) => void;
    gather: (resourceId: string) => void;
    craft: (recipeId: string) => void;
}

const initialResources = Object.fromEntries(
    Object.keys(RESOURCES).map((id) => [id, 0]),
);

const initialCooldowns = Object.fromEntries(
    Object.values(RESOURCES)
        .filter((r) => r.gatherCd !== undefined)
        .map((r) => [r.id, 0]),
);

export const useGameStore = create<GameState>((set, get) => ({
    resources: initialResources,
    cooldowns: initialCooldowns,

    tick: (delta) => {
        const { resources, cooldowns } = get();
        const update: Partial<GameState> = {};

        const passives = Object.values(RESOURCES).filter((d) => d.rate);
        const anyBelowCap = passives.some((d) => resources[d.id] < d.cap);
        if (anyBelowCap) {
            const nextResources = { ...resources };
            for (const def of passives) {
                nextResources[def.id] = Math.min(def.cap, nextResources[def.id] + def.rate! * delta);
            }
            update.resources = nextResources;
        }

        const anyCooldownActive = Object.values(cooldowns).some((cd) => cd > 0);
        if (anyCooldownActive) {
            update.cooldowns = Object.fromEntries(
                Object.entries(cooldowns).map(([id, cd]) => [id, Math.max(0, cd - delta)]),
            );
        }

        if (Object.keys(update).length > 0) set(update);
    },

    gather: (resourceId) => {
        const def = RESOURCES[resourceId];
        if (!def?.gatherAmt || !def?.gatherCd) return;

        const { resources, cooldowns } = get();
        if (cooldowns[resourceId] > 0 || resources[resourceId] >= def.cap)
            return;

        set({
            resources: {
                ...resources,
                [resourceId]: Math.min(
                    def.cap,
                    resources[resourceId] + def.gatherAmt,
                ),
            },
            cooldowns: { ...cooldowns, [resourceId]: def.gatherCd },
        });
    },

    craft: (recipeId) => {
        const recipe = RECIPES[recipeId];
        if (!recipe) return;

        const { resources } = get();

        const canCraft = recipe.inputs.every(
            ({ resId, amnt }) => resources[resId] >= amnt,
        );
        const outputDef = RESOURCES[recipe.output.resId];
        const atCap =
            resources[recipe.output.resId] + recipe.output.amnt > outputDef.cap;

        if (!canCraft || atCap) return;

        const nextResources = { ...resources };
        for (const { resId, amnt } of recipe.inputs) {
            nextResources[resId] -= amnt;
        }
        nextResources[recipe.output.resId] += recipe.output.amnt;

        set({ resources: nextResources });
    },
}));
