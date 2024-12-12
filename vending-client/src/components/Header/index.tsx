import React, { useEffect } from "react";
import { config } from "../../config";
import { Typography } from "antd";
import logo from "/logo.svg";
import "./index.scss";

const { Title, Text } = Typography;

const Header: React.FC = () => {
  useEffect(() => {
    document.title = config.MACHINE_NAME;
  }, []);
  
  return (
    <header className="header">
      <img src={logo} className="machine-logo" alt="logo" />
      <div className="machine-name">
        <Title>{config.MACHINE_NAME}</Title>
        <Text>{config.MACHINE_DESCRIPTION}</Text>
      </div>
    </header>
  );
};

export default Header;
