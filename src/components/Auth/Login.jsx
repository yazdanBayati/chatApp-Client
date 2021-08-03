import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Paper,
  Button,
  Link,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { ChatApi } from '../../apis/chatApi';

const Login = () => {
  const [value, setValue] = useState('');
  const [logedin, setLogedin] = useState(false);
  const [register, setRegister] = useState(false);

  const api = new ChatApi();

  const handleChange = (e) => {
    const { name } = e.target;
    setValue({ ...value, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value && value.userName && value.password) {
      var resp = await api.login(value);
      debugger;
      if (resp.data.success) {
        localStorage.setItem(
          'login',
          JSON.stringify({
            isLogin: true,
            token: resp.data.data.token,
            userId: resp.data.data.id,
          })
        );
        setLogedin(true);
      } else {
        alert(resp.data.error);
      }
    } else {
      alert('Please insert the data.');
    }
  };

  const handleRegister = (e) => {
    setRegister(true);
  };

  if (logedin) {
    return <Redirect to="/" />;
  } else if (register) {
    return <Redirect to="/register" />;
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
                    Sign in
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
                        <Grid container>
                          <Grid xs={6}>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              className="button-block"
                            >
                              Login
                            </Button>
                          </Grid>
                          <Grid xs={6}>
                            <Button
                              variant="contained"
                              type="button"
                              onClick={handleRegister}
                              className="button-block"
                            >
                              Sign up
                            </Button>
                          </Grid>
                        </Grid>
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

export default Login;
