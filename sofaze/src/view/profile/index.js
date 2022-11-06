import "./profile.css";
import { useAuthValue } from "../../auth-context";
import {
  Avatar,
  Card,
  CssBaseline,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Layout from "../../components/layout";

function Profile() {
  const { currentUser } = useAuthValue();

  return (
    <Layout>
      <Grid className="container" flexDirection="column" container padding={1}>
        <CssBaseline />

        <Card variant="outlined" padding={1}>
          <Box sx={{ width: "100%" }}>
            <Stack
              direction={{ xs: "row", sm: "row" }}
              spacing={{ xs: 2, sm: 2, md: 4 }}
              justifyContent="space-between"
              padding={1.5}
            >
              <Typography component="h1" variant="h5">
                Perfil
              </Typography>

              <Avatar sx={{ bgcolor: "#f44336" }}></Avatar>
            </Stack>
          </Box>
        </Card>
        <Card>
          <Box sx={{ width: "100%" }}>
            <CardContent>
              <strong>Email: </strong>
              {currentUser?.email}
            </CardContent>
            <CardContent>
              <strong>Email verificado: </strong>
              {`${currentUser?.emailVerified}`}
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </Layout>
  );
}

export default Profile;
