import React, { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import Paypal from "./PayPal";

const Payment = forwardRef(function ({ checkout, setCheckOut }, ref) {
  return (
    <>
      <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
        <div className="text-center">
          <img className="mx-auto w-48" src="/logo.png" alt="logo" />
          <h4 className="mb-12 mt-1 pb-1 text-xl text-white font-semibold">
            FitOn
          </h4>
        </div>
        <div class="mx-auto max-w-7xl px-6 lg:px-8 ">
          <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div class="p-8 sm:p-10 lg:flex-auto">
              <h3 class="text-2xl font-bold tracking-tight text-white font-normal">Lifetime membership</h3>
              <p class="mt-6 text-base leading-7 text-custom-whitish">Don't miss out on the enhanced functionality and exclusive features of our application. Make a payment today and unlock it all!</p>
              <div class="mt-10 flex items-center gap-x-4">
                <h4 class="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                <div class="h-px flex-auto bg-gray-100"></div>
              </div>
              <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-custom-whitish sm:grid-cols-2 sm:gap-6">
                <li class="flex gap-x-3">
                  <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                  </svg>
                  Private forum access
                </li>
                <li class="flex gap-x-3">
                  <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                  </svg>
                  Member resources
                </li>
                <li class="flex gap-x-3">
                  <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                  </svg>
                  Entry to annual conference
                </li>
                <li class="flex gap-x-3">
                  <svg class="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                  </svg>
                  Official member t-shirt
                </li>
              </ul>
              <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div class="rounded-2xl border-2 border-yellow-500 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div class="mx-auto max-w-xs px-8">
                    <p class="text-base font-semibold text-white">Pay once, own it forever</p>
                    <p class="mt-6 flex items-baseline justify-center gap-x-2">
                      <span class="text-5xl font-bold tracking-tight text-white font-normal">$1000</span>
                      <span class="text-sm font-semibold leading-6 tracking-wide text-white">USD</span>
                    </p>
                    { checkout ? (
                      <div ref={ ref }></div>
                    ) : (
                      <a
                        href="#"
                        className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={ () => {
                          setCheckOut(true);
                        } }
                      >
                        Proceed to payment
                      </a>
                    ) }
                    <p class="mt-6 text-xs leading-5 text-white">Invoices and receipts available</p>
                  </div>
                </div>
              </div>
              <p className="mt-10 text-center text-sm text-custom-slate">
                Already registered ?{ " " }
                <Link
                  to="/"
                  className="font-medium leading-6 text-custom-yellow font-normal hover:text-indigo-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
})

export default Payment;