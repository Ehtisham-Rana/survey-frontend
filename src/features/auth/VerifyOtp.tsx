import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import CustomInput from '@/components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { RoutePath } from '@/routes/routePath';
import useAxios from '@/hooks/useAxios';
import { useLocation, useNavigate } from 'react-router';


function VerifyOtpForm() {

  const navigate = useNavigate();
  const { state } = useLocation();

  const  {user}  = state.user;
  let email = user.email;
  console.log(email);
  

  const { response, error, loading, fetchData } = useAxios();
        
    useEffect(() => {
        if (response || loading) {
            navigate("/"+ RoutePath.AUTH+ "/"  +RoutePath.LOGIN);
        } else {
            console.log(error);
        }},
    [response, navigate])

  const handleClick = async (e: any) => {
    e.preventDefault();
    await fetchData ({url: "resend-otp", method: "POST", data: email})
  };
  
  const validationSchema = Yup.object({
    
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    otpCode: Yup.string()
      .max(6)
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: email,
      otpCode:"",
    },
    validationSchema,
    onSubmit: async (values) => {
      await fetchData ({url: "verify-otp", method: "POST", data: values})
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
            Verify Account
          </h3>
          <p className="text-center mt-3 mb-0">
            An email with OTP code is sent successfully.
          </p>
         
          <Form noValidate onSubmit={formik.handleSubmit} className='p-1'>
                       
            <CustomInput 
              name='otpCode' 
              type='text' 
              label='' 
              placeholder='Enter OTP Code' 
              onChange={formik.handleChange}
              value={formik.values.otpCode}
              isInvalid={!!formik.errors.otpCode}
              validationMsg={formik.errors.otpCode || ""}
            />

            <Button 
              variant="info" 
              type="submit" 
              className='w-100 mt-3 fw-bold' 
            >
              Verify
            </Button>
          </Form>
            <p className="text-center mt-3 mb-0">
                Don't received code? <a href='#' onClick={handleClick} className="text-info fw-bold">Resend Code</a>
            </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VerifyOtpForm;