import Link from "next/link";
import React from "react";

export type Country = {
  name: string;
  code: string;
  emoji: string;
};

const CountryCard = ({ name, code, emoji }: Country) => {
  return (
    <Link
      href={`country/${code}`}
      className="country_card flex flex-col items-center border border-1 rounded-md p-4 w-36"
    >
      <h3 className="font-normal">{name}</h3>
      <p className="text-2xl">{emoji}</p>
    </Link>
  );
};

export default CountryCard;
