import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormLabel,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";

import "./App.css";
import CommonDatepicker from "./components/CommonDatepicker";
import Input from "./components/Input";
import signUpFormSchema from "./schemas/signUpFormSchema";

function App() {
  const { handleSubmit, control } = useForm({
    mode: "all",
    resolver: yupResolver(signUpFormSchema),
  });
  const onSubmit = (data) => console.log(data);

  const email = useWatch({
    control,
    name: "email",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  return (
    <div className="App">
      <header className="App-header">
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              A user sign up form using react hook form, yup, mui and luxon
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} id="signup">
              <Stack spacing={3}>
                <StyledFieldWrapperBox>
                  <FormLabel>First Name</FormLabel>
                  <Input control={control} name="firstName" />
                </StyledFieldWrapperBox>
                <StyledFieldWrapperBox>
                  <FormLabel>Middle Name</FormLabel>
                  <Input control={control} name="middleName" />
                </StyledFieldWrapperBox>
                <StyledFieldWrapperBox>
                  <FormLabel>Last Name</FormLabel>
                  <Input control={control} name="lastName" />
                </StyledFieldWrapperBox>
                <StyledFieldWrapperBox>
                  <FormLabel>Date Of Birth</FormLabel>
                  <CommonDatepicker control={control} name="dateOfBirth" />
                </StyledFieldWrapperBox>
                <StyledFieldWrapperBox>
                  <FormLabel>Email</FormLabel>
                  <Input control={control} name="email" />
                </StyledFieldWrapperBox>
                <StyledFieldWrapperBox>
                  <FormLabel>Re Enter Email</FormLabel>
                  <Input
                    control={control}
                    name="reEnterEmail"
                    disabled={email ? false : true}
                  />
                </StyledFieldWrapperBox>
                <StyledFieldWrapperBox>
                  <FormLabel>Password</FormLabel>
                  <Input control={control} name="password" type="password" />
                </StyledFieldWrapperBox>
                <StyledFieldWrapperBox>
                  <FormLabel>Re enter password</FormLabel>
                  <Input
                    control={control}
                    name="reEnterPassword"
                    type="password"
                    disabled={password ? false : true}
                  />
                </StyledFieldWrapperBox>
              </Stack>
            </form>
            <Box>
              <Button size="small" type="submit" form="signup">
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </header>
    </div>
  );
}

export default App;

const StyledFieldWrapperBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(1),
}));
