// src/pages/not-found/NotFoundPage.tsx

import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    const user = localStorage.getItem("user");
    const role = user ? JSON.parse(user).role : null;
    navigate(`/${role}/home`);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
