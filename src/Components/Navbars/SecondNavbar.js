import "./Navbar.css";

function SecondNavbar() {
  return (
    <div>
      <nav className="nav2">
        <ul>
          <li>
            <a href="/">Blog</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
          <li>
            <a href="/cta">Waste/Collect Garbage</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SecondNavbar;
