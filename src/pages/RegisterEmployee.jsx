import React, { useEffect, useState } from 'react';
import {
  TextField, Button, CircularProgress, Card, CardContent,
  Container,
  Typography
} from '@mui/material';
import toast, { Toaster } from "react-hot-toast";
import { getCreatedForm, registerEmployee } from '../utils/auth';
import { Link } from 'react-router-dom';


const RegisterEmployee = () => {
    const [form, setForm] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
  

  
    const handleChange = (label, value) => {
      setFormData({ ...formData, [label]: value });
    };
  
    const handleSubmit = async () => {
      try {
        const payload = {
            form: form.id,
            data: formData
        } ;
        const resilt = await registerEmployee(payload) ;
        if(resilt){
            toast.success("Employee registered") ;
        } else {
            toast.error("Failed to register employee") ;
        }
        setFormData({});
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCreatedForm = async () => {
        setLoading(true) ;
        const result = await getCreatedForm() ;
        if(result){
            setForm(result[0]);
            
        }
        setLoading(false) ;
    } ; 


    useEffect(() => {
        fetchCreatedForm() ;
    }, []) ;
  
    if (loading) return <CircularProgress />;

    if(!form.id){
        return <Container>
            <Typography sx={{mt:10, textAlign: 'center'}}>
                Please create a form <Link to='/form-builder'>here</Link>
            </Typography>
        </Container>
    }
  
    return (
        <Container sx={{mt:5}}>
            <Typography variant='h5' sx={{mb:3}}>Employee Registration</Typography>
            <Card>
                <CardContent>
        
                {form.fields.map(field => (
                    <div key={field.id} className="my-2">
                    <TextField
                        sx={{mb:2}}
                        fullWidth
                        label={field.label}
                        type={field.type}
                        value={formData[field.label] || ''}
                        onChange={(e) => handleChange(field.label, e.target.value)}
                    />
                    </div>
                ))}
        
                <Button variant="contained" className="mt-4" onClick={handleSubmit}>
                    Register
                </Button>
                </CardContent>
            </Card>

            <Toaster />
        </Container>
    ) ;
} ;


export default RegisterEmployee ;