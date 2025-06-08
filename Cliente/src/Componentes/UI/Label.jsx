export function Label({ htmlFor, children }) {
    return (
      <label htmlFor={htmlFor} className="text-2xl block text-lime-950 font-bold">
        {children}
      </label>
    );
  }