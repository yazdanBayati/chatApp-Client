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
    <div>
      <h3>Create New Group</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title :</label>
        <br />
        <input
          id="title"
          name="title"
          value={title}
          onChange={handleChangeTitle}
        />
        <br />
        <br />
        <button>Add</button>
      </form>
    </div>
  );
};

export default CreateGroup;
