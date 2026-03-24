import React, { useEffect, useMemo, useRef, useState } from "react";
import FMGofer from "fm-gofer";
import { useQuery } from "@tanstack/react-query";

const getCustomerLabel = (customer) =>
  customer?.fieldData?.NameFull_ct || "Unnamed customer";

const getCustomerKey = (customer) =>
  customer?.fieldData?.__kp_PersonID || customer?.recordId || "";

const parseCustomerResults = (rawResult) => {
  if (!rawResult) {
    return [];
  }

  if (Array.isArray(rawResult)) {
    return rawResult;
  }

  if (typeof rawResult === "string") {
    try {
      const parsed = JSON.parse(rawResult);
      return Array.isArray(parsed)
        ? parsed
        : parsed?.response?.data || parsed?.data || [];
    } catch {
      return [];
    }
  }

  return rawResult?.response?.data || rawResult?.data || [];
};

const CustomerSelect = ({ selectedCustomer, onSelectCustomer }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const selectedLabel = getCustomerLabel(selectedCustomer);
    setQuery(selectedCustomer ? selectedLabel : "");
  }, [selectedCustomer]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { data: customers = [], isFetching } = useQuery({
    queryKey: ["customer-search", debouncedQuery],
    enabled: debouncedQuery.length > 0,
    queryFn: async () => {
      const result = await FMGofer.PerformScript("Get Customers", debouncedQuery);
      return parseCustomerResults(result);
    },
  });

  const uniqueCustomers = useMemo(() => {
    const seen = new Set();

    return customers.filter((customer) => {
      const key = getCustomerKey(customer);
      if (!key || seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
  }, [customers]);

  const hasValue = !!selectedCustomer;

  useEffect(() => {
    if (!isOpen || uniqueCustomers.length === 0) {
      setHighlightedIndex(-1);
      return;
    }

    setHighlightedIndex(0);
  }, [isOpen, uniqueCustomers]);

  const handleSelectCustomer = (customer) => {
    console.log("Selected customer:", customer);
    const name = getCustomerLabel(customer);
    onSelectCustomer(customer);
    setQuery(name);
    setIsOpen(false);
  };

  const handleInputKeyDown = (e) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (!isOpen || uniqueCustomers.length === 0) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < uniqueCustomers.length - 1 ? prev + 1 : 0
      );
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : uniqueCustomers.length - 1
      );
      return;
    }

    if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < uniqueCustomers.length) {
        e.preventDefault();
        handleSelectCustomer(uniqueCustomers[highlightedIndex]);
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      <label className="px-1 text-xs font-semibold tracking-widest uppercase text-slate-500">
        Customer
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">
          <i className="text-sm fa-regular fa-user" aria-hidden />
        </span>

        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          onChange={(e) => {
            const nextQuery = e.target.value;
            setQuery(nextQuery);
            setIsOpen(true);
            setHighlightedIndex(-1);
            if (!nextQuery.trim()) {
              onSelectCustomer(null);
            }
          }}
          placeholder="Search customer..."
          className={`w-full pl-9 pr-9 py-3 text-sm font-medium rounded-2xl border transition-all
            focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400
            ${
              hasValue
                ? "bg-green-50 border-green-300 text-green-900"
                : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
        />

        <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-slate-400">
          <i className="text-xs fa-regular fa-chevron-down" aria-hidden />
        </span>

        {isOpen && debouncedQuery.length > 0 && (
          <div className="absolute z-20 w-full mt-2 overflow-hidden bg-white border rounded-2xl border-slate-200">
            <ul className="overflow-y-auto max-h-64">
              {isFetching && (
                <li className="px-3 py-2 text-sm text-slate-500">Searching...</li>
              )}

              {!isFetching && uniqueCustomers.length === 0 && (
                <li className="px-3 py-2 text-sm text-slate-500">No customers found</li>
              )}

              {!isFetching &&
                uniqueCustomers.map((customer, itemIndex) => {
                  const customerKey = getCustomerKey(customer);
                  const name = getCustomerLabel(customer);
                  const personId = customer?.fieldData?.__kp_PersonID;
                  const isHighlighted = highlightedIndex === itemIndex;

                  return (
                    <li key={customerKey}>
                      <button
                        type="button"
                        onClick={() => handleSelectCustomer(customer)}
                        onMouseEnter={() => setHighlightedIndex(itemIndex)}
                        className={`flex items-center justify-between w-full px-3 py-2 text-left transition-colors ${
                          isHighlighted ? "bg-slate-100" : "hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-sm text-slate-800">{name}</span>
                        <span className="text-xs text-slate-400">#{personId}</span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>

      {hasValue && (
        <p className="px-1 text-xs text-slate-500">
          Person ID: {selectedCustomer?.fieldData?.__kp_PersonID}
        </p>
      )}
    </div>
  );
};

export default CustomerSelect;

