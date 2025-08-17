interface Link {
  href: string;
  label: string;
}

interface LinkListProps {
  links: Link[];
  className?: string;
}

const LinkList = ({ links, className = "space-y-2" }: LinkListProps) => {
  return (
    <ul className={className}>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="text-gray-400 hover:text-white transition">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default LinkList;
