import { Link } from "react-router-dom"
import { dot, comments } from "../../assets/icons"
import { avatar2 } from "../../assets/images"

const Post = ({ data }) => {
  const formattedDate = new Date(data.createdAt).toLocaleString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <article className="lg:rounded-lg overflow-hidden border-b lg:border border-gray-200 lg:p-6 pt-6 pb-5 flex flex-col gap-4">
      <header className="flex items-center gap-3">
        <img
          src={avatar2}
          alt="User avatar"
          height={40}
          width={40}
          className="aspect-square object-cover rounded-full cursor-pointer"
        />
        <div>
          <p className="font-semibold text-slate-700 text-sm">
            {data.user.displayName ? data.user.displayName : data.user.name}
          </p>
          <div className="flex flex-row items-center gap-1">
            <span className="text-sm text-slate-500 hidden sm:block">
              {data.user.name}
            </span>
            <img
              src={dot}
              alt="dot"
              width={5}
              height={5}
              className="hidden sm:block"
            />
            {/* <span className="text-sm text-slate-500">Feb 5, 2024</span> */}
            <span className="text-sm text-slate-500">{formattedDate}</span>
          </div>
        </div>
      </header>
      <section className="flex flex-col gap-1">
        <Link to={`/feed/post/${data.id}`}>
          <h2 className="font-bold text-slate-700 text-xl sm:text-2xl">
            {data.title}
          </h2>
        </Link>
        <Link to={`/feed/post/${data.id}`} className="hidden sm:block ">
          <p className="whitespace-pre-line line-clamp-2 text-slate-500">
            {data.text}
          </p>
        </Link>
      </section>
      <footer className="flex items-center gap-2">
        <a
          href="#"
          className="text-sm text-slate-500 font-semibold flex items-center gap-1"
        >
          <img src={comments} alt="dot" width={20} height={20} />
          Discuss
        </a>
        <img src={dot} alt="dot" width={5} height={5} />
        <span className="text-sm text-slate-500">46 likes</span>
      </footer>
    </article>
  )
}

export default Post