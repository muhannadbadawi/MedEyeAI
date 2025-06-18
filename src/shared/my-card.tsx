import { Card } from "antd";
import { CSSProperties, ReactNode } from "react";

const MyCard = ({
  children,
  styles,
}: {
  children?: ReactNode;
  styles?: CSSProperties;
}) => {
  return (
    <Card
      style={{
        width: "100%",
        borderRadius: 50,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        background: `linear-gradient(120deg,rgba(108, 208, 255, 0.4),rgba(28, 46, 76, 0.4))`,
        backdropFilter: "blur(10px)",
        margin: "5rem auto",
        border: "3px solid rgba(93, 143, 250, 0.6)",
        ...styles,
      }}
    >
      {children}
    </Card>
  );
};
export default MyCard;
