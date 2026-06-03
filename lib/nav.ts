import { NAV_LINKS } from "./constants";
import type { NavLink, SiteSettings } from "./sanity/types";

export function getNavLinks(settings?: SiteSettings): NavLink[] {
  if (settings?.navLinks && settings.navLinks.length > 0) {
    return settings.navLinks;
  }
  return NAV_LINKS.map((link) => ({
    label: link.label,
    href: link.href,
  }));
}
