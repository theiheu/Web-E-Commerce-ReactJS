import { Skeleton } from "antd";

const BookPageSkeleton = () => {
  return (
    <div className="flex max-md:flex-col gap-4">
      <div className="w-1/4 max-md:w-full bg-white rounded-xl p-3">
        <Skeleton.Input
          active={true}
          className="!w-full !h-[250px]"
        ></Skeleton.Input>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          <Skeleton.Image active={true} style={{}} />
          <Skeleton.Image active={true} style={{}} />
        </div>
      </div>
      <div className="flex w-full max-sm:flex-col gap-4">
        <div className="w-3/4 max-md:w-2/3 max-sm:w-full">
          <div className="bg-white rounded-xl p-3">
            <Skeleton active />
          </div>
          <div className="bg-white rounded-xl p-3 mt-3">
            <Skeleton active />
          </div>
        </div>

        <div className="w-1/4  max-sm:w-full max-md:w-1/3 flex flex-col bg-white rounded-xl p-3 h-fit">
          <div className="flex flex-col flex-1 items-start">
            <Skeleton active />
          </div>

          <div className="w-full flex flex-col gap-2 mt-3">
            <Skeleton.Button
              style={{
                width: "100%",
              }}
              active
            />
            <Skeleton.Button
              style={{
                width: "100%",
              }}
              active
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPageSkeleton;
