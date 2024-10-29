export function ButtonDelete({ onClick, children }) {
    return (
      <button
        className="bg-red-400 px-4 py-1 rounded-md my-2 disabled:bg-lime-100"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }