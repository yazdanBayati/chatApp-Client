import React, { useState } from 'react';
import { ChatApi } from '../../apis/chatApi';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  Button,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
const Register = () => {
  const [value, setValue] = useState('');
  const [login, setLogin] = useState(false);

  const handleChange = (e) => {
    const { name } = e.target;
    setValue({ ...value, [name]: e.target.value });
  };

  const api = new ChatApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value && value.userName && value.password) {
      var resp = await api.registerUser(value);
      if (resp.data.success) {
        setLogin(true);
      } else {
        alert(resp.data.error);
      }
    } else {
      alert('Please insert the data.');
    }
  };

  if (login) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div>
        <AppBar position="static" alignitems="center" color="primary">
          <Toolbar>
            <Grid container justify="center" wrap="wrap">
              <Grid item>
                <Typography variant="h6">Chat App</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid
          style={{ paddingTop: '5%' }}
          container
          spacing={0}
          justify="center"
          direction="row"
        >
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="login-form"
            >
              <Paper
                variant="elevation"
                elevation={2}
                className="login-background"
              >
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                </Grid>
                <Grid item>
                  <form onSubmit={handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          type="text"
                          placeholder="User Name"
                          fullWidth
                          name="userName"
                          variant="outlined"
                          value={value.userName}
                          onChange={handleChange}
                          required
                          autoFocus
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="password"
                          placeholder="Password"
                          fullWidth
                          name="password"
                          variant="outlined"
                          value={value.password}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className="button-block"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default Register;
