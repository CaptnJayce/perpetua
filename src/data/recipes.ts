export interface RecipeDef {
    id: string;
    inputs: { resId: string; amnt: number }[];
    output: { resId: string; amnt: number };
}

export const RECIPES: Record<string, RecipeDef> = {
    craftCog: {
        id: "craftCog",
        inputs: [
            { resId: "prp", amnt: 2 },
            { resId: "tmp", amnt: 1 },
        ],
        output: { resId: "cog", amnt: 1 },
    },

    craftCogFive: {
        id: "craftCogFive",
        inputs: [
            { resId: "prp", amnt: 10 },
            { resId: "tmp", amnt: 5 },
        ],
        output: { resId: "cog", amnt: 5 },
    },
};
