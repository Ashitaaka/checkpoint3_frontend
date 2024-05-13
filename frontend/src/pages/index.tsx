"use client";
import {
  NewCountryInput,
  useAddCountryMutation,
  useListContinentsQuery,
  useListCountriesQuery,
} from "@/graphql/generated/schema";
import Link from "next/link";
import React, { useState } from "react";

const index = () => {
  const [newCountry, setNewCountry] = useState<NewCountryInput>({
    name: "",
    code: "",
    emoji: "",
    continent: null,
  });

  const {
    loading: listCountriesLoading,
    error: listCountriesError,
    data: listCountries,
  } = useListCountriesQuery({ fetchPolicy: "no-cache" });

  const {
    loading: listContinentsLoading,
    error: listContinentsError,
    data: listContinents,
  } = useListContinentsQuery({ fetchPolicy: "no-cache" });

  const [addCountry, { error: addCountryError }] = useAddCountryMutation();

  if (listCountriesLoading || listContinentsLoading)
    return (
      <div className="text-xl flex justify-center items-center">
        <p>...Loading</p>
      </div>
    );

  if (listCountriesError || listContinentsError)
    return (
      <div className="text-xl flex justify-center items-center">
        <p>Error</p>
      </div>
    );

  if (addCountryError)
    return (
      <div className="text-xl flex justify-center items-center">
        <p>Erreur lors de la création du pays : {addCountryError?.message}</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      <main className="flex flex-col gap-8">
        <section className="add_country_container flex justify-center w-full">
          <form
            className="add_country_form flex gap-6 bg-slate-100 rounded-lg p-6 border border-1 flex-wrap"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("newCountry", newCountry);

              if (!newCountry.code || !newCountry.emoji || !newCountry.name)
                return;
              addCountry({
                variables: { data: newCountry },
                onCompleted: () => {
                  setNewCountry({
                    name: "",
                    code: "",
                    emoji: "",
                    continent: null,
                  });
                },
              });
            }}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Nom du pays"
                id="name"
                name="name"
                className="py-1 px-2"
                onChange={(e) =>
                  setNewCountry((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="emoji">Emoji</label>
              <input
                type="text"
                placeholder="Emoji du pays"
                id="emoji"
                name="emoji"
                className="py-1 px-2"
                onChange={(e) =>
                  setNewCountry((prevState) => ({
                    ...prevState,
                    emoji: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                placeholder="Code du pays"
                id="code"
                name="code"
                className="py-1 px-2"
                onChange={(e) =>
                  setNewCountry((prevState) => ({
                    ...prevState,
                    code: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="continent">Continent</label>
              <select
                id="continent"
                name="continent"
                className="py-1 px-2"
                onChange={(e) =>
                  setNewCountry((prevState) => ({
                    ...prevState,
                    continent: { id: +e.target.value },
                  }))
                }
              >
                {listContinents?.continents.map((cont) => (
                  <option key={cont.id} value={cont.id}>
                    {cont.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-pink-600 px-3 text-white rounded-md"
            >
              Add
            </button>
          </form>
        </section>
        <section className="countries_list flex justify-center">
          <div className="flex w-full justify-center flex-wrap gap-4">
            {listCountries &&
              listCountries.countries.map((country) => (
                <Link
                  href={`country/${country.code}`}
                  className="country_card flex flex-col items-center border border-1 rounded-md p-4 w-48"
                  key={country.name}
                >
                  <h3 className="font-normal">{country.name}</h3>
                  <p className="text-2xl">{country.emoji}</p>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default index;
