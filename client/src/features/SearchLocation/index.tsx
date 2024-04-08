// src/features/SearchLocation/index.tsx

import React from "react";
import {SearchLocationProps} from "../../types/types";
import Input from "../../components/Input";
import {useForm, SubmitHandler} from "react-hook-form";

/**
 * SearchLocation component.
 *
 * @param {SearchLocationProps} props - Props for the component.
 * @returns {JSX.Element} A React element.
 */

interface IFormValues {
  searchLocation: string;
}

const SearchLocation: React.FC<SearchLocationProps> = ({onSearch}) => {
  const onSubmit: SubmitHandler<IFormValues> = (formData) => {
    reset();
    if (formData && formData.searchLocation) {
      const {searchLocation} = formData;
      if (searchLocation.trim() !== "") {
        onSearch(searchLocation.trim());
      }
    }
  };

  const {register, handleSubmit, reset} = useForm<IFormValues>({
    mode: "onSubmit",
  });
  return (
    <section data-testid="search-location-test" className="w-full mb-4 lg:mb-0">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <Input
          name="searchLocation"
          placeholder="Search location or postcode"
          register={register}
          icon="search"
        />
      </form>
    </section>
  );
};

export default SearchLocation;
