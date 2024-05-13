import {
  useCountryLazyQuery,
  useCountryQuery,
} from "@/graphql/generated/schema";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const countryDetails = () => {
  const router = useRouter();
  const {
    loading,
    error,
    data: countryData,
  } = useCountryQuery({
    variables: { code: `${router.query.countryCode}` },
  });
  console.log("countryData", countryData);

  if (loading)
    return (
      <div className="text-xl flex justify-center items-center">
        <p>...Loading</p>
      </div>
    );

  if (error)
    return (
      <div className="text-xl flex justify-center items-center">
        <p>Error</p>
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="country_card flex flex-col items-center gap-2">
        <p className="text-5xl">{countryData?.country?.emoji}</p>
        <p>
          Nom : {countryData?.country?.name} ({countryData?.country?.code})
        </p>
        {countryData?.country?.continent ? (
          <p>Continent : {countryData?.country?.continent?.name}</p>
        ) : null}
      </div>

      <Link className="py-1 px-3 bg-pink-600 rounded-sm text-white" href={"/"}>
        Retour
      </Link>
    </div>
  );
};

export default countryDetails;
