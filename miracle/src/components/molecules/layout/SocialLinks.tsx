import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

interface SocialLink {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}

interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
}

const defaultSocialLinks: SocialLink[] = [
  { href: "#", icon: FaFacebook, label: "Facebook" },
  { href: "#", icon: FaTwitter, label: "Twitter" },
  { href: "#", icon: FaInstagram, label: "Instagram" },
];

const SocialLinks = ({ links = defaultSocialLinks, className = "flex space-x-4" }: SocialLinksProps) => {
  return (
    <div className={className}>
      {links.map((link, index) => (
        <a 
          key={index}
          href={link.href} 
          className="text-gray-400 hover:text-white transition"
          aria-label={link.label}
        >
          <link.icon size={20} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
