import { useState } from 'react';

const JoinGroup = (props) => {
  const [groupName, setGroupName] = useState('');

  const handleChangeGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName) {
      props.joinGroup(groupName);
    } else {
      alert('Please insert the group name.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user">Group Name:</label>
      <br />
      <input
        id="groupName"
        name="groupName"
        value={groupName}
        onChange={handleChangeGroupName}
      />
      <br />
      <br />
      <button>Submit</button>
    </form>
  );
};

export default JoinGroup;
