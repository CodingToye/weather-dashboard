export interface HeaderProps {
  heading: string;
}

const Header: React.FC<HeaderProps> = ({heading}) => {
  return (
    <header className="mb-4">
      <h1 className="text-sm text-primary">{heading}</h1>
    </header>
  );
};

export default Header;
