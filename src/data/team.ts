import alamin from "@/assets/team/alamin-mustapha-alkasim.jpg";
import nabila from "@/assets/team/nabila.jpg";
import usman from "@/assets/team/usman-abubakar-yaradua.jpg";
import aminatu from "@/assets/team/aminatu-ahmad-kbai.jpg";
import asmau from "@/assets/team/asmau-adamu-jibia.jpg";
import almustapha from "@/assets/team/almustapha-mujtaba-lawal.jpg";
import fadimatu from "@/assets/team/fadimatu-hafiz-haske.jpg";
// Photo ready for the second team member in the brown kaftan; add his name below.
// import memberBrownKaftan from "@/assets/team/team-member-brown-kaftan.jpg";

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  /** Optional portrait. Without one, initials are shown. */
  image?: string;
}

/**
 * Team members shown on the homepage and the /team page.
 * To add someone: put a portrait (4:5, ~600x750) in src/assets/team/,
 * import it above, and add an entry below.
 */
export const teamMembers: TeamMember[] = [
  { name: "Alamin Mustapha Alkasim", role: "Team Member", image: alamin },
  { name: "Nabila", role: "Team Member", image: nabila },
  { name: "Usman Abubakar Yar'adua", role: "Team Member", image: usman },
  { name: "Aminatu Ahmad K/Bai", role: "Team Member", image: aminatu },
  { name: "Asmau Adamu Jibia", role: "Team Member", image: asmau },
  { name: "Almustapha Mujtaba Lawal", role: "Team Member", image: almustapha },
  { name: "Fadimatu Hafiz Haske", role: "Team Member", image: fadimatu },
  // { name: "<NAME>", role: "Team Member", image: memberBrownKaftan },
];

export const contactInfo = {
  email: "virtualsafespace2025@gmail.com",
  helpline: "0810 303 8196",
  helplineHref: "tel:+2348103038196",
  location: "Katsina, Nigeria",
};

export const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
