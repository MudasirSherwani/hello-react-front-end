import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGreeting } from '../redux/features/greetings';

const Greetings = () => {
  const dispatch = useDispatch();

  const fetchedGreeting = useSelector((state) => state.greetings);
  console.log(fetchedGreeting);
  useEffect(() => {
    dispatch(fetchGreeting());
  }, [dispatch]);

  return (
    <div>
      <h1>Random Greeting Message</h1>
      <div>
        {fetchedGreeting.greetings
          ? <p>{fetchedGreeting.greetings.message}</p>
          : <p>No greetings found</p>}
      </div>
    </div>
  );
};

export default Greetings;
