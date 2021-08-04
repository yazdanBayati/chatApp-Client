import { Grid, Button, Typography, TextField } from '@material-ui/core';
import { useState } from 'react';

const CreateGroup = (props) => {
  const [title, setTiltle] = useState('');

  const handleChangeTitle = (e) => {
    setTiltle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      const group = {
        title: title,
      };
      props.onCreateGroup(group);
    } else {
      alert('Please insert the data.');
    }
  };

  return (
    <Grid container style={{ paddingBottom: '31px' }}>
      <Grid item xs={12}>
        <Typography variant="h6" className="header-message">
          New Group
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="title"
            name="title"
            value={title}
            onChange={handleChangeTitle}
          ></TextField>
          <Button
            style={{ marginLeft: '24px' }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Add
          </Button>
        </form>
      </Grid>
    </Grid>
    // <AppBar position="static" alignitems="center" color="primary">
    //   <Toolbar>
    //     <Grid container justify="center" wrap="wrap">
    //       <Grid item>
    //         <Typography variant="h6">Add New Group</Typography>
    //         <form onSubmit={handleSubmit}>
    //           <TextField
    //             id="title"
    //             name="title"
    //             value={title}
    //             onChange={handleChangeTitle}
    //           ></TextField>
    //           <Button variant="contained" color="primary">
    //             Primary
    //           </Button>
    //         </form>
    //       </Grid>
    //     </Grid>
    //   </Toolbar>
    // </AppBar>

    // <div>
    //   <h3>Create New Group</h3>
    //   <br />
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="title">Title :</label>
    //     <br />
    //     <input
    //       id="title"
    //       name="title"
    //       value={title}
    //       onChange={handleChangeTitle}
    //     />
    //     <br />
    //     <br />
    //     <button>Add</button>
    //   </form>
    // </div>
  );
};

export default CreateGroup;
