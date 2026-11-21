"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type FilterOption = {
    value: string;
    label: string;
};

export type FilterControl = {
    key: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
};

type FilterBarProps = {
    search: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder: string;
    filters?: FilterControl[];
};

export default function FilterBar({
    search,
    onSearchChange,
    searchPlaceholder,
    filters = [],
}: FilterBarProps) {
    return (
        <div className="flex flex-col gap-3 md:flex-row">
            <div className="min-w-0 md:flex-1">
                <Input
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder={searchPlaceholder}
                    className="h-10"
                    aria-label={searchPlaceholder}
                />
            </div>

            {filters.map((filter) => (
                <div key={filter.key} className="md:w-45">
                    <Select
                        value={filter.value}
                        onValueChange={(value) => {
                            if (value) filter.onChange(value);
                        }}
                    >
                        <SelectTrigger
                            className="h-10 w-full"
                            aria-label={filter.label}
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {filter.options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            ))}
        </div>
    );
}
