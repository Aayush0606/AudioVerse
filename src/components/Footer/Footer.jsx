function Footer() {
  return (
    <footer className="w-full p-2 ">
      <div className="grid h-full max-w-xs grid-cols-2 mx-auto font-medium bg-slate-700 border-slate-600 rounded-full">
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 border-gray-600 border-x hover:bg-gray-800 group rounded-l-full"
        >
          <svg
            className="w-5 h-5 mb-2 text-gray-400 group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <span className="text-sm text-gray-400 group-hover:text-blue-500">
            Home
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 border-e border-gray-600 hover:bg-gray-800 group rounded-r-full"
        >
          <svg
            className=" text-gray-400 group-hover:text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
          </svg>
          <span className="text-sm text-gray-400 group-hover:text-blue-500">
            Liked
          </span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
