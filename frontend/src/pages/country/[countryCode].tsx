import {
  useCountryLazyQuery,
  useCountryQuery,
} from "@/graphql/generated/schema";
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
    <div className="country_card w-full flex flex-col justify-center items-center gap-2">
      <p className="text-5xl">{countryData?.country?.emoji}</p>
      <p>
        Nom : {countryData?.country?.name} ({countryData?.country?.code})
      </p>
      {countryData?.country?.continent ? (
        <p>Continent : {countryData?.country?.continent?.name}</p>
      ) : null}
    </div>
  );
};

export default countryDetails;
