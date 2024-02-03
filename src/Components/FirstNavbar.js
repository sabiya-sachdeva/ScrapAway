import "../App.css";

function FirstNavbar() {
  return (
    <div>
      <nav className="nav1">
        <ul>
          <li>
            <a href="/">
              <img src="SAlogo.png" alt="Logo" height="50px" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="WSG.png" alt="WSG" height="50px" />
            </a>
          </li>
          <li>
            <a href="/">
              <img src="SAC.png" alt="SAC" height="50px" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default FirstNavbar;
