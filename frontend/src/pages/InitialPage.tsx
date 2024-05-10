import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "./config"
import { useNavigate } from "react-router-dom"
import { CustomLoader } from "../components/CustomLoader"


export const InitialPage = ()=>{
    const [isLoading, setIsLoading] = useState(true);
    //const [loggedIn , setLoggiedIn] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        async function verify(){
            const response = await axios.get(`${BACKEND_URL}/api/v1/verify`,{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            // console.log(response)
            if(response.data.success == false){
                setIsLoading(false)
                navigate("/signin")
            }
            else{
                setIsLoading(false)
                navigate('/blogs')
            }
        }
        verify()      
    }, [])

    if(isLoading == true){
        return (
          <div className="flex flex-col justify-center h-screen">
            <div className="flex justify-center">
              <CustomLoader />
            </div>
          </div>
        );
    }

    return (
        <div>            
        </div>
    )
}