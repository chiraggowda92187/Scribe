import { Link } from "react-router-dom";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";
import { Skeleton } from "../components/Skeleton";

export const Blogs = ()=>{
    const {loading, blogs} = useBlogs({})
    if(loading == true){
        return (
          <div>
            <Appbar />
            <div className="flex justify-center">
              <div className="">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            </div>
          </div>
        );
    }
    var count = 0
    return (
        <div>
            <Appbar/>
            <div className="flex justify-center">
            <div className="">
                {blogs.map((blog)=>{
                    if(count<10){
                        count++
                        const d = new Date(blog.date).toString().split(' ');
                        const date = `${d[1]} ${d[2]} ${d[3]}`;
                        return (
                          <Link to={`/blog/${blog.id}`}>
                            <BlogCard
                              authorName={blog.author.name}
                              title={blog.title}
                              date={date}
                              content={blog.content}
                            />
                          </Link>
                        );
                    }
                    
                })}
                {/* <BlogCard
                authorName="Chirag"
                title="How an ugly single-page website makes $5000, a month with affiliate marketing"
                date="April 4 2024"
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, atque odio culpa nobis magnam sapiente mollitia. Eaque earum at quos velit eos id pariatur nulla quam numquam quibusdam perferendis itaque vel alias, sit officiis est architecto doloremque magnam natus, similique sapiente sint aliquid. Suscipit, doloribus. Necessitatibus possimus sed voluptates iusto!"
                />
                <BlogCard
                authorName="Chirag"
                title="How an ugly single-page website makes $5000, a month with affiliate marketing"
                date="April 4 2024"
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, atque odio culpa nobis magnam sapiente mollitia. Eaque earum at quos velit eos id pariatur nulla quam numquam quibusdam perferendis itaque vel alias, sit officiis est architecto doloremque magnam natus, similique sapiente sint aliquid. Suscipit, doloribus. Necessitatibus possimus sed voluptates iusto!"
                />
                <BlogCard
                authorName="Chirag"
                title="How an ugly single-page website makes $5000, a month with affiliate marketing"
                date="April 4 2024"
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, atque odio culpa nobis magnam sapiente mollitia. Eaque earum at quos velit eos id pariatur nulla quam numquam quibusdam perferendis itaque vel alias, sit officiis est architecto doloremque magnam natus, similique sapiente sint aliquid. Suscipit, doloribus. Necessitatibus possimus sed voluptates iusto!"
                /> */}
            </div>
            </div>
        </div>
    );
}