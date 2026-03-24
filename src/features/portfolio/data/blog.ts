export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  coverImage?: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "behavior-trees-unity-fighting-game",
    title: "Building Behavior Trees in Unity for a Fighting Game",
    date: "2026-03-01",
    description:
      "How I implemented modular, data-driven behavior trees for AI enemies and players in Punch Lunch: Foodtruck Fighter — and what I learned along the way.",
    tags: ["Unity", "Game AI", "C#", "GameDev"],
    readingTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    content: `<h2>Why Behavior Trees?</h2>
<p>When I joined 3R Games to work on <em>Punch Lunch: Foodtruck Fighter</em>, the combat AI was a mess of nested if-statements. A single enemy had ~400 lines of switch-case logic. Adding a new attack pattern meant touching four different files and hoping nothing broke.</p>
<p>Behavior Trees (BTs) solved this elegantly. Instead of hardcoded logic, you describe an agent's decision-making as a tree of composable nodes. The result is AI that is easy to read, easy to extend, and easy to debug visually.</p>

<h2>The Core Node Types</h2>
<p>In our implementation, every node returns one of three states: <code>SUCCESS</code>, <code>FAILURE</code>, or <code>RUNNING</code>.</p>
<ul>
  <li><strong>Sequence</strong> — runs children left-to-right; fails on first failure (AND logic)</li>
  <li><strong>Selector</strong> — tries children until one succeeds (OR logic)</li>
  <li><strong>Decorator</strong> — wraps a single child to invert, repeat, or gate it</li>
  <li><strong>Leaf / Action</strong> — the actual game logic (move, attack, play animation)</li>
</ul>

<h2>Data-Driven Design</h2>
<p>One of the best decisions we made was keeping the tree structure in <code>ScriptableObject</code> assets rather than hardcoding it in C# classes. This meant designers could tweak enemy behavior without touching code.</p>
<pre><code>[CreateAssetMenu(menuName = "AI/Behavior Tree")]
public class BehaviorTree : ScriptableObject
{
    public BTNode rootNode;
    public BTNode.State treeState = BTNode.State.Running;

    public BTNode.State Update()
    {
        if (rootNode.state == BTNode.State.Running)
            treeState = rootNode.Update();
        return treeState;
    }
}</code></pre>

<h2>Blackboard for Shared State</h2>
<p>Nodes need to share data (like "is the player in range?" or "what was my last attack?"). We solved this with a simple <strong>Blackboard</strong> — a dictionary on the agent's context object that any node can read from or write to.</p>
<pre><code>public class BehaviorTreeRunner : MonoBehaviour
{
    public BehaviorTree tree;
    public GameObject player;

    private void Start()
    {
        tree = tree.Clone();
        tree.Bind(this);
    }

    private void Update()
    {
        tree.Update();
    }
}</code></pre>

<h2>What I Learned</h2>
<ul>
  <li><strong>Keep leaf nodes small.</strong> If a node does more than one thing, split it. The smaller the node, the easier it is to reuse and test.</li>
  <li><strong>Visualize early.</strong> We built a simple custom editor that highlights the currently executing node in red. This single tool cut debugging time by half.</li>
  <li><strong>Avoid the Blackboard bloat.</strong> It's tempting to throw everything into the blackboard. We ended up with strict naming conventions and typed wrapper methods to keep it sane.</li>
  <li><strong>BTs complement animation.</strong> Pairing BT states with Unity's Animator via parameter triggers gave us very fluid-looking enemy reactions.</li>
</ul>

<h2>The Result</h2>
<p>The final system powers all four enemy types in Punch Lunch, each with distinct personalities and combo patterns — all built from the same reusable node library. New enemies can be prototyped in under an hour. That's the power of good architecture.</p>`,
  },
];
