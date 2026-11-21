import { Crown } from "lucide-react";
import { chairman, getInitials, otherMembers, type TeamMember } from "@/data/team";

const Avatar = ({ member, className = "" }: { member: TeamMember; className?: string }) =>
  member.image ? (
    <img
      src={member.image}
      alt={member.name}
      loading="lazy"
      className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${className}`}
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-pink flex items-center justify-center text-white font-display font-bold text-2xl">
      {getInitials(member.name)}
    </div>
  );

const MemberCard = ({ member }: { member: TeamMember }) => (
  <div className="group bg-card rounded-2xl p-2.5 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300">
    <div className="aspect-square rounded-xl overflow-hidden bg-muted">
      <Avatar member={member} />
    </div>
    <div className="px-1.5 pt-3 pb-1.5 text-center">
      <h3 className="font-display font-semibold text-foreground text-sm leading-snug">{member.name}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
    </div>
  </div>
);

const ChairmanCard = ({ member }: { member: TeamMember }) => (
  <div className="group relative h-full min-h-[420px] rounded-3xl overflow-hidden shadow-card bg-muted">
    <div className="absolute inset-0">
      <Avatar member={member} />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-3">
        <Crown size={13} />
        {member.role}
      </span>
      <h3 className="font-display text-2xl md:text-[1.7rem] font-bold leading-tight">{member.name}</h3>
      {member.bio && <p className="mt-2 text-sm text-white/80 leading-relaxed">{member.bio}</p>}
    </div>
  </div>
);

/** Chairman feature card beside a compact grid of the rest of the team. */
const TeamShowcase = () => (
  <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-5 md:gap-6">
    {chairman && <ChairmanCard member={chairman} />}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 content-start">
      {otherMembers.map((member) => (
        <MemberCard key={member.name} member={member} />
      ))}
    </div>
  </div>
);

export default TeamShowcase;
