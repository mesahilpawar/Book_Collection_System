import { NavLink } from 'react-router-dom';
import { FaBook, FaHome, FaPlusCircle, FaList } from 'react-icons/fa';

const navItems = [
  { to: '/', label: 'Home', icon: FaHome },
  { to: '/add', label: 'Add Book', icon: FaPlusCircle },
];

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <FaBook size={28} />
        <span>BookShelf</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `sidebar-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;