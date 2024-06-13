import React from "react";
import * as S from "./styles.js";

const GlobalButton = ({ onClick, fullWidth, text, sx, disabled }) => {
  return (
    <S.LightPurpleButton
      type="submit"
      fullWidth
      variant="contained"
      sx={sx}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </S.LightPurpleButton>
  );
};

export default GlobalButton;
