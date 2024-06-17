"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {

  let [SECRET_NUMBER, SET_SECRET_NUMBER] = useState<null | number>(null);
  let [user_input, set_user_input] = useState<number | string>('');
  let [match_secret, set_match_secret] = useState(false);

  const random_number = (min: number, max: number) => {
    if (!SECRET_NUMBER) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else return;
  }

  const confirm_guess = () => {
    console.log({ SECRET_NUMBER: Number(SECRET_NUMBER), user_input: Number(user_input) })
    if (Number(user_input) === Number(SECRET_NUMBER)) {
      set_match_secret(true);
      toast.success('Great job. You win!');
    }
    else {
      set_match_secret(false);
      toast.error('Urh. You failed!. Try again')
    }
  }

  useEffect(() => {
    const value = random_number(0, 30);
    console.log({ value });
    if (!SECRET_NUMBER) SET_SECRET_NUMBER(value as number);
  }, [SECRET_NUMBER]);

  return (<div className="my-auto">

    <h2 className="text-base font-semibold leading-7 text-gray-900">Number Gusser Game</h2>
    <p className="mt-1 text-sm leading-6 text-gray-600">Make a guess and win! You've got three trials</p>

    <form className="mt-[3em] bg-gray-300 p-2">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-full">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Number</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                onChange={(event) => { set_user_input(event.target.value) }}
                value={user_input as unknown as string} type="number" name="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Input a number" />
            </div>

            <div className="mt-3 w-full flex justify-end gap-2">
              <button onClick={confirm_guess} type="button" className="w-[fit-content] h-[fit-content] py-[0.2em] px-[3em] text-white bg-green-500 rounded-md active:scale-[0.98]">submit</button>
            </div>
          </div>
        </div>

      </div>
    </form>

  </div>)
};

export default page;