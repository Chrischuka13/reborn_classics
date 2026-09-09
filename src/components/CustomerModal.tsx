import React, { type ChangeEvent, useState } from "react";
import type { Customer } from "../types"



const CustomerModal: React.FC<{
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  onClose: () => void;
  onContinue: () => void;
}> = ({ customer, setCustomer, onClose, onContinue }) => {
  const [errors, setErrors] = useState<Partial<Customer>>({});

  const validateForm = () => {
    const newErrors: Partial<Customer> = {};

    if (!customer.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^0[789]\d{9}$/.test(customer.phone)) {
      newErrors.phone = "Enter a valid 11-digit phone number";
    }

    if (!customer.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onContinue();
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-6">
          Enter Order Details
        </h2>

        {/* Name */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full border p-2 rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            value={customer.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCustomer({
                ...customer,
                name: e.target.value,
              });

              setErrors({
                ...errors,
                name: undefined,
              });
            }}
          />

          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <input
            type="tel"
            placeholder="Phone Number"
            maxLength={11}
            className={`w-full border p-2 rounded ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            value={customer.phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value.replace(/\D/g, "");

              setCustomer({
                ...customer,
                phone: value,
              });

              setErrors({
                ...errors,
                phone: undefined,
              });
            }}
          />

          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Delivery Address"
            className={`w-full border p-2 rounded ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            value={customer.address}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCustomer({
                ...customer,
                address: e.target.value,
              });

              setErrors({
                ...errors,
                address: undefined,
              });
            }}
          />

          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={validateForm}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Continue
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default CustomerModal;
