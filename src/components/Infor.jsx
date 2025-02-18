'use client';

const Infor = (props) => {
  return (
    <div className="container max-w-4xl mx-auto mt-10 text-center px-4">
      <h1 className="mb-6 text-3xl md:text-4xl text-white bg-red-700 py-3 capitalize">
        {props.heading}
      </h1>
      <p className="text-lg md:text-xl text-red-400 max-w-2xl mx-auto capitalize">
        {props.children}
      </p>
    </div>
  );
};

export default Infor;
