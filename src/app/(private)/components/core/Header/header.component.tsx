import Image from "next/image";
import {
  mergeClassContainerLogo,
  mergeClassGreetingsUser,
  mergeClassHeader,
  mergeClassImageLogo,
  mergeClassNav,
  mergeClassUlHeader,
} from "./header.style";
import minLogoCartera from "@/assets/min-logo-cartera.png";
import GlassComponent from "../GlassComponent/glass-component.component";
import { SwitchThemeButton } from "@/components/core/SwitchThemeButton";
import { Avatar } from "../Avatar/avatar.component";

export function HeaderPrivate() {
  return (
    <header aria-label="Header da página" className={mergeClassHeader}>
      <GlassComponent>
        <nav
          aria-label="Menu de navegação"
          data-orientation="horizontal"
          dir="ltr"
          className={mergeClassNav}
        >
          <div className="relative">
            <ul
              data-orientation="horizontal"
              dir="ltr"
              className={mergeClassUlHeader}
            >
              <li
                data-orientation="horizontal"
                dir="ltr"
                className={mergeClassUlHeader}
              >
                <div>
                  <div className={mergeClassContainerLogo}>
                    <Image
                      src={minLogoCartera}
                      width={40}
                      height={40}
                      alt="Logo reduzida do sistema Cartera: uma carteira rotacionada a -12 deg."
                      className={mergeClassImageLogo}
                    />
                  </div>
                </div>
                <div className={mergeClassGreetingsUser}>
                  <span className="brightness-75">
                    Bem vindo, Caio Queiroz!{" "}
                  </span>
                  <span className="text-sm brightness-50">
                    Residential budget control
                  </span>
                </div>
              </li>
              <ul className={mergeClassUlHeader}>
                <li className="mr-6">
                  <SwitchThemeButton />
                </li>
                <li>
                  <Avatar src="https://avatars.githubusercontent.com/u/61844259?s=96&v=4" />
                </li>
              </ul>
            </ul>
          </div>
        </nav>
      </GlassComponent>
    </header>
  );
}
