import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";

import services from "services";

function DomainSearch(props) {
  let navigator = useNavigate();
  let onBeforeSubmit = props.onBeforeSubmit;
  let textInput = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onBeforeSubmit) onBeforeSubmit();
    let domain = textInput.current.value.toLowerCase();
    textInput.current.value = "";
    const domainSplit = domain.split(".");
    if (domainSplit.length === 1) {
      domain = domain + ".eth";
    }
    console.log("here:"+domain)
    services.linking.navigate(navigator, "Domain", { domain });
  };
  const renderStaticImage = (path, alt) => {
    const src = services.linking.static(path);
    return <img src={src} alt={alt} className="w-full" />;
  };

  return (
    <>
      {props.modal && (
        <div
          className="text-xl md:text-xl font-bold leading-tighter tracking-tighter mb-4 text-left"
          data-aos="zoom-y-out"
        >
          {"Search Ethereum Domain names"}
        </div>
      )}
      <div className="bg-gray-100 rounded-xl w-full text-center relative dark:bg-gray-800 animated_border">
        <form onSubmit={handleSubmit}>
          <input
            autoComplete="off"
            ref={textInput}
            autoCapitalize="off"
            placeholder={props.placeholder || "Search wrapped domain names"}
            id="search_input"
            className="w-full placeholder:text-gray-400 text-black dark:text-gray-300 rounded-lg text-center p-4"
          />
        </form>
        <div
          className="absolute right-0 top-0 h-full flex items-center justify-center mr-4 cursor-pointer"
          onClick={handleSubmit}
        >
          <SearchIcon className="w-6 text-gray-300" />
        </div>
      </div>
    </>
  );
}

export default DomainSearch;
