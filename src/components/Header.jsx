import { appleImg, bagImg, searchImg } from '../utils'
import { navLists } from '../constants'

const Header = () => {
  return (
    <header className="w-full px-5 py-5 sm:py-10 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="Apple" width={14} height={18} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
            >
              <a href={`#${nav.toLowerCase().replace(/ /g, "-")}`}>{nav}</a>
            </div>
          ))}
        </div>
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="Search" width={10} height={10} />
          <img src={bagImg} alt="bag" width={10} height={10} />
        </div>
      </nav>
    </header>
  );
}

export default Header