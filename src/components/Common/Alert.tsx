import { Alert } from "antd";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

interface Props {
  alert: {
    message: string;
    type: "success" | "error" | "warning" | "info" | undefined;
    isAlertOpen: boolean;
  };
  setAlert: Function;
}

const AlertComponent = ({ alert, setAlert }: Props) => {
  const resetAlert = useCallback(() => {
    setAlert({
      message: "",
      type: "undefined",
      isAlertOpen: false,
    });
  }, [setAlert]);

  useEffect(() => {
    if (alert.isAlertOpen) {
      setTimeout(resetAlert, 5000);
    }
  }, [alert.isAlertOpen, resetAlert]);

  return alert.isAlertOpen ? (
    <AlertContainer>
      <StyledAlert
        message={alert.message}
        type={alert.type}
        onClose={resetAlert}
        closable
        showIcon
      />
    </AlertContainer>
  ) : null;
};

const AlertContainer = styled.div`
  min-width: 300px;
  width: fit-content;
  position: fixed;
  bottom: 32px;
  left: 32px;
  z-index: 1000;
`;

const StyledAlert = styled(Alert)`
  padding: 12px;
  font-weight: 600;
  gap: 8px;
`;

export default AlertComponent;
