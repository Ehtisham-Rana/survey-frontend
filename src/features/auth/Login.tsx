import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import CustomInput from '@/components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { RoutePath } from '@/routes/routePath';
import useAxios from '@/hooks/useAxios';
import { useNavigate } from 'react-router';


function LoginForm() {

  const navigate = useNavigate();

  const { response, error, loading, fetchData } = useAxios();
  

  useEffect(() => {
          
    if (response || loading) {
        navigate("/", {
          state: {user: response}
        });
    } else {
        console.log(error);
    }},
  [response, navigate]);
  
  const validationSchema = Yup.object({
 
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password have at least 6 character!')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
     
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit: async (values) => {
      await fetchData ({url: "login", method: "POST", data: values})
    },
  });


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card 
        className='bg-light p-4 rounded-4 shadow-lg '
        style={{ width: '100%',maxWidth: '450px' }} 
      >
        <Card.Body>
          <h3 className='text-center mb-4 text-info'>
            Login Account
          </h3>

         
          <Form noValidate onSubmit={formik.handleSubmit} className='p-1'>
           
            <CustomInput 
              name='email'
              type='email' 
              label='Email:' 
              placeholder='Enter your Email' 
              onChange={formik.handleChange}
              value={formik.values.email}
              isInvalid={!!formik.errors.email}
              validationMsg={formik.errors.email || ""}
            />

            <CustomInput 
              name='password' 
              type='password' 
              label='Password:' 
              placeholder='Enter your Password' 
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={!!formik.errors.password}
              validationMsg={formik.errors.password || ""}
            />

            <Button 
              variant="info" 
              type="submit" 
              className='w-100 mt-3 fw-bold' 
            >
              Login
            </Button>
          </Form>
            <p className="text-center mt-3 mb-0">
              Don't have an account? <a href={RoutePath.REGISTER} className="text-info fw-bold">Signup</a>
            </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginForm;