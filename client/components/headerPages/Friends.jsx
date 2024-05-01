import { useEffect, useState } from 'react';

export default function Friends() {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);

  let friendsList;

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const res = await fetch('/api/users/user', {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setUser(res);
      } catch (err) {
        console.error(err);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    if (user) setFriends(user.friends);
  }, [user]);

  useEffect(() => {
    if (friends) friendsList = friends.map((friend) => (
      <div key={friend._id}>
        <h3>{friend.name}</h3>
        <p>{friend.email}</p>
      </div>
    ));
  });

  return (
    <div>
      <h2>Friends</h2>
      {friendsList}
    </div>
  );
}