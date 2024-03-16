import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Hero_Slider = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img
        src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=2160&ixid=MnwxfDB8MXxyYW5kb218MHx8bWVkaWNhbCBjYW1wIGJsb29kIGR8fHx8fHwxNzA5OTk4NTMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=3840"
        alt=""
        width="100%"
      />
      <Container>
        <Box sx={{ mt: 2 }} align={"center"}>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Get Started
          </Button>
        </Box>
        <Typography variant="h4" mt={2}>
          How Blood Type Is Determined And Why You Need To Know
        </Typography>
        <Typography>
          Blood types are determined by the presence or absence of certain
          antigens – substances that can trigger an immune response if they are
          foreign to the body. Since some antigens can trigger a patient's
          immune system to attack the transfused blood, safe blood transfusions
          depend on careful blood typing and cross-matching. Do you know what
          blood type is safe for you if you need a transfusion?
        </Typography>
        <Typography variant="h4">Blood Compatibility Check</Typography>
        <img
          src="https://www.giveblood.ie/images_upload/imagesLibrary/Blood-Compatability-Group__________________..PNG"
          alt=""
          width="100%"
        />
      </Container>
    </div>
  );
};

export default Hero_Slider;
