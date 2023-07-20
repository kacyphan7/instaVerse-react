//import { deleteUser } from './users/edit/page';

const handleLogout = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('jwtToken')) {
      // remove token for localStorage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('email');
      localStorage.removeItem('expiration');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
    }
  }
};

export default handleLogout;