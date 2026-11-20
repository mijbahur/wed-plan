import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { DeleteServiceDialog } from "./DeleteServiceDialog";
import { Button } from "../ui/button";
import { VendorService } from "@/lib/types";

type VendorServicesTableProps = {
    services: VendorService[];
};

export default function VendorServicesTable({
    services,
}: VendorServicesTableProps) {

    return (
        <>
            <div className="mt-4 flex justify-end">
                <Select defaultValue="all">
                    <SelectTrigger
                        className="h-9 min-w-36"
                        aria-label="Filter services"
                    >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        <SelectItem value="venues">Wedding Venues</SelectItem>
                        <SelectItem value="photo">Photography</SelectItem>
                        <SelectItem value="catering">Catering</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
                <Table>
                    <TableHeader className="bg-muted/40">
                        <TableRow>
                            <TableHead className="w-[46%] pl-4 text-[9px] uppercase">
                                Service
                            </TableHead>
                            <TableHead className="text-[9px] uppercase">
                                Price
                            </TableHead>
                            <TableHead className="text-[9px] uppercase">
                                Approval
                            </TableHead>
                            <TableHead className="text-[9px] uppercase">
                                Availability
                            </TableHead>
                            <TableHead className="text-[9px] uppercase">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow key={service._id} className="h-24">
                                <TableCell className="pl-4">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={service.images[0]}
                                            alt=""
                                            className="size-16 rounded-lg object-cover"
                                            width={64}
                                            height={64}
                                        />
                                        <div>
                                            <p className="text-xs font-medium text-ink">
                                                {service.serviceName}
                                            </p>
                                            <p className="mt-1 text-[9px] text-muted-foreground">
                                                {service.location}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs">
                                    {service.price}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            service.status === "approved"
                                                ? "secondary"
                                                : service.status === "pending"
                                                  ? "outline"
                                                  : "destructive"
                                        }
                                        className={
                                            service.status === "approved"
                                                ? "bg-success/10 text-success"
                                                : "bg-warning/10 text-warning"
                                        }
                                    >
                                        {service.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {service.status === "approved" ? (
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <Switch
                                                defaultChecked={
                                                    service.isActive
                                                }
                                                aria-label={`Availability for ${service.serviceName}`}
                                            />
                                            <span className="text-[9px] text-muted-foreground">
                                                {service.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-[9px] text-muted-foreground">
                                            Not published
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col items-start gap-2">
                                        <Button
                                            variant="ghost"
                                            className="h-auto p-0 text-xs font-normal text-[#80556D] hover:bg-transparent hover:text-[#479b97]"
                                        >
                                            Edit
                                        </Button>
                                        <DeleteServiceDialog
                                            service={service}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
