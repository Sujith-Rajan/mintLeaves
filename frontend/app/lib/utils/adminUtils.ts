import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
  } from "react-icons/md";

 export const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon:MdDashboard,
        },
        {
          title: "Users",
          path: "/dashboard/users",
          icon:MdSupervisedUserCircle,
        },
        {
          title: "Products",
          path: "/dashboard/products",
          icon:MdShoppingBag,
        },
        {
          title: "Transactions",
          path: "/dashboard/transactions",
          icon:MdAttachMoney,
        },
      ],
    },
    {
      title: "Analytics",
      list: [
        {
          title: "Revenue",
          path: "/dashboard/revenue",
          icon:MdWork,
        },
        {
          title: "Reports",
          path: "/dashboard/reports",
          icon:MdAnalytics,
        },
        {
          title: "Teams",
          path: "/dashboard/teams",
          icon:MdPeople,
        },
      ],
    },
    {
      title: "User",
      list: [
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon:MdOutlineSettings,
        },
        {
          title: "Help",
          path: "/dashboard/help",
          icon:MdHelpCenter,
        },
      ],
    },
  ];

  export const cards = [
    {
      id: 1,
      title: "Total Users",
      number: 10.928,
      change: 12,
    },
    {
      id: 2,
      title: "Stock",
      number: 8.236,
      change: -2,
    },
    {
      id: 3,
      title: "Revenue",
      number: 6.642,
      change: 18,
    },
  ]; 
 

  