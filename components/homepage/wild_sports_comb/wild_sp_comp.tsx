import Wildlife from "./wildlife";
import Sports from "./sports";

const Wild_sp_comp = () => {
  return (
    <main className="w-full min-h-screen mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-8">
      <Wildlife />
      <Sports />
    </main>
  );
};

export default Wild_sp_comp;
