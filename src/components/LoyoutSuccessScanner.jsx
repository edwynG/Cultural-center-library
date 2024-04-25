import { Box, Button, makeStyles, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { Context } from "../context/Context";

function LoyoutSuccessScanner({title,subtitle,textBottom, modeError=false, onclick = ()=> null}) {
  const classes = {
    containerSuccess: {
      justifyContent: "space-between",
      height: "455px",
      alignItems: "center",
      padding: "10px auto",
    },
    containerTextSuccess: {
      textAlign: "center",
    },
    textTitleSuccess: {
      fontWeight: 400,
    },
    textSubTitleSuccess: {
      fontWeight: 100,
    },
    iconSuccess: {
      fontSize: 200,
      fill: !modeError?"#5DD782":"#ff0000e3",
    },
    buttonSuccess: {
      backgroundColor: !modeError?"#5DD782":"#ff0000e3",
      padding: "10px 50px",
      "&:hover": {
        backgroundColor: !modeError?"#60c98f":"#ff0000b0",
      },
    },
  };
  return (
    <Stack sx={classes.containerSuccess}>
      <Box sx={classes.containerTextSuccess}>
        <Typography variant="h4" sx={classes.textTitleSuccess}>
          {title}
        </Typography>
        <Typography variant="h6" sx={classes.textSubTitleSuccess}>
          {subtitle}
        </Typography>
      </Box>
      {!modeError ?<CiCircleCheck style={classes.iconSuccess} />:<MdErrorOutline style={classes.iconSuccess} />}
      <Button variant="contained" sx={classes.buttonSuccess} onClick={onclick}>
        {textBottom}
      </Button>
    </Stack>
  );
}

export default LoyoutSuccessScanner;
