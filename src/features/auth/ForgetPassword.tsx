import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import CustomInput from '@/components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { RoutePath } from '@/routes/routePath';
import useAxios from '@/hooks/useAxios';
import {  useNavigate } from 'react-router';


function ForgetPassword() {

  const navigate = useNavigate();
  
  const { response, error, loading, fetchData } = useAxios();
   
     
    useEffect(() => {
        if (response || loading) {
            navigate("/"+ RoutePath.AUTH + "/" + RoutePath.VERIFYOTP, {
          state: {user: response}
        });
        } else {
            console.log(error);
        }},
    [response, navigate])
  
  const validationSchema = Yup.object({
    
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      
    },
    validationSchema,
    onSubmit: async (values) => {
      await fetchData ({url: "forgot-password", method: "POST", data: values})
    },
  });


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card 
        className='bg-light p-4 rounded-4 shadow-lg '
        style={{ width: '100%', maxWidth: '450px' }} 
      >
        <Card.Body>
          <h3 className='text-center mb-4 text-info'>
            Forget Pasword
          </h3>

         
          <Form noValidate onSubmit={formik.handleSubmit} className='p-1'>
           
            <CustomInput 
              name='email'
              type='email' 
              label='Enter email to get resent password link' 
              placeholder='Enter your Email' 
              onChange={formik.handleChange}
              value={formik.values.email }
              isInvalid={!!formik.errors.email}
              validationMsg={formik.errors.email || ""}
            />

            <Button 
              variant="info" 
              type="submit" 
              className='w-100 mt-3 fw-bold' 
            >
              Forget Password
            </Button>
          </Form>
            
        </Card.Body>
      </Card>
    </div>
  );
}

export default ForgetPassword;