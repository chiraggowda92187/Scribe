import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../pages/config"

export interface BlogsType {
    id : string,
    title : string,
    content : string,
    published : string,
    date : string,
    author : {
        name : string
    }
}

export const useBlogs = ({id} : {id? : string})=>{
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<BlogsType[]>([])
    
    useEffect(()=>{
        async function fetchBlogs(){
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })
            setBlogs(response.data.resp)
            setLoading(false)
        }

        async function fetchBlogWithId(){
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}` , {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })            
            //console.log(response)
            setBlogs([response.data.resp])
            setLoading(false)
        }

        if(!id){
            fetchBlogs()
        }
        else{
            fetchBlogWithId()
        }
    },[])
    return {loading, blogs}
}