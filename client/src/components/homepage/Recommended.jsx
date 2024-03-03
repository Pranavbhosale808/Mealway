import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";

const prods = [
  {
    name: "Pizza Hut",
    img: "https://source.unsplash.com/327x142/?cake$1",
  },
  {
    name: "Pizza Hut",
    img: "https://source.unsplash.com/327x142/?cheese$2",
  },
  {
    name: "Pizza Hut",
    img: "https://source.unsplash.com/327x142/?noodles$3",
  },
  {
    name: "Pizza Hut",
    img: "https://source.unsplash.com/327x142/?pasta$4",
  },
  {
    name: "Pizza Hut",
    img: "https://source.unsplash.com/327x142/?chicken$5",
  },
];

function Recommended() {
  return (
    <section className=" space-y-4">
      <h2 className="text-[20px] italic text-left">Recommended For You </h2>
      {prods.map((item) => {
        return (
          <>
            <div className="space-y-2">
              <img
                src={item.img}
                alt=""
                className="rounded-lg rounded-b-none m-auto"
              />
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">Pizza Hut</h4>
                  <p className="italic w-full flex mt-1">
                    1.5 km | <FaStar className="text-yellow-500 mx-1" />{" "}
                    4.8(1.2k)
                  </p>
                </div>
                <GoHeart className="mx-4 text-xl" />
              </div>
            </div>
            <hr />
          </>
        );
      })}
    </section>
  );
}

export default Recommended;