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
            console.log("hi")
            const response = await axios.get(`${BACKEND_URL}/api/v1/verify`,{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            console.log("the response : ", response)
            if(response.data.success == false || response.status!=200){
                setIsLoading(false)
                navigate("/signin")
            }
            else{
                setIsLoading(false)
                navigate('/blogs')
            }
        }
          
        try {
            verify();
        } catch (error) {
            localStorage.removeItem("token")
            navigate("/signin")
            console.log("error")
        }    
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