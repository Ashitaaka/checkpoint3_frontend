"use client";
import {
  ListCountriesDocument,
  NewCountryInput,
  useAddCountryMutation,
  useListContinentsQuery,
  useListCountriesQuery,
} from "@/graphql/generated/schema";
import Link from "next/link";
import React, { useState } from "react";

const index = () => {
  const initialState = {
    name: "",
    code: "",
    emoji: "",
    continent: null,
  };
  const [newCountry, setNewCountry] = useState<NewCountryInput>(initialState);

  const {
    data: listCountries,
    loading: listCountriesLoading,
    error: listCountriesError,
  } = useListCountriesQuery({ fetchPolicy: "network-only" });

  const {
    loading: listContinentsLoading,
    error: listContinentsError,
    data: listContinents,
  } = useListContinentsQuery({ fetchPolicy: "no-cache" });

  const [addCountry, { error: addCountryError }] = useAddCountryMutation({
    refetchQueries: [{ query: ListCountriesDocument }],
  });

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
        <section className="add_country_container w-full flex justify-center items-end p-6 lg:p-2">
          <form
            className="add_country_form lg:w-fit w-full flex flex-col gap-4 bg-slate-100 rounded-lg p-6 border border-1 lg:flex-row lg:flex-wrap justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              if (!newCountry.code || !newCountry.emoji || !newCountry.name)
                return;

              addCountry({
                variables: { data: newCountry },
                onCompleted: () => {
                  setNewCountry(initialState);
                },
              });
            }}
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="name">Name</label>
                <input
                  value={newCountry.name}
                  type="text"
                  placeholder="Nom du pays"
                  id="name"
                  name="name"
                  className="py-2 px-3 h-full rounded-sm"
                  onChange={(e) =>
                    setNewCountry((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="emoji">Emoji</label>
                <input
                  value={newCountry.emoji}
                  type="text"
                  placeholder="Emoji du pays"
                  id="emoji"
                  name="emoji"
                  className="py-2 px-3 h-full rounded-sm"
                  onChange={(e) =>
                    setNewCountry((prevState) => ({
                      ...prevState,
                      emoji: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="code">Code</label>
                <input
                  value={newCountry.code}
                  type="text"
                  placeholder="Code du pays"
                  id="code"
                  name="code"
                  className="py-2 px-3 h-full rounded-sm"
                  onChange={(e) =>
                    setNewCountry((prevState) => ({
                      ...prevState,
                      code: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="continent">Continent</label>
                <select
                  defaultValue=""
                  id="continent"
                  name="continent"
                  className="py-2 px-3 h-full rounded-sm"
                  onChange={(e) =>
                    setNewCountry((prevState) => ({
                      ...prevState,
                      continent: { id: +e.target.value },
                    }))
                  }
                >
                  <option key="initial_value" value="" disabled hidden>
                    Choisissez un continent
                  </option>
                  {listContinents?.continents.map((cont) => (
                    <option key={cont.id} value={cont.id}>
                      {cont.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="bg-pink-600 p-3 text-white rounded-md"
            >
              Add
            </button>
          </form>
        </section>
        <section className="countries_list flex justify-center lg:p-2">
          <div className="flex w-full justify-center flex-wrap gap-4">
            {listCountries &&
              listCountries.countries.map((country) => (
                <Link
                  href={`country/${country.code}`}
                  className="country_card flex flex-col items-center border border-1 rounded-md p-4 w-36"
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
