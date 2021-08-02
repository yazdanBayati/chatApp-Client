const GroupList = (props) => {
  return props.groupList.map((item) => (
    <li onClick={() => props.onGroupClick(item)} key={item.id}>
      {item.title}
    </li>
  ));
};

export default GroupList;
