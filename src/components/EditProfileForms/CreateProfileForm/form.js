import React, { useContext } from "react";
import useForm from "../../../hooks/useForm";
import {
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { UserProfileContext } from "../UserProfile/UserProfileContext";

export default (props) => {
  const [userProfileParams, setUserProfileParams] = useContext(
    UserProfileContext
  );

  const initialState = userProfileParams;

  const { handleSubmit, handleInputChange, inputs } = useForm(initialState);

  const handleChange = (event) => {
    // (event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            name="firstName"
            fullWidth
            type="text"
            label="First Name"
            value={inputs.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="lastName"
            fullWidth
            type="text"
            label="Last Name"
            value={inputs.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        {/* <Grid item xs={4}>
          <TextField
            name="displayName"
            fullWidth
            type="text"
            label="Display Name"
            value={inputs.displayName}
            onChange={handleInputChange}
          />
        </Grid> */}
        <Grid item xs={6}>
          <TextField
            name="city"
            fullWidth
            type="text"
            label="City"
            value={inputs.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="state"
            fullWidth
            type="text"
            label="State"
            value={inputs.state}
            onChange={handleInputChange}
          />
        </Grid>
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">
            Specialty
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            // value={age}
            // onChange={handleChange}
            label="Specialty"
          >
            <MenuItem value="Front-End">Front-End</MenuItem>
            <MenuItem value="Back-End">Back-End</MenuItem>
            <MenuItem value="Full-Stack">Front-Stack</MenuItem>
          </Select>
        </FormControl>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Button variant="contained" fullWidth color="primary" type="submit">
            Create Profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

// TODO: figure out image upload/hosting
// hosting: imgbb.com
// compression: https://helloacm.com/images-compressor/
