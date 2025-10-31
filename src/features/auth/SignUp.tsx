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


function SignupForm() {

  const navigate = useNavigate();

  const { response, error, loading, fetchData } = useAxios();
  
    useEffect(() => {
    console.log("Response:", response);      
    if (response || loading) {
        navigate("/"+ RoutePath.AUTH+ "/"  + RoutePath.VERIFYOTP, {
          state: {user: response}
        });
    } else {
        console.log(error);
    }},
  [response, navigate]);
  
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password have at least 6 character!')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName:"",
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit: async (values) => {
      await fetchData ({url: "register", method: "POST", data: values})
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
            Create Account
          </h3>

         
          <Form noValidate onSubmit={formik.handleSubmit} className='p-1'>
            <CustomInput 
              name='firstName' 
              type='text' 
              label='First Name:' 
              placeholder='Enter your Name' 
              onChange={formik.handleChange}
              value={formik.values.firstName}
              isInvalid={!!formik.errors.firstName}
              validationMsg={formik.errors.firstName || ""}
              
            />

            <CustomInput 
              name='lastName' 
              type='text' 
              label='Last Name:' 
              placeholder='Enter your Name' 
              onChange={formik.handleChange}
              value={formik.values.lastName}
              isInvalid={!!formik.errors.lastName}
              validationMsg={formik.errors.lastName || ""}
            />

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
              Register
            </Button>
          </Form>
            <p className="text-center mt-3 mb-0">
              Already have an account? <a href={RoutePath.LOGIN} className="text-info fw-bold">Login</a>
            </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignupForm;