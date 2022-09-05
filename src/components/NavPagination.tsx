type Pagination = {
  page: number;
  next: number | boolean;
  prev: number | boolean;
  totalPage: number;
};

type Props = {
  pagination: Pagination | undefined;
  onClick: (page?: number | boolean) => void;
};

const NavPagination = ({ pagination, onClick }: Props) => {
  return (
    <div className="flex justify-center mt-10">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <button
              onClick={() => onClick(pagination?.prev)}
              disabled={pagination?.prev ? false : true}
              className={`${
                pagination?.prev ? "" : "cursor-not-allowed"
              } block py-[10px] px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
            >
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          {[...new Array(pagination?.totalPage)].map((value, index) => (
            <li key={index}>
              <button
                disabled={index + 1 === pagination?.page ? true : false}
                onClick={() => onClick(index + 1)}
                className={`py-2 cursor-pointer px-3 leading-tight  ${
                  index + 1 === pagination?.page
                    ? " bg-blue-700 border border-blue-600 text-white cursor-not-allowed"
                    : " bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 text-gray-500"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              disabled={pagination?.next ? false : true}
              onClick={() => onClick(pagination?.next)}
              className={`block py-[10px] px-3  ${
                pagination?.next ? "" : "cursor-not-allowed"
              } leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
            >
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavPagination;
