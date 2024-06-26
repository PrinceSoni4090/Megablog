import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth"
import { useForm } from 'react-hook-form';



function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full'>
            <div className={'mx-auto w-full max-w-lg bg-toggle mt-5 rounded-xl p-6 border border-black/10 text-primary'}>
                <div className="mb-2 flex justify-center items-center ">
                    <span className="inline-block w-full max-w-[200px] pr-6 pt-5">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center mt-0 text-2xl font-bold leading-tight">Sign in to your account</h2>
                <h3 className="pt-5 text-center text-lg font-semibold leading-tight" >Demo Email : guest12@gmail.com </h3>
                <h4 className="pt-1.5 text-center text-lg font-semibold leading-tight">Demo password : Guest12@</h4>
                <p className="mt-5 text-center text-base  text-primary">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover: underline">
                        Sign up
                    </Link>
                </p>
                {error && <p className="text-red-500 text-center">
                    {error} </p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                        label= "Password:"
                        placeholder="Enter your password"
                        type="password"
                        {...register("password",{
                            required:true,
                        })}
                        />
                        <Button
                        type = "submit"
                        className = "w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
