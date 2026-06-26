import Image from "next/image";
import { Lock } from "lucide-react";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "./panel";

const PLAYER = "4i40";

// Order matches the hiscore_oldschool_ironman API response (lines 1–23, skipping line 0 = Overall)
const API_SKILLS = [
  { name: "Attack",       icon: "Attack_icon" },
  { name: "Defence",      icon: "Defence_icon" },
  { name: "Strength",     icon: "Strength_icon" },
  { name: "Hitpoints",    icon: "Hitpoints_icon" },
  { name: "Ranged",       icon: "Ranged_icon" },
  { name: "Prayer",       icon: "Prayer_icon" },
  { name: "Magic",        icon: "Magic_icon" },
  { name: "Cooking",      icon: "Cooking_icon" },
  { name: "Woodcutting",  icon: "Woodcutting_icon" },
  { name: "Fletching",    icon: "Fletching_icon" },
  { name: "Fishing",      icon: "Fishing_icon" },
  { name: "Firemaking",   icon: "Firemaking_icon" },
  { name: "Crafting",     icon: "Crafting_icon" },
  { name: "Smithing",     icon: "Smithing_icon" },
  { name: "Mining",       icon: "Mining_icon" },
  { name: "Herblore",     icon: "Herblore_icon" },
  { name: "Agility",      icon: "Agility_icon" },
  { name: "Thieving",     icon: "Thieving_icon" },
  { name: "Slayer",       icon: "Slayer_icon" },
  { name: "Farming",      icon: "Farming_icon" },
  { name: "Runecrafting", icon: "Runecraft_icon" },
  { name: "Hunter",       icon: "Hunter_icon" },
  { name: "Construction", icon: "Construction_icon" },
  { name: "Sailing",      icon: "Sailing_icon" },
] as const;

// Update imgWiki with the exact filename used on the OSRS Wiki (spaces → underscores)
const RECENT_ITEMS = [
  { name: "Colossal blade",   imgWiki: "Colossal_blade.png" },
  { name: "Zombie axe",       imgWiki: "Zombie_axe.png" },
  { name: "Glacial temotli",  imgWiki: "Glacial_temotli.png" },
];

type SkillRow = { rank: number; level: number; xp: number };

async function fetchStats(): Promise<SkillRow[] | null> {
  try {
    const res = await fetch(
      `https://secure.runescape.com/m=hiscore_oldschool_ironman/index_lite.ws?player=${PLAYER}`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;
    const text = await res.text();
    return text
      .trim()
      .split("\n")
      .slice(0, 25)
      .map((line) => {
        const [rank, level, xp] = line.split(",").map(Number);
        return { rank, level, xp };
      });
  } catch {
    return null;
  }
}

function calcCombat(s: SkillRow[]) {
  // s[0]=Overall, s[1]=Attack, s[2]=Defence, s[3]=Strength, s[4]=HP,
  // s[5]=Ranged, s[6]=Prayer, s[7]=Magic
  const base = 0.25 * (s[2].level + s[4].level + Math.floor(s[6].level / 2));
  const melee = 0.325 * (s[1].level + s[3].level);
  const range = 0.325 * Math.floor(s[5].level * 1.5);
  const mage = 0.325 * Math.floor(s[7].level * 1.5);
  return Math.floor(base + Math.max(melee, range, mage));
}

export async function OsrsStats() {
  const skills = await fetchStats();

  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center gap-2">
          <Image
            src="https://oldschool.runescape.wiki/images/Ironman_chat_badge.png"
            alt="Ironman"
            width={16}
            height={16}
            unoptimized
            className="shrink-0"
          />
          <PanelTitle>Old School RuneScape</PanelTitle>
        </div>
      </PanelHeader>

      <PanelContent>
        <p className="mb-4 font-mono text-sm text-muted-foreground">
          Ironman account{" "}
          <span className="font-bold text-foreground">{PLAYER}</span> — self-sufficient
          playstyle where trading is disabled. Running as a{" "}
          <span className="font-bold text-foreground">30 defence pure</span>, focused
          on end-game PvM content and skilling milestones.
        </p>

        {skills ? (
          <>
            {/* Summary stats */}
            <div className="mb-5 flex flex-wrap gap-3">
              <StatBox label="Total Level" value={skills[0].level.toLocaleString()} accent />
              <StatBox label="Combat" value={String(calcCombat(skills))} accent />
              <StatBox label="Ironman Rank" value={`#${skills[0].rank.toLocaleString()}`} />
            </div>

            {/* Skill grid — all 23 skills, same order as the API */}
            <div className="grid grid-cols-4 gap-1 sm:grid-cols-6 lg:grid-cols-8">
              {API_SKILLS.map((skill, i) => {
                const row = skills[i + 1];
                const isDefence = skill.name === "Defence";
                return (
                  <div
                    key={skill.name}
                    title={skill.name}
                    className={`relative flex items-center gap-1.5 rounded border px-2 py-1.5 ${
                      isDefence
                        ? "border-line/40 bg-muted/20"
                        : "border-line"
                    }`}
                  >
                    <Image
                      src={`https://oldschool.runescape.wiki/images/${skill.icon}.png`}
                      alt={skill.name}
                      width={16}
                      height={16}
                      unoptimized
                      className={`shrink-0 ${isDefence ? "opacity-40" : ""}`}
                    />
                    <span className={`font-mono text-xs font-bold tabular-nums ${isDefence ? "text-muted-foreground/50" : ""}`}>
                      {row.level}
                    </span>
                    {isDefence && (
                      <Lock className="absolute right-1 top-1 size-2.5 text-muted-foreground/50" />
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="font-mono text-xs text-muted-foreground">
            Hiscores unavailable — stats will refresh when the API is reachable.
          </p>
        )}
      </PanelContent>

      {/* Recent drops */}
      <div className="border-t border-line">
        <div className="px-4 py-2">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Recent Notable Drops
          </h3>
        </div>
        <div>
          {RECENT_ITEMS.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 border-t border-line px-4 py-3 first:border-t-0"
            >
              <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded border border-line bg-[#0c0500]">
                <div className="relative size-7">
                  <Image
                    src={`https://oldschool.runescape.wiki/images/${item.imgWiki}`}
                    alt={item.name}
                    fill
                    sizes="28px"
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="font-mono text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function StatBox({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md border border-line px-4 py-2 text-center">
      <div className="font-mono text-xs text-muted-foreground">{label}</div>
      <div
        className={`font-mono text-xl font-bold tabular-nums ${
          accent ? "text-[#f87171] dark:text-[#f87171]" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}
