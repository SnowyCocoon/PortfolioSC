import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "./panel";
import { USER } from "../data/user";

export function About() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="space-y-3 font-mono text-sm text-muted-foreground">
          {USER.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
