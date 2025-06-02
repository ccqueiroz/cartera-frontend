import Image from "next/image";
import {
  mergeClassHeader,
  mergeClassImageLogo,
  mergeClassNav,
  mergeClassSigInLink,
  mergeClassUlHeader,
} from "./header.style";
import logoCartera from "@/assets/logo-cartera.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { SwitchThemeButton } from "@/components/core/SwitchThemeButton";

export const Header = () => {
  return (
    <header className={mergeClassHeader}>
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
            <li className="-mt-[10px]">
              <a href="/?">
                <Image
                  src={logoCartera}
                  width={120}
                  height={60}
                  alt="Logo do sistema Cartera: uma carteira acima do nome Cartera."
                  aria-braillelabel="Logo do sistema Cartera: uma carteira acima do nome Cartera."
                  className={mergeClassImageLogo}
                />
              </a>
            </li>
            <li>
              <ul className="flex items-stretch gap-6 pl-2">
                <li className="mr-2">
                  <SwitchThemeButton />
                </li>
                <li className="flex items-stretch gap-2 pl-4 border-l min-w-44">
                  <a className={mergeClassSigInLink}>
                    <FontAwesomeIcon
                      icon={faUser}
                      aria-braillelabel="Ícone de usuário"
                    />
                    Entrar
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
