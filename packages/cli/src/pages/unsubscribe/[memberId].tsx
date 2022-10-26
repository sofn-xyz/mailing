import { NextPage } from "next";
import SubmitButton from "../../components/SubmitButton";

const Unsubscribe: NextPage = () => {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit form");
  }

  return (
    <>
      <div>
        <div className="w-full h-full">
          <main className="max-w-3xl mx-auto pt-20 sm:pt-24 lg:pt-32">
            <form className="grid grid-cols-3 gap-3" onSubmit={onSubmit}>
              <h1 className="col-span-3 text-4xl sm:text-7xl 2xl:text-8xl m-0">
                Unsubscribe
              </h1>

              <div className="col-span-3">
                <h2>Lists</h2>
                <ul>
                  <li>
                    <input type="checkbox" />
                    <label>List name 1</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>List name 2</label>
                  </li>
                </ul>

                <h2>Unsubscribe from all</h2>
                <input type="checkbox" />
                <label>Unsubscribe from all</label>

                <div>
                  <SubmitButton>Submit</SubmitButton>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;
