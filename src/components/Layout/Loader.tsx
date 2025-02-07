import React from "react";

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900">
      <div className="h-20 w-20 border p-10 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
