import Head from "next/head";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";
import { FormEvent } from 'react';
import toast, {Toaster} from "react-hot-toast"
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';
// fail = fals

export default function Login() {
  const router = useRouter()
  const user = getCookie("user")

    if (user != "" && user != undefined){
        router.push("/")
    }

  async function SignIn(email, password){
    
    const r = new Map()

  
    const payload = {
      "email": email,
      "password": password,

    }

    const res = await fetch("/api/login",
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
      r.set("message", "Login success")
      r.set("name", resData["data"]["full_name"])
      r.set("unique_id", resData["data"]["unique_id"])
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
    const signin = await SignIn(formDataObject.get("email"), formDataObject.get("password"))

    console.log(signin)
    console.log(signin.get("status"))

    if (signin.get("status") == true){
      toast.success(signin.get("message"))
      setCookie("user", signin.get("name") + "_" + signin.get("unique_id"))
      setCookie("alert", "success")
      router.push({
        pathname : "/",
      })
    }else{
      toast.error(signin.get("message"))
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
                <div className='pt-1'>
                  <Button className='w-full text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 ring-offset-2 ring-indigo-600 focus:ring' type="submit">
                    Submit
                  </Button>
                </div>
              </form>
              <br></br>
              <a onClick={() => router.push('/get-started')} href="#">
                Don't have an account... Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
