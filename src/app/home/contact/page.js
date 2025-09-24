"use client"
import { useState } from "react";
import ContactTable from "./Table";
import { Divider } from "antd";
import HeaderSection from "@/app/common/HeaderSection";

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("");
const importData = () => {};

  const printData = () => {};

  const props = {
    title: "Clients",
    description: "manage messages from customers",
    name: "Contact",
    isTitle: false,
    searchTerm: searchTerm,
    setSearchValue: setSearchTerm,
    searchTerm,
    placeholder: "Search Name or phone",
    type: "text",
    value: searchTerm,
    isDisplay: true,
  };
  const searchContact = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
         <HeaderSection
          props={props}
          onImport={importData}
          onPrint={printData}
          filterItem={searchContact}
         
        />
      <div>
        <ContactTable />
      </div>
    </>
  );
}