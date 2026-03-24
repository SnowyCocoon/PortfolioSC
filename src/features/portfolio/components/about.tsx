import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "./panel";
import { USER } from "../data/user";

/** Render text with **bold** markers as <strong> elements */
function BoldText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-foreground">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export function About() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="space-y-3 font-mono text-sm text-muted-foreground">
          {USER.about.map((paragraph, i) => (
            <p key={i}>
              <BoldText text={paragraph} />
            </p>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
