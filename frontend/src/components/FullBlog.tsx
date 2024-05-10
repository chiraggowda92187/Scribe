import { BlogsType } from "../hooks";
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard";








export const FullBlog = ({blog} : {blog : BlogsType})=>{
    const date = new Date(blog.date).toString().split(' ')
    //console.log(blog)
    const data = {__html : blog.content}
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div className="grid grid-cols-12 px-10 w-full pt-10 max-w-screen-2xl">
            <div className="grid col-span-8 ">
              <div className="text-5xl font-extrabold">{blog.title}</div>
              <div className="text-slate-500 pt-2">
                Posted on {date[1]} {date[2]}, {date[3]}
              </div>
              {/* <div className="pt-4">{blog.content}</div> */}
              <div dangerouslySetInnerHTML={data}></div>
            </div>
            <div className="col-span-4 pl-8">
              <div className="text-lg">Author </div>
              <div className="flex w-full pt-4">
                <div className="pr-4 flex flex-col justify-center ">
                  <Avatar name={blog.author.name || 'Anonymous'} size="big" />
                </div>
                <div>
                  <div className="text-xl font-bold pb-4">
                    {blog.author.name || 'Anonymous'}
                  </div>
                  <div className="text-slate-500">
                    Random cathchy phrase about the author about how he has the
                    ability to grab the readers attention
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}