"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const CLOSENESS_RANGE = 5;
  let [TRIALS, SET_TRIALS] = useState(3);
  let [SECRET_NUMBER, SET_SECRET_NUMBER] = useState<null | number>(null);
  let [user_input, set_user_input] = useState<number | string>('');

  const random_number = (min: number, max: number) => {
    if (!SECRET_NUMBER) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else return;
  }

  const guess_number_close = (target: number, num: number, closeness_range: number) => {
    return Math.abs(target - num) <= closeness_range;
  }

  const confirm_guess = () => {
    const trials_left = TRIALS - 1;
    SET_TRIALS(trials_left);
    if (TRIALS >= 1) {
      if (Number(user_input) === Number(SECRET_NUMBER)) {
        toast.success('Great job. You win!');
      }
      else {
        if (guess_number_close(SECRET_NUMBER as number, user_input as number, CLOSENESS_RANGE)) {
          toast.info('Almost there.');
        }
        else {
          toast.error('Urh. You failed!. Try again')
        }
      }
    } else {
      toast.error("You've got no more trials! Refresh and trial.");
    }

    set_user_input('');
  }

  useEffect(() => {
    const value = random_number(0, 30);
    if (!SECRET_NUMBER) SET_SECRET_NUMBER(value as number);
  }, [SECRET_NUMBER]);

  return (<div className="my-auto">

    <h2 className="text-base font-semibold leading-7 text-gray-900">Number Guesser Game</h2>
    <p className="mt-1 text-sm leading-6 text-gray-600">Make a guess and win! You've got three trials</p>

    <form className="mt-[3em] bg-gray-300 p-2">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-full">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Number</label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input disabled={TRIALS <= 0}
                onChange={(event) => { set_user_input(event.target.value) }}
                value={user_input as unknown as string} type="number" name="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Input a number" />
            </div>

            <div className="mt-3 w-full flex justify-end gap-2">
              <button disabled={TRIALS <= 0} onClick={confirm_guess} type="button" className={`w-[fit-content] h-[fit-content] py-[0.2em] px-[3em] text-white bg-green-500 rounded-md active:scale-[0.98] ${TRIALS <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>submit</button>
            </div>
          </div>
        </div>

      </div>
    </form>

  </div>)
};

export default page;