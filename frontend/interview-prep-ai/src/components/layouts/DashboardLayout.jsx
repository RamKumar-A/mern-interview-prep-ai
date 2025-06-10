import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';

function DashboardLayout({ children }) {
  const { user } = useContext(UserContext);
  return (
    <div className="pt-2 md:pt-6 lg:px-5">
      <Navbar />
      {user && <div className="container mx-auto md:px-3">{children}</div>}
    </div>
  );
}

export default DashboardLayout;
