import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { closeModal } from "../../redux/slices/modalSlice.js";
import { storeFormData } from "../../redux/slices/formSlice";

const schema = z.object({
  text: z
    .string()
    .nonempty("Text is required")
    .min(3, "Text should be at least 3 characters long"),
  fontOption: z.string().nonempty("Font is required"),
  textOption: z.string().nonempty("Text theme is required"),
});

export function TextForm() {
 
  const dispatch = useDispatch();
  const modal = useSelector((modal)=>modal.modalReducers.status)
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      text: "",
      fontOption: "",
      textOption:""
    },
  });
  

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    
    dispatch(storeFormData(data));
    dispatch(closeModal());
  };

  return modal ?(

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" bg-gray-100 space-y-5 w-[420px] h-[400px] p-2 flex flex-col items-center justify-center shadow-2xl border-2 border-gray-100 rounded-lg">
        {/* Text Field */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add your text</FormLabel>
              <FormControl>
                <Input placeholder="Hey, I am Narendra Modi" {...field} className=" w-80" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Font Selection */}
        <FormField
          control={form.control}
          name="fontOption"
          render={({ field }) => (
            <FormItem>
             
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[326px]">
                    <SelectValue placeholder="Choose a font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sans">Sans</SelectItem>
                    <SelectItem value="Serif">Serif</SelectItem>
                    <SelectItem value="Jaro">Jaro</SelectItem>
                    <SelectItem value="Rubik">Rubik</SelectItem>
                    <SelectItem value="Tinos">Tinos</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         {/* Font Color Selection */}
         <FormField
          control={form.control}
          name="textOption"
          render={({ field }) => (
            <FormItem>
             
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[326px]">
                    <SelectValue placeholder="Choose a text theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">black</SelectItem>
                    <SelectItem value="white">white</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        


        {/* Submit Button */}
        <div className=" flex flex-row space-x-2">
        <Button type="submit" className="w-20">Add</Button>
        <Button type="cancel" variant="destructive" onClick={()=>dispatch(closeModal())}>Cancel</Button>
        </div>
      </form>
    </Form>
  ):null;
}
