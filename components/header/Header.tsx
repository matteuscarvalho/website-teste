import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import type { Product, Suggestion } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import Layout from "$store/components/LandingPage/Layout.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: ImageWidget;
    alt?: string;
  };
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: Product[] | null;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: Suggestion | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
  irParaOSite: string;
}

function Header({
  alerts,
  searchbar: _searchbar,
  products,
  navItems = [],
  suggestions,
  logo,
  irParaOSite,
}: Props) {
  const platform = usePlatform();
  const searchbar = { ..._searchbar, products, suggestions };

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items: navItems, irParaOSite }}
          searchbar={searchbar}
          platform={platform}
          irParaOSite={irParaOSite}
        >
          <div class="bg-base-100 fixed w-full z-50">
            <Alert alerts={alerts} />
            <Navbar
              items={navItems}
              searchbar={searchbar}
              logo={logo}
              irParaOSite={irParaOSite}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
