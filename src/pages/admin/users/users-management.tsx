import { Card } from "antd";

const UserManagement = () => {
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 460,
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        textAlign: "center",
        padding: 24,
        background: "#ffffff",
        margin: "0.5rem auto",
      }}
      bordered={false}
    ></Card>
  );
};
export default UserManagement;
