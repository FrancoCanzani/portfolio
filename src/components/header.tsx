import { ToggleMode } from "./toggleMode";
import SwitchLanguage from "./switchLanguage";
import { Link } from "@/navigation";

export default function Header() {
  return (
    <header className="mb-10 inline-flex justify-between w-full px-4">
      <Link
        href={"/"}
        className="hover:bg-gray-50 max-w-fit uppercase flex flex-col dark:hover:bg-[#313131] active:bg-gray-300 dark:active:bg-[#242424] rounded-sm p-2 font-semibold font-sans leading-5"
      >
        <div className="flex items-center justify-start gap-x-1">
          Franco <span className="block w-4 h-[1.6px] bg-black"> </span>
        </div>
        <span className="ml-4">Canzani</span>
      </Link>

      <div className="flex items-center justify-center gap-x-2">
        <SwitchLanguage />
        <ToggleMode />
      </div>
    </header>
  );
}
