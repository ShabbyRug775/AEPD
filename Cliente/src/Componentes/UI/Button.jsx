export function Button({ onClick, children }) {
    return (
      <button
        className="bg-teal-600 px-4 py-1 rounded-md my-2 disabled:bg-teal-300"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }