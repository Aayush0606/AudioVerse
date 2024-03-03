function Header({ handleSearchSubmit }) {
  return (
    <>
      <header className="w-full">
        <div className="flex w-full justify-center p-2">
          <form className="flex gap-2" onSubmit={handleSearchSubmit}>
            <div>
              <div className="relative md:w-64 lg:w-[25em] ">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path d="M22 24h-17c-1.657 0-3-1.343-3-3v-18c0-1.657 1.343-3 3-3h17v24zm-2-4h-14.505c-1.375 0-1.375 2 0 2h14.505v-2zm0-18h-3v9l-2-1.547-2 1.547v-9h-8v16h15v-16z" />
                  </svg>
                </div>
                <input
                  type="search"
                  id="query"
                  name="query"
                  className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for book"
                />
              </div>
            </div>
            <div>
              <select
                id="by"
                name="by"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="text-white bg-gray-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-slate-900 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </header>
    </>
  );
}

export default Header;
