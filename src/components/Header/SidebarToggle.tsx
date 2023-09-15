import { useEffect, useState } from 'preact/hooks';
import './HeaderButton.css';
// import './SidebarToggle.css';
import './hamburgerStyles.scss';
// import 'hamburgers/dist/hamburgers.css';  // Importing hamburgers CSS

const MenuToggle = () => {
  const [sidebarShown, setSidebarShown] = useState(false);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (sidebarShown) {
      body.classList.add('mobile-sidebar-toggle');
      document.querySelectorAll('aside nav details').forEach((e) => {
        e.removeAttribute('open');
      });
      document
        .querySelector('details a[data-current-parent="true"]')
        ?.closest('details')
        ?.setAttribute('open', '');
    } else {
      body.classList.remove('mobile-sidebar-toggle');
      document.querySelectorAll('aside nav details').forEach((e) => {
        e.setAttribute('open', '');
      });
    }
  }, [sidebarShown]);

  return (
    <button
      id="menu-toggle"
      className={`header-button hamburger hamburger--spring-r ${sidebarShown ? 'is-active' : ''}`}
      type="button"
      aria-pressed={sidebarShown ? 'true' : 'false'}
      onClick={() => setSidebarShown(!sidebarShown)}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
      <span className="sr-only">Toggle sidebar</span>
    </button>
  );
};

export default MenuToggle;
