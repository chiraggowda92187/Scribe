
interface BLogsInput {
    authorName : string,
    date : string,
    title : string,
    content : string
}



export const BlogCard = ({authorName, date, title, content} : BLogsInput)=>{
    //console.log(content)
    const shortenedContent = content.length>100?`${content.slice(0,100)}...` : content
    const contentInner = {__html : shortenedContent}
    return (
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md">
        <div className="flex">
          <div className="">
            <Avatar name={authorName} />
          </div>

          <div className="pl-2 font-normal text-sm flex justify-center flex-col">
            {authorName}
          </div>

          <div className="flex justify-center flex-col pl-1 flex justify-center flex-col">
            <Dot />
          </div>

          <div className="pl-1 font-normal text-slate-500 text-sm flex justify-center flex-col">
            {date}
          </div>
        </div>
        <div className="text-xl font-bold pt-2">{title}</div>
        <div>
          {content.length > 100 ? <div><div dangerouslySetInnerHTML={contentInner}/></div> : <div><div dangerouslySetInnerHTML={contentInner}/></div>}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-5">
          {Math.ceil(content.length / 100)} min read
        </div>
        {/* <div className="bg-slate-200 h-1 w-full "></div> */}
      </div>
    );
}


export const Dot = ()=>{
    return (
        <div className="w-1 h-1 rounded-full bg-slate-400"></div>
    )
}

export const Avatar = ({name, size = 'small'} : {name : string, size? : "small" | "big"}) =>{
    return (
      <div className={`relative inline-flex items-center justify-center ${size==="small"? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-900`}>
        
        <div className={`${size==="small" ? "text-xs" : "text-md"}  text-gray-600 dark:text-gray-300`}>
          {/* <img src={userAvatar} alt="" className="h-4 w-4"/> */}
          {name[0].toUpperCase()}
          </div>
      </div>
    );
}