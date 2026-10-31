export const SERVER_NAME = "FlaroSMP";
export const SERVER_IP = "play.flarosmp.net";
export const DISCORD_URL = "https://discord.gg/yourinvite";
export const STORE_URL = "https://store.flarosmp.net";
export const VOTE_URL = "https://minecraft-server-list.com/";

export type NavLink = {
  label: string;
  desc: string;
  icon: string;
  href: string;
  external?: boolean;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavLink[];
};

export const NAV: NavItem[] = [
  { label: "Home", href: "#home" },
  {
    label: "Server",
    children: [
      { label: "Features", desc: "What makes FlaroSMP different.", icon: "bolt", href: "#features" },
      { label: "Staff", desc: "The team behind the server.", icon: "users", href: "#staff" },
      { label: "Rules", desc: "Keep the world fair for everyone.", icon: "book", href: "#rules" },
    ],
  },
  { label: "Store", href: "#store" },
  {
    label: "Community",
    children: [
      { label: "FAQ", desc: "Answers to common questions.", icon: "help", href: "#faq" },
      { label: "Vote", desc: "Vote daily and earn rewards.", icon: "star", href: "#vote" },
      { label: "Discord", desc: "Join the community and get support.", icon: "chat", href: DISCORD_URL, external: true },
    ],
  },
];

export const FEATURES = [
  { icon: "flame", title: "Custom Survival", text: "A fresh SMP experience with custom enchants, bosses and seasonal events that keep the world alive." },
  { icon: "sword", title: "Fair PvP", text: "Balanced combat, anti-cheat protection and optional PvP zones so everyone can play their way." },
  { icon: "dollar", title: "Player Economy", text: "Trade, sell and run your own shop. Jobs and auctions make every hour of play rewarding." },
  { icon: "trophy", title: "Leaderboards", text: "Climb the ranks in playtime, kills, mining and more. Top players earn exclusive rewards." },
  { icon: "shield", title: "Active Staff", text: "A friendly and responsive team online every day to help you out and keep things fair." },
];

export const RULES = [
  "Be respectful. No harassment, hate speech or toxicity.",
  "No cheating, x-ray, hacked clients or exploiting bugs.",
  "No griefing, stealing or raiding inside claimed land.",
  "No advertising other servers or spamming chat.",
  "Listen to staff. Their decisions are final.",
  "Have fun and help new players feel welcome.",
];

export const STAFF = [
  { name: "OwnerName", role: "Owner", color: "#ff4d00" },
  { name: "AdminName", role: "Admin", color: "#ff9d00" },
  { name: "ModName", role: "Moderator", color: "#ffd400" },
  { name: "HelperName", role: "Helper", color: "#7CFC00" },
];

export type RankPerk = { label: string; value: string; note?: string };
export type Rank = {
  name: string;
  price: string;
  link: string;
  featured: boolean;
  badge: string | null;
  shards: number | null;
  perks: RankPerk[];
};

export const RANKS: Rank[] = [
  {
    name: "Flaro+",
    price: "1.99$",
    link: STORE_URL,
    featured: false,
    badge: null,
    shards: null,
    perks: [
      { label: "Homes", value: "9" },
      { label: "Auction slots", value: "45" },
      { label: "Order slots", value: "45" },
    ],
  },
  {
    name: "Flaro++",
    price: "4.99$",
    link: STORE_URL,
    featured: false,
    badge: null,
    shards: null,
    perks: [
      { label: "Homes", value: "27" },
      { label: "Auction slots", value: "90" },
      { label: "Order slots", value: "90" },
    ],
  },
  {
    name: "Flaro+++",
    price: "6.99$",
    link: STORE_URL,
    featured: true,
    badge: "OCTOBER ONLY",
    shards: 5000,
    perks: [
      { label: "Homes", value: "90" },
      { label: "Auction slots", value: "90" },
      { label: "Order slots", value: "90" },
      { label: "Store gift card", value: "$4", note: "Sent to your email" },
    ],
  },
];

export type ShardPackage = {
  amount: number;
  base: number | null;
  bonus: string | null;
  price: string;
};

export const SHARDS: ShardPackage[] = [
  { amount: 400, base: null, bonus: null, price: "$0.99" },
  { amount: 2500, base: null, bonus: null, price: "$4.99" },
  { amount: 5500, base: 5000, bonus: "+10%", price: "$9.99" },
];

export const SOCIALS = [
  { label: "TikTok", href: "https://tiktok.com/@mrflaro", icon: "tiktok" },
  { label: "YouTube", href: "https://youtube.com/@mrflaroo", icon: "youtube" },
  { label: "Discord", href: DISCORD_URL, icon: "discord" },
];

export type Partner = { name: string; logo: string; href: string };
export const PARTNERS: Partner[] = [
  { name: "Aurex", logo: "/partner-aurex.png", href: "https://aurex.lk/" },
  { name: "/gear", logo: "/partner-gear.png", href: "https://gearstore.lol/" },
  { name: "VMex Solutions", logo: "/partner-vmex.png", href: "https://dash.vmex.net/" },
];

export const FAQ = [
  { q: "How do I join the server?", a: `Open Minecraft Java Edition, add a server and use the IP ${SERVER_IP}. Bedrock players can join with the same address.` },
  { q: "Which versions are supported?", a: "We support the latest Minecraft release and a few versions back. Check our Discord for the exact list." },
  { q: "Is the server free to play?", a: "Yes. The whole game is free. The store only sells cosmetics and perks, never pay-to-win items." },
  { q: "How do I get banned players unbanned?", a: "Open a ticket in our Discord and the staff team will review your case." },
];
