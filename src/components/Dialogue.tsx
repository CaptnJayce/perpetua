import "./Dialogue.css";

const NPCS = [
    { id: "npc1", name: "NPC 1" },
    { id: "npc2", name: "NPC 2" },
    { id: "npc3", name: "NPC 3" },
    { id: "npc4", name: "NPC 4" },
    { id: "npc5", name: "NPC 5" },
];

export default function Dialogue() {
    return (
        <div className="dialogue">
            <div className="dialogue-content" />
            <div className="npc-portraits">
                {NPCS.map((npc) => (
                    <button key={npc.id} className="npc-portrait" title={npc.name}>
                        <img src="/portrait-placeholder.jpg" alt={npc.name} />
                    </button>
                ))}
            </div>
        </div>
    );
}
