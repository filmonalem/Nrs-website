import {
  Tag,
  Users,
  Settings,
  SquarePen,
  Database,
  StoreIcon,
  UserPlus,
} from "lucide-react";
import { MdInventory2 } from "react-icons/md";
import { MdOutlinePriceCheck } from "react-icons/md";
import { FcOrgUnit, FcSms } from "react-icons/fc";
import { TbRulerMeasure } from "react-icons/tb";
import { MdSms, MdOutlineProductionQuantityLimits } from "react-icons/md";

export function getMenuList(pathname) {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/home/dashboard",
          label: "መሳርሒ ዓለቝት",
          active: pathname.includes("/home/dashboard"),
          icon: FcOrgUnit,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "ቅንብብ",
      menus: [
        {
          href: "/home/account",
          label: "መለለይ",
          active: pathname.includes("/home/account"),
          icon: Users,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "ብዛዕባ",
      menus: [
        {
          href: "/home/products",
          label: "እቃታት",
          active: pathname.includes("/home/products"),
          icon: StoreIcon,
          submenus: [],
        },
        {
          href: "/home/unit",
          label: "መለኪያታት",
          active: pathname.includes("/home/unit"),
          icon: TbRulerMeasure,
          submenus: [],
        },
        {
          href: "/home/clients",
          label: "ናይ ዓርኪ ሰባት",
          active: pathname.includes("/home/clients"),
          icon: UserPlus,
          submenus: [],
        },
        {
          href: "/home/stock",
          label: "ዕቃ መዝገብ",
          active: pathname.includes("/inventory"),
          icon: MdInventory2,
          submenus: [
            {
              href: "/home/stock",
              label: "ዕቃ መዝገብ",
              active: pathname === "/home/stocks",
            },
            {
              href: "/home/stock/report",
              label: "ዝርዝር ወገን",
              active: pathname === "/home/stock/report",
            },
          ],
        },
        {
          href: "/home/sales",
          label: "ሽያጭ",
          active: pathname.includes("/home/sales"),
          icon: MdOutlineProductionQuantityLimits,
          submenus: [
            {
              href: "/home/sales",
              label: "ሽያጭ",
              active: pathname === "/home/sales",
            },
            {
              href: "/home/sales/report",
              label: "ዝርዝር ወገን",
              active: pathname === "/home/sales/report",
            },
          ],
        },
        {
          href: "/home/payment",
          label: "ክፍሊት",
          active: pathname.includes("/home/payment"),
          icon: MdOutlinePriceCheck,
          submenus: [
            {
              href: "/home/payment",
              label: "ክፍሊት",
              active: pathname === "/home/payment",
            },

            {
              href: "/home/payment/report",
              label: "ዝርዝር ወገን",
              active: pathname === "/home/payment/report",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "መልእኽቲ & መዝገብ",
      menus: [
        {
          href: "/home/notification",
          label: "መልእኽቲ & ምትእሳስ",
          active: pathname.includes("/home/notification"),
          icon: MdSms,
          submenus: [],
        },
        {
          href: "/home/database",
          label: "መዝገብ",
          active: pathname.includes("/home/database"),
          icon: Database,
          submenus: [],
        },
      ],
    },
  ];
}
