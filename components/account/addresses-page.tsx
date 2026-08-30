"use client";

import {
  Check,
  Edit3,
  MapPin,
  Plus,
  Star,
  Trash2,
} from "lucide-react";

import {
  useState,
} from "react";

import AccountShell from "./account-shell";
import AddressModal from "./address-modal";

import {
  mockAddresses,
  type CustomerAddress,
} from "@/lib/account-data";

type AddressForm = Omit<
  CustomerAddress,
  "id"
>;

export default function AddressesPage() {
  const [addresses, setAddresses] =
    useState<CustomerAddress[]>(
      mockAddresses
    );

  const [modalOpen, setModalOpen] =
    useState(false);

  const [
    editingAddress,
    setEditingAddress,
  ] =
    useState<CustomerAddress | null>(
      null
    );

  function openAdd() {
    setEditingAddress(null);
    setModalOpen(true);
  }

  function openEdit(
    address: CustomerAddress
  ) {
    setEditingAddress(address);
    setModalOpen(true);
  }

  function saveAddress(
    values: AddressForm
  ) {
    if (editingAddress) {
      setAddresses((current) => {
        let updated = current.map(
          (address) =>
            address.id ===
            editingAddress.id
              ? {
                  ...address,
                  ...values,
                }
              : address
        );

        if (values.isDefault) {
          updated = updated.map(
            (address) => ({
              ...address,

              isDefault:
                address.id ===
                editingAddress.id,
            })
          );
        }

        return updated;
      });
    } else {
      setAddresses((current) => {
        const nextId =
          current.length > 0
            ? Math.max(
                ...current.map(
                  (item) =>
                    item.id
                )
              ) + 1
            : 1;

        const newAddress: CustomerAddress =
          {
            id: nextId,
            ...values,
          };

        if (values.isDefault) {
          return [
            ...current.map(
              (address) => ({
                ...address,
                isDefault: false,
              })
            ),
            newAddress,
          ];
        }

        return [
          ...current,
          newAddress,
        ];
      });
    }

    setModalOpen(false);
    setEditingAddress(null);
  }

  function removeAddress(
    id: number
  ) {
    setAddresses((current) =>
      current.filter(
        (address) =>
          address.id !== id
      )
    );
  }

  function setDefault(
    id: number
  ) {
    setAddresses((current) =>
      current.map((address) => ({
        ...address,

        isDefault:
          address.id === id,
      }))
    );
  }

  return (
    <AccountShell title="My Addresses">
      <div>
        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#B88734]">
              Delivery Details
            </p>

            <h2 className="mt-2 font-serif text-[28px]">
              Saved Addresses
            </h2>

            <p className="mt-2 text-[10px] text-[#071426]/45">
              Manage addresses used
              during checkout.
            </p>
          </div>

          <button
            type="button"
            onClick={openAdd}
            className="flex min-h-[48px] items-center justify-center gap-2 bg-[#C7A05A] px-6 text-[9px] font-bold uppercase tracking-[0.13em] text-[#071426] transition-colors hover:bg-[#D7B772]"
          >
            <Plus size={15} />

            Add New Address
          </button>
        </div>

        {/* ADDRESS GRID */}

        {addresses.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {addresses.map(
              (address) => (
                <article
                  key={address.id}
                  className={`relative overflow-hidden border bg-white p-6 transition-all ${
                    address.isDefault
                      ? "border-[#C7A05A] shadow-[0_12px_35px_rgba(199,160,90,.10)]"
                      : "border-[#C7A05A]/20 hover:border-[#C7A05A]/55"
                  }`}
                >
                  {address.isDefault && (
                    <div className="absolute right-0 top-0 bg-[#C7A05A] px-4 py-2 text-[7px] font-bold uppercase tracking-[0.13em] text-[#071426]">
                      Default
                    </div>
                  )}

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E9D6] text-[#B88734]">
                    <MapPin
                      size={18}
                      fill="currentColor"
                    />
                  </div>

                  <h3 className="mt-4 font-serif text-[22px] text-[#071426]">
                    {address.label}
                  </h3>

                  <p className="mt-3 text-[11px] font-semibold">
                    {
                      address.firstName
                    }{" "}
                    {
                      address.lastName
                    }
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-[#071426]/50">
                    {address.street}

                    {address.unit && (
                      <>
                        <br />
                        {address.unit}
                      </>
                    )}

                    <br />

                    {address.area}

                    <br />

                    {
                      address.emirate
                    }
                    , UAE

                    {address.landmark && (
                      <>
                        <br />
                        {
                          address.landmark
                        }
                      </>
                    )}
                  </p>

                  <p className="mt-3 text-[10px] text-[#071426]/50">
                    {address.phone}
                  </p>

                  {/* ACTIONS */}

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-[#071426]/8 pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        openEdit(
                          address
                        )
                      }
                      className="flex min-h-[38px] items-center gap-2 border border-[#071426]/12 bg-white px-4 text-[8px] font-semibold uppercase tracking-[0.11em] text-[#071426] transition-all hover:border-[#C7A05A] hover:text-[#B88734]"
                    >
                      <Edit3
                        size={12}
                      />

                      Edit
                    </button>

                    {!address.isDefault && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setDefault(
                              address.id
                            )
                          }
                          className="flex min-h-[38px] items-center gap-2 border border-[#C7A05A]/35 bg-[#FAF7F1] px-4 text-[8px] font-semibold uppercase tracking-[0.11em] text-[#B88734]"
                        >
                          <Star
                            size={12}
                          />

                          Set Default
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            removeAddress(
                              address.id
                            )
                          }
                          className="flex min-h-[38px] items-center gap-2 border border-[#A94E4E]/20 bg-white px-4 text-[8px] font-semibold uppercase tracking-[0.11em] text-[#A94E4E] transition-colors hover:bg-[#FFF7F7]"
                        >
                          <Trash2
                            size={12}
                          />

                          Remove
                        </button>
                      </>
                    )}

                    {address.isDefault && (
                      <span className="ml-auto flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#B88734]">
                        <Check
                          size={12}
                        />

                        Default Address
                      </span>
                    )}
                  </div>
                </article>
              )
            )}
          </div>
        ) : (
          <div className="border border-[#C7A05A]/20 bg-white px-5 py-20 text-center">
            <MapPin
              size={34}
              className="mx-auto text-[#B88734]"
            />

            <h2 className="mt-5 font-serif text-[29px]">
              No saved addresses
            </h2>

            <p className="mx-auto mt-3 max-w-[360px] text-[10px] leading-5 text-[#071426]/45">
              Add your first
              delivery address for a
              faster checkout.
            </p>

            <button
              type="button"
              onClick={openAdd}
              className="mt-6 inline-flex min-h-[50px] items-center gap-2 bg-[#C7A05A] px-7 text-[9px] font-bold uppercase tracking-[0.13em] text-[#071426]"
            >
              <Plus size={14} />

              Add Address
            </button>
          </div>
        )}
      </div>

      <AddressModal
        open={modalOpen}
        address={editingAddress}
        onClose={() => {
          setModalOpen(false);

          setEditingAddress(
            null
          );
        }}
        onSave={saveAddress}
      />
    </AccountShell>
  );
}