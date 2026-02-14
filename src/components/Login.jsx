import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as StoreLogin} from '../store/AuthFile'
import {Button,Input,Logo} from '../components'
import { useDispatch } from 'react-redux'
import authService from '../AppWrite/Auth'
import { useForm } from 'react-hook-form'


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register,handleSubmit,formState:{errors}} = useForm();
    // register is used to register the input fields and handleSubmit is used to handle the form submission which is just the syntaxx, it isnt handling to register the user.
    const [error,setError] = React.useState('');
    
    const login = async(data) => {
        try {
            setError('');
            const session = await authService.login({...data});
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData)dispatch(StoreLogin(userData));
                navigate('/');
            }else{
                setError('Login failed');
            }
        } catch (error) {
            console.log(data)
            setError(error.message);
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Don&apos;t have any account?&nbsp;
                <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline '>Sign up</Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input 
                    label="Email: " 
                    placeholder='Enter your email'
                    type='email'
                    {...register('email',{
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be valid",
                        }
                    })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                    <Input 
                    label="Password" 
                    placeholder='Enter your password'
                    type="password" 
                    {...register('password',{
                        required: true,
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long"
                        },
                    })}/>
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>
                <Button type='submit' className='w-full mt-5'>Login</Button>
            </form>
        </div>
    </div>
  )
}

export default Login