import "./App.css";
import Resources from "./components/Resources";
import Dialogue from "./components/Dialogue";
import Actions from "./components/Actions";

export default function App() {
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
