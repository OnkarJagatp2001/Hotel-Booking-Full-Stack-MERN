import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[]; 
    adultCount: number;
    childCount: number;
  };


  type Props = {
    hotel?: HotelType;
    onSave: (HotelFormData: FormData)=> void
    isLoading: boolean
  }
const ManageHotelForm = ({onSave,isLoading,hotel}:Props)=>{
    const formMethods = useForm<HotelFormData>();
    // insted of destructuring register function from useForm we are just like assigned to 
    // one variable the reasons is that we have broken douwn our form into smaller components 
    // that's why we need to use formProvider hook so that out child component can get access
    // the formMethods
    const { handleSubmit,reset } = formMethods;

    useEffect(()=>{
        reset(hotel);
    },[hotel,reset]);

    const onSubmit = handleSubmit((formDataJson:HotelFormData)=>{
        //  create new FormData object and call our API
        // console.log(formData);
        const formData = new FormData();
        if (hotel) {
          formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString()); 
        formDataJson.facilities.forEach((facility,index)=>{
            formData.append(`facilities[${index}]`,facility);  
        })

        // [img1.jpg, img2.jpg, img3.jpg] if we remove 2nd and 3rd
        // send most updated list to the backend
        // imageUrls = [img1.jpg]
        if(formDataJson.imageUrls){
            formDataJson.imageUrls.forEach((url,index)=>{
                formData.append(`imageUrls[${index}]`,url)
            })
        }
        Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`,imageFile);
        })

        onSave(formData);
    });
    return(
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection/>
                <TypeSection/>
                <FacilitiesSection/>
                <GuestsSection/>
                <ImagesSection/>
                <span className="flex justify-end ">
                    <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded disabled:bg-gray-500">
                        {isLoading? "Saving...":"Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}
export default ManageHotelForm;