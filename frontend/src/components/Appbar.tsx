import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../pages/config";


export const Appbar = ()=>{
  const [isOpen, setIsopen] = useState(false)
  const toggleDropDown = ()=>{
    //console.log("hit")
    setIsopen(!isOpen)
  }

  const navigate = useNavigate()
  useEffect(()=>{
    async function verify(){
      const response = await axios.get(`${BACKEND_URL}/api/v1/verify`, {
        headers : {
          Authorization : localStorage.getItem('token')
        }
      })
      //console.log(response)
      if(response.data.success == false){
        navigate("/signin")
      }
      else{
        localStorage.setItem("userName", response.data.userName)
      }
    }
    
    try {
      verify();
    } catch (error) {
      localStorage.removeItem("token")
      navigate('/signin');
    }
  },[])
  
  const toggleContainer = useRef(null)
    return (
      <div className="border-b flex justify-between px-10 py-3">
        <Link to={'/blogs'}>
          <div className="flex flex-col justify-center h-full">
            <div className="flex justify-center">Scribe Space</div>
          </div>
        </Link>

        <div>
          <div className="flex">
            <Link to={'/publish'}>
              <div className="flex flex-col justify-center h-full">
                <button
                  onClick={() => {}}
                  type="button"
                  className="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-00 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-8"
                >
                  Publish New Blog
                </button>
              </div>
            </Link>
            <div className="flex flex-col justify-center h-full">
              <button
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-sm rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/signin');
                }}
              >
                Logout
              </button>
            </div>
            <div className="flex flex-col justify-center h-full">
              <div className="flex justify-center">
                <Avatar
                  size="big"
                  name={localStorage.getItem('userName') || 'A'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}