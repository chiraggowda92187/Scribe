import { Link, useNavigate } from 'react-router-dom';
import { Quote } from '../components/Quote';
import { LabelledInputbox } from '../components/LabelledInputbox';
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from './config';

// basically the function takeas an object destructuring syntax, destructures type from the object params, it has a custom type with the following type :
// type functionInputType = {
//   type: 'signup' | 'signin';
// };
// similar to {type} : functionInputType
type signupType = {
  name : string,
  email : string,
  password : string
}
type signinType = {
  email : string, 
  password : string
}
type requestDataType = signupType | signinType
export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  async function sendRequest(){
    try {      
      
      var data : requestDataType;
      if(type=="signup"){
        data = inputs;
      }
      else{
        data = {
          email : inputs.email,
          password : inputs.password
        }
      }
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==='signup'?"signup":"signin"}`,data);
      if(response.data.success==false){
        const message = type=="signup"?"Error while signing up..!":"Error while signing in..!"
        throw new Error(message)
      }
      const jwt = response.data.token
      localStorage.setItem('token', jwt);
      navigate("/blogs")
    } catch (error) {
      //alert user about the error
      alert(error)
      //console.log(error)
    }
    
  }


  return (
    <div className="grid grid-cols-2">
      <div className="flex justify-center flex-col w-full">
        <div className="w-full">
          <div className="flex justify-center text-4xl font-bold">
            {type == 'signup' ? 'Create an account' : 'Login'}
          </div>
          <div className="flex justify-center pt-3 text-slate-500 font-medium">
            {type == 'signup' ? (
              <>
                Already have an account?{' '}
                <Link to={'/signin'} className="underline pl-1">
                  Login
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <Link to={'/signup'} className="underline pl-1">
                  Signup
                </Link>
              </>
            )}
          </div>
          <div className="grid justify-items-center">
            {type == 'signup' ? (
              <LabelledInputbox
                label="Username"
                placeholder="John Marston"
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : (
              <></>
            )}

            <LabelledInputbox
              label="Email"
              placeholder="johnmarston@gmail.com"
              onChange={(e) => {
                setInputs({
                  ...inputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInputbox
              label="Password"
              placeholder=""
              type="password"
              onChange={(e) => {
                setInputs({
                  ...inputs,
                  password: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="grid justify-items-center">
          <button
            onClick={sendRequest}
            type="button"
            className="mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-6/12 "
          >
            {type === 'signup' ? 'Sign up' : 'Sign in'}
          </button>
          <div className='pt-3 w-full flex justify-center'>
            <div className="w-1/3 font-medium bg-slate-100 p-4 rounded-lg text-sm text-slate-800">
              <span className="font-bold">💡 Note:</span>
              <div className="mt-2">
                If you are here to just checkout the website you can use these
                credentials,
                <div className="mt-2">
                  <div>
                    Username :{' '}
                    <span className="font-mono">johnmarston1@gmail.com</span>
                  </div>
                  <div>
                    Password : <span className="font-mono">password</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Quote></Quote>
    </div>
  );
};
