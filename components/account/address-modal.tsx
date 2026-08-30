"use client";

import {
  Check,
  MapPin,
  Save,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type {
  CustomerAddress,
} from "@/lib/account-data";

type AddressForm = Omit<
  CustomerAddress,
  "id"
>;

const emptyAddress: AddressForm = {
  label: "Home",

  firstName: "",
  lastName: "",

  phone: "",

  emirate: "Abu Dhabi",
  area: "",

  street: "",
  unit: "",
  landmark: "",

  isDefault: false,
};

const emirates = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

const addressLabels = [
  "Home",
  "Office",
];

export default function AddressModal({
  open,
  address,
  onClose,
  onSave,
}: {
  open: boolean;
  address: CustomerAddress | null;
  onClose: () => void;
  onSave: (
    address: AddressForm
  ) => void;
}) {
  const [form, setForm] =
    useState<AddressForm>(
      emptyAddress
    );

  useEffect(() => {
    if (!open) return;

    const formTimer = window.setTimeout(() => {
      if (address) {
        setForm({
        ...address,

        // keep only supported labels
        label:
          address.label ===
          "Office"
            ? "Office"
            : "Home",
        });
      } else {
        setForm({ ...emptyAddress });
      }
    }, 0);

    return () => window.clearTimeout(formTimer);
  }, [address, open]);

  if (!open) return null;

  function update(
    key: keyof AddressForm,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    onSave(form);
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#071426]/55 px-4 py-6 backdrop-blur-[3px] sm:py-8">
      <div className="mx-auto w-full max-w-[760px] overflow-hidden bg-white shadow-[0_30px_90px_rgba(0,0,0,.18)]">
        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-[#071426]/10 bg-[#FAF7F1] px-5 py-5 sm:px-7">
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C7A05A] text-[#071426]">
              <MapPin
                size={18}
                strokeWidth={1.7}
              />
            </span>

            <div className="min-w-0">
              <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#B88734]">
                Delivery Address
              </p>

              <h2 className="mt-1 font-serif text-[24px] text-[#071426] sm:text-[27px]">
                {address
                  ? "Edit Address"
                  : "Add Address"}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close address form"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#071426]/50 transition-colors hover:bg-white hover:text-[#071426]"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* FIRST NAME */}

            <AddressField
              label="First Name"
              value={form.firstName}
              onChange={(value) =>
                update(
                  "firstName",
                  value
                )
              }
              placeholder="First name"
              autoComplete="given-name"
              required
            />

            {/* LAST NAME */}

            <AddressField
              label="Last Name"
              value={form.lastName}
              onChange={(value) =>
                update(
                  "lastName",
                  value
                )
              }
              placeholder="Last name"
              autoComplete="family-name"
              required
            />

            {/* MOBILE */}

            <div className="sm:col-span-2">
              <AddressField
                label="Mobile Number"
                value={form.phone}
                onChange={(value) =>
                  update(
                    "phone",
                    value
                  )
                }
                placeholder="+971 50 123 4567"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
              />
            </div>

            {/* COUNTRY */}

            <div className="sm:col-span-2">
              <AddressSelect
                label="Country"
                value="United Arab Emirates"
                options={[
                  "United Arab Emirates",
                ]}
                onChange={() => {}}
                disabled
              />
            </div>

            {/* EMIRATE */}

            <AddressSelect
              label="Emirate"
              value={form.emirate}
              options={emirates}
              onChange={(value) =>
                update(
                  "emirate",
                  value
                )
              }
              required
            />

            {/* AREA */}

            <AddressField
              label="Area"
              value={form.area}
              onChange={(value) =>
                update(
                  "area",
                  value
                )
              }
              placeholder="Area / neighbourhood"
              autoComplete="address-level2"
              required
            />

            {/* STREET / BUILDING */}

            <div className="sm:col-span-2">
              <AddressField
                label="Street / Building"
                value={form.street}
                onChange={(value) =>
                  update(
                    "street",
                    value
                  )
                }
                placeholder="Street name, building or villa"
                autoComplete="address-line1"
                required
              />
            </div>

            {/* APARTMENT / VILLA */}

            <AddressField
              label="Apartment / Villa"
              value={
                form.unit ?? ""
              }
              onChange={(value) =>
                update(
                  "unit",
                  value
                )
              }
              placeholder="Apartment or villa number"
              autoComplete="address-line2"
            />

            {/* LANDMARK */}

            <AddressField
              label="Landmark"
              value={
                form.landmark ?? ""
              }
              onChange={(value) =>
                update(
                  "landmark",
                  value
                )
              }
              placeholder="Nearby landmark"
            />

            {/* SAVE ADDRESS AS */}

            <div className="sm:col-span-2">
              <AddressSelect
                label="Save Address As"
                value={form.label}
                options={
                  addressLabels
                }
                onChange={(value) =>
                  update(
                    "label",
                    value
                  )
                }
                required
              />
            </div>
          </div>

          {/* DEFAULT ADDRESS */}

          <label className="mt-6 flex cursor-pointer items-start gap-3 border border-[#071426]/10 bg-[#FAF7F1] p-4 transition-colors hover:border-[#C7A05A]/40">
            <span
              className={`mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${
                form.isDefault
                  ? "border-[#C7A05A] bg-[#C7A05A] text-[#071426]"
                  : "border-[#071426]/25 bg-white"
              }`}
            >
              {form.isDefault && (
                <Check
                  size={12}
                  strokeWidth={2}
                />
              )}
            </span>

            <input
              type="checkbox"
              checked={
                form.isDefault
              }
              onChange={(event) =>
                update(
                  "isDefault",
                  event.target.checked
                )
              }
              className="sr-only"
            />

            <div>
              <p className="text-[10px] font-semibold text-[#071426]">
                Make this my default
                address
              </p>

              <p className="mt-1 text-[9px] leading-4 text-[#071426]/45">
                This address will be
                selected automatically
                during checkout.
              </p>
            </div>
          </label>

          {/* ACTION BUTTONS */}

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              className="
                flex h-[54px] w-full
                items-center justify-center
                border border-[#071426]/15
                bg-white
                px-6
                text-[9px] font-semibold uppercase
                tracking-[0.14em]
                text-[#071426]
                transition-all duration-300
                hover:border-[#C7A05A]
                hover:bg-[#FAF7F1]
                hover:text-[#B88734]
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                flex h-[54px] w-full
                items-center justify-center
                gap-2
                border border-[#C7A05A]
                bg-[#C7A05A]
                px-6
                text-[9px] font-bold uppercase
                tracking-[0.14em]
                text-[#071426]
                transition-colors duration-300
                hover:border-[#D7B772]
                hover:bg-[#D7B772]
              "
            >
              <Save
                size={14}
                strokeWidth={1.7}
              />

              {address
                ? "Update Address"
                : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function AddressField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  inputMode?:
    | "text"
    | "tel"
    | "numeric"
    | "decimal"
    | "email"
    | "url"
    | "search"
    | "none";
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#071426]/55">
        {label}

        {required && (
          <span className="ml-1 text-[#B88734]">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        required={required}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="
          h-[54px] w-full
          border border-[#071426]/15
          bg-white
          px-4
          text-[12px]
          text-[#071426]
          outline-none
          transition-colors
          placeholder:text-[#071426]/25
          focus:border-[#C7A05A]
        "
      />
    </label>
  );
}

/* =========================================================
   SELECT
========================================================= */

function AddressSelect({
  label,
  value,
  options,
  onChange,
  required = false,
  disabled = false,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (
    value: string
  ) => void;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#071426]/55">
        {label}

        {required && (
          <span className="ml-1 text-[#B88734]">
            *
          </span>
        )}
      </span>

      <div className="relative">
        <select
          value={value}
          required={required}
          disabled={disabled}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className={`
            h-[54px] w-full
            appearance-none
            border border-[#071426]/15
            bg-white
            px-4 pr-11
            text-[12px]
            text-[#071426]
            outline-none
            transition-colors
            focus:border-[#C7A05A]
            ${
              disabled
                ? "cursor-not-allowed bg-[#F8F6F1] text-[#071426]/55"
                : "cursor-pointer"
            }
          `}
        >
          {options.map(
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            )
          )}
        </select>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#B88734]"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </label>
  );
}
