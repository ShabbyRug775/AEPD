export function Button({ onClick, children }) {
    return (
      <button
        className="bg-lime-400 px-4 py-1 rounded-md my-2 disabled:bg-lime-100"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }