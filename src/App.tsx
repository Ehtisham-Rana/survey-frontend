import 'bootstrap/dist/css/bootstrap.min.css';
// import NavBar from '@/components/NavBar';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router';
import useCounter from '@/hooks/useCounter';
// import { useEffect } from 'react';


function App() {
  const {count, increment, decrement, reset} = useCounter();

  const location = useLocation();
  const state = location.state?.user;
 if (state) {
    console.log(state.user.firstName + " "+ state.user.lastName);
  }

  return (
    <>
      {/* <NavBar /> */}
      {state && (<p>{state.user.firstName + " "+ state.user.lastName}</p>)}
      <Container className='mt-4 mx-auto bg-info-subtle text-center'>
        <h4 className='pt-4 pb-2'>Count: {count}</h4>
        <button className='btn btn-lg px-4 bg-success-subtle' onClick={increment}>Increment</button><br /><br />
        <button className='btn btn-lg px-4  bg-primary-subtle' onClick={decrement}>Decrement</button><br /><br />
        <button className='btn btn-lg px-5 bg-danger-subtle' onClick={reset}> Reset </button><br /><br />
      </Container>
    </>
  )
}

export default App
