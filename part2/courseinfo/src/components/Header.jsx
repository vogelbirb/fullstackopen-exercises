const Header = ({ text, level }) => {
  switch (level) {
    case 2:
      return <h2>{text}</h2>;
    case 1:
    default:
      return <h1>{text}</h1>;
  }
};

export default Header;
