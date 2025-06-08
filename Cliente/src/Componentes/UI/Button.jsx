export function Button({ onClick, children }) {
    return (
      <button
        className="font-bold bg-lime-400 p-4 rounded-full text-2xl my-2 disabled:bg-lime-100 hover:bg-lime-700 hover:text-lime-100"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }