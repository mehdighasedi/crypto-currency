import { FaGithub } from "react-icons/fa";

function Layout({ children }) {
  return (
    <>
      <header className="header">
        <h1>Crypto Application</h1>
        <p>React.JS Project</p>
      </header>
      {children}
      <footer className="footer">
        <p>Developed By Mehdi Ghasedi By ❤</p>

        <a href="https://github.com/mehdighasedi">
          &nbsp;
          <FaGithub /> Mehdi Ghasedi
        </a>
      </footer>
    </>
  );
}

export default Layout;
