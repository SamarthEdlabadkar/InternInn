import Head from "next/head";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";
import { FormEvent } from 'react';
import toast, {Toaster} from "react-hot-toast"
import { useState } from 'react';
import { useRouter } from 'next/navigation'

// fail = false

export default function GetStarted() {
  const router = useRouter()
  async function SignUp(full_name, year, age, phone, email, password, confirm_password){
    
    const r = new Map()

    if (confirm_password != password){
      r.set("status", false)
      r.set("message", "Password mismatched")
    }
  
    if (email.length < 7){
      r.set("status", false)
      r.set("message", "Invalid email")
    }

    if (email.substring(email.length - 6, email.length) !== "uc.edu"){
      r.set("status", false)
      r.set("message", "Invalid email")
    }
  
    const payload = {
      "full_name": full_name,
      "year": year,
      "age": age,
      "phone": phone,
      "email": email,
      "password": password,

    }

    const res = await fetch("/api/signup",
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(payload)
      }
    )

    if (!res.ok){
      throw new Error('Network response was not ok');
    }

    const resData = await res.json()

    if (resData["status"] == true){
      r.set("status", true)
      r.set("message", resData["message"])
    }else{
      r.set("status", false)
      r.set("message", resData["message"])
    }

    return r
  }

  async function handleSubmit(event){
    event.preventDefault()

    console.log("submit")
    const formDataObject = new FormData(event.currentTarget);
    const signup = await SignUp(formDataObject.get("name"),formDataObject.get("year"),formDataObject.get("age"), formDataObject.get("phone"), formDataObject.get("email"), formDataObject.get("password"), formDataObject.get("confirm_password"))

    console.log(signup)
    console.log(signup.get("status"))

    if (signup.get("status") == true){
      toast.success(signup.get("message"))
      router.push("/login")
    }else{
      toast.error(signup.get("message"))
    }
  } 
  
  return (
    <>
      <Head>
        <title>Get started</title>
      </Head>
      <div className='pt-28 pb-12'>
        <div className='custom-screen text-gray-600'>
          <div className='max-w-lg mx-auto gap-12 justify-center lg:flex lg:max-w-none'>
            <div className='flex-1 mt-12 sm:max-w-lg lg:max-w-md lg:mt-0'>
              <Toaster position="top-center"></Toaster>
              <form
                onSubmit={handleSubmit}
                className='space-y-5 font-medium' id="signup_form">
                <div>
                  <label>Full name</label>
                  <Input
                    aria-label='Full name'
                    type='text'
                    required
                    className='mt-2 focus:border-indigo-600'
                    name="name"
                  />
                </div>
                <div>
                  <label>Year</label>
                  <Input
                    aria-label='Year'
                    type='year'
                    required
                    className='mt-2 focus:border-indigo-600'
                    name="year"
                  />
                </div>
                <div>
                  <label>Age</label>
                  <Input
                    aria-label='Age'
                    type='age'
                    required
                    className='mt-2 focus:border-indigo-600'
                    name="age"
                  />
                </div>
                <div>
                  <label>Phone</label>
                  <Input
                    aria-label='Phone'
                    type='phone'
                    required
                    className='mt-2 focus:border-indigo-600'
                    name="phone"
                  />
                </div>
                <div>
                  <label>Email</label>
                  <Input
                    aria-label='Email'
                    type='email'
                    required
                    className='mt-2 focus:border-indigo-600'
                    name="email"
                  />
                </div>
                <div>
                  <label>Password</label>
                  <Input
                    aria-label='Password'
                    type='password'
                    required
                    className='mt-2 focus:border-indigo-600'
                    name="password"
                  />
                </div>
                <div>
                  <label>Confirm Password</label>
                  <Input
                    aria-label='confirm_password'
                    type='password'
                    required
                    className='mt-2 focus:border-indigo-600'
                    name="confirm_password"
                  />
                </div>
                <div className='pt-1'>
                  <Button className='w-full text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 ring-offset-2 ring-indigo-600 focus:ring' type="submit">
                    Submit
                  </Button>
                </div>
              </form>
              <br></br>
              <a onClick={() => router.push('/login')} href="">
                Already have account... Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
