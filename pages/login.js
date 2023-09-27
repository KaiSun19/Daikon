import { useState } from "react";
import useUser from "../utils/useUser";
import { BlackTextField } from "../StyledComponents/StyledComponents";
import { Button, Box, Typography } from "@mui/material";
import Navbar from "./Components/Navbar";
import { useDaikonContext } from "../Context";

export default function Login() {
  // here we just check if user is already logged in and redirect to admin
  const { mutateUser } = useUser({
    redirectTo: "/druid",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      password: e.currentTarget.password.value,
    };

    const userData = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const user = await userData.json();

    try {
      await mutateUser(user);
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  }

  const { mobile } = useDaikonContext();

  return (
    <>
      <Navbar />
      <center>
        <Typography variant={mobile ? "h5" : "h3"} className="page-subtitle">
          Login to use widgets
        </Typography>
      </center>
      <Box
        sx={{
          padding: "2%",
          display: "flex",
          flexDirection: "column",
        }}
        className="items-center justify-center w-full"
      >
        <form onSubmit={handleSubmit} className="w-full">
          <BlackTextField
            placeholder="Enter Password"
            variant="outlined"
            type="password"
            name="password"
            fullWidth
            required
            className="contact-input"
          />

          <Button
            variant="outlined"
            color={"primary"}
            type="submit"
            sx={{ marginTop: "16px" }}
          >
            Submit
          </Button>

          {errorMsg && <p>{errorMsg}</p>}
        </form>
      </Box>
    </>
  );
}
