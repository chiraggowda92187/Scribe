import { useState } from "react";
import { Appbar } from "../components/Appbar"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";

export const Publish = ()=>{
    
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    //useEffect(()=>{console.log(state)}, [state])
    const navigate = useNavigate()
    return (
      <div>
        <div>
          <Appbar />
          <div className="flex justify-center">
            <div className="w-full max-w-screen-xl ">
              <input
                type="text"
                id="first_name"
                className="bg-white-50 border-0 border-gray-100 text-gray-900 text-2xl font-semibold rounded-lg block w-full p-2.5 dark:text-white mt-8 mb-4 focus:ring-0 focus:ring-offset-0"
                placeholder="Title of the blog"
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className="max-w-screen-xl rounded-lg w-full text-lg mb-8 focus:border"
                style={{}}
                placeholder="Let the magic unfold"
              />
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={async ()=>{
                    try {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                title : title,
                                content : description
                            }, 
                            {
                                headers : 
                                {
                                    Authorization : localStorage.getItem('token')
                                }
                        })
                        navigate(`/blog/${response.data.response.id}`)
                    } catch (error) {
                        //console.log(error)
                    }
                }}
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}