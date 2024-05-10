import { useParams } from "react-router-dom";
import { useBlogs } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { CustomLoader1 } from "../components/CustomLoader1.js";



export const Blog = ()=>{
    const {blogId}= useParams()
    //console.log(blogId)
    const { loading, blogs } = useBlogs({
      id: blogId,
    });
    if(loading==true) {
        return (
          <div className="flex flex-col justify-center h-screen">
            <div className="flex justify-center">
              <CustomLoader1/>
            </div>
          </div>
        );
    }
    return (
      <div>
        <FullBlog blog = {blogs[0]}/>
        
      </div>
    );
}