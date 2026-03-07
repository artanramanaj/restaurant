type pagginationProps = {
  page: number;
  limit: number;
  pages: number;
  newPage: (page: number) => void;
  productLength: number;
};
const Paggination = ({
  page,
  limit,
  pages,
  newPage,
  productLength,
}: pagginationProps) => {
  console.log("check the pages number", pages);
  return (
    <div className="flex items-center gap-2">
      <button
        disabled={page === 1}
        className="bg-primary border-2 border-primary rounded-2xl px-6 p-2 text-white"
        onClick={() => newPage(page - 1)}
      >
        Previous
      </button>

      {Array.from({ length: pages }).map((u, i) => (
        <button
          className={`${page === i + 1 ? "text-primary !font-bold" : "text-black"}`}
          onClick={() => newPage(i + 1)}
          key={i}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={page === productLength}
        className="border-2 border-primary rounded-2xl p-2 px-6  text-black"
        onClick={() => newPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Paggination;
