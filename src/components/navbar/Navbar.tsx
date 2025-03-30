import { ModeToggle } from "../modeToggle/ModeToggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
