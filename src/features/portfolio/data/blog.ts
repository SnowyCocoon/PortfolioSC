export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: "technical" | "personal";
  tags: string[];
  readingTime: string;
  coverImage?: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "homelab-0-initial-setup",
    title: "Homelab #0: My First Steps Into Self-Hosting: Introduction and Plan",
    date: "2026-05-01",
    description:
      "Building your own homelab doesn't require a rack full of enterprise gear. It starts with old computers, curiosity, and the willingness to break things. Here's how mine began.",
    category: "personal",
    tags: ["homelab", "self-hosting", "linux", "raspberry-pi", "llm", "docker"],
    readingTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
    content: `
<blockquote>Building your own homelab doesn't require a rack full of enterprise gear. It starts with old computers, curiosity, and the willingness to break things. Here's how mine began.</blockquote>

<p>For a long time I kept thinking more and more about hosting my own services, but I never knew where to begin. Sure, during my studies I had covered topics like automation, Docker, Linux, and computer networking, but I never actually took a single concrete step in that direction. That changed about a month ago, when I decided to haul some old computers back home and try to connect them into my own home server network. My first goal? <strong>Don't break anything.</strong></p>

<img src="https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=900&q=80" alt="Old computer hardware getting a second life" />

<h2>What Is a Homelab?</h2>

<p>The term <strong>homelab</strong> doesn't have one universally agreed-upon definition, but I'd describe it like this: it's a home network of servers that you use to run and manage your own services. A kind of private sandbox for experimenting with technology, networks, clouds, databases, automation, containerization, and whatever else you feel like throwing at it.</p>

<p>People run homelabs for all sorts of reasons: privacy, education, saving money, or simply because tinkering with servers is fun. For me, it's a bit of all of the above.</p>

<h2>The Subscription Problem in 2026</h2>

<p>At some point, a monthly subscription stopped being a luxury and became just... life. Streaming platforms, cloud storage, music, and now AI tools, each one feels reasonable on its own, until you look at the total bill.</p>

<p>Here's what a fairly normal modern subscription stack looks like in 2026:</p>

<table>
  <thead>
    <tr><th>Service</th><th>Category</th><th>Monthly Cost</th></tr>
  </thead>
  <tbody>
    <tr><td>Netflix (Standard)</td><td>Streaming</td><td>~$18</td></tr>
    <tr><td>Spotify Premium</td><td>Music</td><td>~$13</td></tr>
    <tr><td>YouTube Premium</td><td>Streaming / Ad-free</td><td>~$14</td></tr>
    <tr><td>Google One (2TB)</td><td>Cloud Storage</td><td>~$10</td></tr>
    <tr><td>ChatGPT Plus</td><td>AI</td><td>~$20</td></tr>
    <tr><td>Claude Pro</td><td>AI</td><td>~$20</td></tr>
    <tr><td>GitHub Copilot</td><td>AI / Dev</td><td>~$10</td></tr>
    <tr><td>Midjourney Standard</td><td>AI / Image Gen</td><td>~$26</td></tr>
  </tbody>
</table>

<p>That's around <strong>$130 per month</strong>, and that's without any niche tools, without a second streaming service, and without any enterprise plans. Streaming platforms alone have raised prices multiple times over the past two years, and there's no sign that's going to change anytime soon. There's demand, there's supply.</p>

<p>AI subscriptions follow the same logic. ChatGPT Plus and Claude Pro both sit at around $20 a month, and it's increasingly common to feel like you need both, since neither dominates every task. Google One's 2TB tier adds another ten dollars on top, which feels minor on its own, but stings when you see it next to everything else.</p>

<p>Some of these costs are hard to avoid. Cloud storage is genuinely useful. So is music. But AI tools are a different story, especially if you're a developer, or just someone who likes to tinker. Running your own <strong>local LLM</strong> (like LLaMA, Mistral, or Qwen), your own <strong>Stable Diffusion</strong> instance, or a server for hosting and backing up your photos and videos cuts out a meaningful chunk of that bill. You invest once in hardware, and then the models and services run on your machine, for free. That was one of the motivations behind starting this whole project.</p>

<h2>My Goals for Phase One</h2>

<p>Before diving in, I sketched out a few objectives I wanted to hit before calling "Phase 1" complete. I didn't know at the time that I'd end up going much further, but we'll get to that in later posts. The list looked like this:</p>

<ul>
  <li><strong>AI Agent on Raspberry Pi Zero 2W</strong> - Buy a Pi Zero 2W, attach a small screen and battery, and run a local AI chatbot agent on it. The concept is inspired by the <a href="https://github.com/PiSugar/whisplay-ai-chatbot" target="_blank" rel="noopener noreferrer">whisplay-ai-chatbot project on GitHub</a>. A pocket-sized AI assistant that I actually own and control.</li>
  <li><strong>Old PC as an LLM + Stable Diffusion Server</strong> - Repurpose my old gaming rig as a server to host a local language model and a Stable Diffusion instance. Primarily for fun and creative projects, but also with the intention of having a self-hosted AI backend to power the Pi agent above.</li>
  <li><strong>Actually Use the Raspberry Pi 3B</strong> - I bought this device five years ago, played with it for about a week, and then shoved it in a box. It's time to give it a real job.</li>
  <li><strong>Learning</strong> - My primary goal, above everything else. As a game developer I write code every day, but there's a whole world of skills I've never gone deep on: self-hosting, server management, containerization, networking, DevOps. The honest truth is you never know when those skills will come in handy, and I'd rather pick them up on my own terms than scramble to catch up later.</li>
</ul>

<img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=900&q=80" alt="Raspberry Pi single-board computer" />

<h2>The Hardware I'm Starting With</h2>

<p>Allow me to introduce the fleet, a collection of machines that were gathering dust and are now getting a second life.</p>

<h3>Aorus 15P - Main Workstation <em>(Codename: Aorus)</em></h3>

<p>My current laptop and the command center of the homelab. This is the machine I'll use to configure everything else, connect via SSH, and manage all other devices.</p>

<table>
  <thead><tr><th>Spec</th><th>Details</th></tr></thead>
  <tbody>
    <tr><td>OS</td><td>Windows 11</td></tr>
    <tr><td>CPU</td><td>Intel i7-10870H @ 2.2 GHz</td></tr>
    <tr><td>GPU</td><td>NVIDIA RTX 3060 (Laptop) - 6 GB VRAM</td></tr>
    <tr><td>RAM</td><td>32 GB</td></tr>
    <tr><td>Storage</td><td>1.4 TB SSD</td></tr>
  </tbody>
</table>

<h3>Old Gaming PC - LLM &amp; SD Server <em>(Codename: Kokoro)</em></h3>

<p>The workhorse of the homelab. Not powerful by modern standards, but capable enough to run smaller open-source language models and Stable Diffusion (very basic models, but impressive enough to show off).</p>

<table>
  <thead><tr><th>Spec</th><th>Details</th></tr></thead>
  <tbody>
    <tr><td>OS</td><td>Ubuntu 22.04.5 LTS (64-bit, GNOME, X11)</td></tr>
    <tr><td>CPU</td><td>Intel Core i5-4590 @ 3.3 GHz (4 cores)</td></tr>
    <tr><td>GPU</td><td>NVIDIA GTX 970 - 4 GB VRAM</td></tr>
    <tr><td>RAM</td><td>16 GB</td></tr>
    <tr><td>Storage</td><td>~600 GB free (SSD)</td></tr>
    <tr><td>Access</td><td>SSH / Remote Desktop</td></tr>
  </tbody>
</table>

<h3>Raspberry Pi 3B - Network Services Hub</h3>

<p>The smallest member of the fleet. Despite having only 1 GB of RAM and a quad-core ARM Cortex-A53 processor, it's more than capable of running a few lightweight but critical network services, like <strong>Pi-hole</strong> for network-wide ad and tracker blocking, and <strong>Unbound</strong> for recursive DNS resolution.</p>

<h3>Old ThinkPad X201 <em>(Codename: Yua)</em></h3>

<p>The laptop I used throughout my engineering studies before upgrading to the Aorus. I still haven't figured out what role it will play in the homelab. Linux, Intel Core i5 (some variant), 4 GB RAM. I'm too lazy to check the exact specs because that would involve actually dusting it off. A purpose will reveal itself eventually.</p>

<img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80" alt="Network cables and infrastructure" />

<h2>Initial Network Diagram (a showcase of my artistic talents)</h2>

<p>Here's how I picture the initial setup:</p>

<pre><code>                              ┌──────────────┐
                              │   Internet   │
                              └──────┬───────┘
                                     │
                              ┌──────▼───────┐
                              │    Router    │
                              └──────┬───────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┬─────────────────────────┐
         │                           │                           │                         │
┌────────▼────────┐         ┌────────▼────────┐        ┌────────▼────────┐        ┌────────▼────────┐
│  Raspberry Pi   │         │     Aorus       │        │    Kokoro       │        │      Yua        │
│ Pi-hole+Unbound │         │  Main Station   │        │  LLM + SD       │        │   ThinkPad      │
│  (DNS Filter)   │         │  Windows 11     │        │  Ubuntu         │        │    Linux        │
└─────────────────┘         └────────┬────────┘        └─────────────────┘        └─────────────────┘
                                     │                           ▲
                                     └────── SSH ───────────────┘</code></pre>

<h2>What's Next?</h2>

<p>This is just the beginning. In the next posts in this series I'll be documenting:</p>

<ul>
  <li>Setting up <strong>Pi-hole + Unbound</strong> on the Raspberry Pi 3B</li>
  <li>Configuring <strong>SSH access</strong> across all machines</li>
  <li>First steps with <strong>Docker</strong> on Kokoro</li>
  <li>Running my first <strong>local LLM</strong> and Stable Diffusion instance</li>
</ul>

<p>If you've been thinking about starting your own homelab, I hope this gives you a nudge. You don't need a rack full of servers. Old hardware, a bit of patience, and the willingness to occasionally break things, that's genuinely all you need to get started.</p>

<p><em>This is post #0 in my homelab series. Got questions, tips, or your own homelab story? Drop me a message or find me on Discord. I'd love to hear about your setup.</em></p>
`,
  },
];
