import "./App.css";

import { useEffect } from "react";
import { useGameStore } from "./store";

import Resources from "./components/Resources";
import Dialogue from "./components/Dialogue";
import Actions from "./components/Actions";

export default function App() {
    useEffect(() => {
        const TICK_MS = 100; // 10 ticks/second
        const delta = TICK_MS / 1000;

        const interval = setInterval(() => {
            useGameStore.getState().tick(delta);
        }, TICK_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="main">
            <Resources />
            <div className="main-right">
                <Dialogue />
                <Actions />
            </div>
        </div>
    );
}
