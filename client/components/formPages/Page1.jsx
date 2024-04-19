import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { updateDestination } from '../../reducers/tripReducer';

const Page1 = () => {
  const navigate = useNavigate();

  const { destination } = useSelector(state => state.trip);
  const dispatch = useDispatch();

  const handleInputChange = e => {
    const { value } = e.target;
    dispatch(updateDestination(value));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate('/form/page2');
    }
  };

  return (
    <div>
      <label htmlFor="destination">
        Destination:
      </label>
      <input
        type="text"
        name="destination"
        value={destination}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div>
        <Link to='/form/page2'>
          <button type='button'>Next</button>
        </Link>
      </div>
    </div>
  )
};

export default Page1;