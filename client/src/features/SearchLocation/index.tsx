// src/features/SearchLocation/index.tsx

import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";

import {SearchLocationProps} from "../../types/types";
import Input from "../../components/Input";

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
  const onSubmit: SubmitHandler<IFormValues> = async (formData) => {
    console.log("submit...");
    reset();
    try {
      if (formData && formData.searchLocation.trim()) {
        await onSearch(formData.searchLocation.trim());
      }
    } catch (error) {
      console.error("No results...", error);
    }
  };

  const {register, handleSubmit, reset, formState} = useForm<IFormValues>({
    mode: "onSubmit",
  });
  return (
    <section data-testid="search-location-test" className="w-full mb-4 lg:mb-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="searchLocation"
          placeholder="Search location or postcode"
          register={register}
          formState={formState}
          icon="search"
          extraClasses="lg:w-full"
        />
      </form>
    </section>
  );
};

export default SearchLocation;
