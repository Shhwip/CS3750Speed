import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setAuthentiation }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://3.89.204.193:5050/api/authentication/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.status === 500) {
        throw response;
      }

      await response.json();
      setAuthentiation(false);
      navigate("/");
    } catch (err) {
      window.alert("Fail to log out");
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      Logging out...
    </div>
  );
}

export default Logout;
