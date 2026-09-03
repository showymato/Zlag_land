import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useState } from "react";

import { brainwave } from "../assets";
import { navigation } from "../constants";

import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";

const Header = () => {
  const { hash } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const closeNavigation = () => {
    setOpenNavigation(false);
    enablePageScroll();
  };

  return (
    <header className="fixed top-0 left-0 z-[100] w-full px-4 pt-4 lg:px-8">

      {/* HEADER */}
      <div
        className="
          relative
          mx-auto
          flex
          h-[72px]
          max-w-[1450px]
          items-center

          rounded-[18px]

          border
          border-white/10

          bg-[#0b0912]/80
          px-5

          shadow-[0_8px_40px_rgba(0,0,0,0.35)]

          backdrop-blur-xl

          lg:px-7
        "
      >

        {/* LOGO */}
        <a
          href="#hero"
          className="
            flex
            h-[150px]
            w-[170px]
            shrink-0
            items-center
          "
        >
          <img
            src={brainwave}
            alt="ZeroLag"
            className="h-full w-full object-contain"
          />
        </a>

        {/* DESKTOP NAV */}
        <nav
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2

            lg:flex
            lg:h-full
            lg:items-center
          "
        >
          <div className="flex items-center gap-8 xl:gap-11">

            {navigation.map((item) => {
              if (item.onlyMobile) return null;

              const active = item.url === hash;

              return (
                <a
                  key={item.id}
                  href={item.url}
                  className={`
                    relative
                    flex
                    h-full
                    items-center

                    whitespace-nowrap

                    font-code
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-wide

                    transition-all
                    duration-200

                    ${
                      active
                        ? "text-white"
                        : "text-white/45"
                    }

                    hover:text-white
                  `}
                >
                  {item.title}

                  {active && (
                    <span
                      className="
                        absolute
                        bottom-[14px]
                        left-1/2
                        h-[2px]
                        w-5
                        -translate-x-1/2
                        rounded-full
                        bg-gradient-to-r
                        from-cyan-300
                        via-purple-400
                        to-pink-400
                      "
                    />
                  )}
                </a>
              );
            })}

            {/* WHITEPAPER */}
            <a
              href="https://zerolag.gitbook.io/zerolag"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                h-full
                items-center

                whitespace-nowrap

                font-code
                text-[12px]
                font-semibold
                uppercase
                tracking-wide

                text-white/45
                transition-colors

                hover:text-white
              "
            >
              Whitepaper
            </a>

          </div>
        </nav>

        {/* WALLET */}
        <div className="ml-auto hidden lg:block">
          <Button
            href="#login"
            className="
              !h-[46px]
              !min-w-[165px]
              !px-6

              text-[12px]
            "
          >
            Connect Wallet
          </Button>
        </div>

        {/* MOBILE */}
        <button
          onClick={toggleNavigation}
          className="
            ml-auto
            flex
            h-[44px]
            w-[44px]
            items-center
            justify-center

            rounded-xl

            border
            border-white/10

            bg-white/5

            lg:hidden
          "
        >
          <MenuSvg openNavigation={openNavigation} />
        </button>
      </div>

      {/* MOBILE NAV */}
      {openNavigation && (
        <div
          className="
            mx-4
            mt-2
            rounded-[18px]

            border
            border-white/10

            bg-[#0b0912]/95

            p-5

            backdrop-blur-xl

            lg:hidden
          "
        >
          <div className="flex flex-col">

            {navigation.map((item) => {
              if (item.onlyMobile) return null;

              return (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={closeNavigation}
                  className="
                    border-b
                    border-white/5
                    py-4

                    font-code
                    text-sm
                    font-semibold
                    uppercase
                    text-white/60

                    last:border-0

                    hover:text-white
                  "
                >
                  {item.title}
                </a>
              );
            })}

            <a
              href="https://zerolag.gitbook.io/zerolag"
              target="_blank"
              rel="noopener noreferrer"
              className="
                border-b
                border-white/5
                py-4

                font-code
                text-sm
                font-semibold
                uppercase
                text-white/60

                hover:text-white
              "
            >
              Whitepaper
            </a>

            <div className="pt-5">
              <Button
                href="#login"
                className="w-full"
              >
                Connect Wallet
              </Button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;