import { NextPage } from "next";

const Unsubscribe: NextPage = () => {
  return (
    <>
      <div>
        <div className="w-full h-full">
          <main className="max-w-3xl mx-auto pt-20 sm:pt-24 lg:pt-32">
            <div className="grid grid-cols-3 gap-3">
              <h1 className="col-span-3 text-4xl sm:text-7xl 2xl:text-8xl m-0">
                Unsubscribe
              </h1>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;
