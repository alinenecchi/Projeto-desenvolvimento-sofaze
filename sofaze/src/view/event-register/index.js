import React from "react";
import { useAuthValue } from "../../auth-context";
import Layout from "../../components/layout";
import {
  Autocomplete,
  Box,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./event.css";

const options = ["Tarefas", "Compras", "Receitas", "Contas", "Outros"];

export default function EventRegister() {
  const { currentUser } = useAuthValue();
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Layout>
      <Stack direction="column" justifyContent="center" spacing={1}>
        <Typography
          textAlign="center"
          padding={1}
          mt={3}
          component="h1"
          variant="h4"
        >
          Cadastro de Eventos
        </Typography>
        {currentUser?.emailVerified && (
          <Typography
            textAlign="center"
            paddingBottom={5}
            component="h2"
            variant="h5"
          >
            {currentUser?.email ? `Bem vindo ${currentUser?.email}` : null}
          </Typography>
        )}

        <Box
          component="form"
          width="100%"
          noValidate
          sx={{ mt: 1, padding: "10px" }}
        >
          <Stack spacing={5} sx={{ width: "100%" }}>
            <Typography component="h3" variant="h5" textAlign="center">
              Novo Evento
            </Typography>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="selected-event"
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Selecione um evento" />
              )}
            />

            <FormControl variant="standard">
              <FormLabel>Título:</FormLabel>
              <TextField
                //onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                id="title-event"
                name="title"
                autoComplete
                autoFocus
              />
            </FormControl>

            <FormControl variant="standard">
              <FormLabel>Descrição do evento:</FormLabel>
              <TextField
                id="description"
                label="Descrição do evento"
                multiline
                maxRows={4}
                //value={value}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>

            <FormControl variant="standard">
              <FormLabel>Data:</FormLabel>
              <TextField type="date" variant="outlined" />
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Layout>
  );
}
