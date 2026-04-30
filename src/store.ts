import { create } from "zustand";

// prp = perpetual energy | tmp = template metal | cd = cooldown | dur = duration

interface GameState {
    prp: number;
    prpCap: number;
    prpRate: number;

    tmp: number;
    tmpCap: number;
    tmpCd: number;
    tmpCdDur: number;

    cogs: number;
    cogCap: number;
    cogCost: { prp: number; tmp: number };

    tick: (delta: number) => void;
    mineTmp: () => void;
    craftCog: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    prp: 0,
    prpCap: 100,
    prpRate: 1,

    tmp: 0,
    tmpCap: 50,
    tmpCd: 0,
    tmpCdDur: 3,

    cogs: 0,
    cogCap: 50,
    cogCost: { prp: 2, tmp: 1 },

    tick: (delta) => {
        const { prp, prpCap, prpRate, tmpCd } = get();
        set({
            prp: Math.min(prpCap, prp + prpRate * delta),
            tmpCd: Math.max(0, tmpCd - delta),
        });
    },

    mineTmp: () => {
        const { tmp, tmpCap, tmpCd, tmpCdDur } = get();
        if (tmpCd > 0 || tmp >= tmpCap) return;
        set({
            tmp: Math.min(tmpCap, tmp + 5),
            tmpCd: tmpCdDur,
        });
    },

    craftCog: () => {
        const { prp, tmp, cogs, cogCap, cogCost } = get();
        if (prp < cogCost.prp || tmp < cogCost.tmp || cogs >= cogCap) return;
        set({
            prp: prp - cogCost.prp,
            tmp: tmp - cogCost.tmp,
            cogs: cogs + 1,
        });
    },
}));
