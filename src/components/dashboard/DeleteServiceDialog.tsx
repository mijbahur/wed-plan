"use client";
import { Trash2Icon } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteService } from "@/lib/api/service";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { VendorService } from "@/lib/types";

export function DeleteServiceDialog({ service }: { service: VendorService }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const response = await deleteService(service._id);
            console.log("deleteService response", response);
            if(response.success) {
                toast.success("Service deleted successfully");
                setOpen(false);
                router.refresh();
            }
            if (!response.success) {
                toast.error("Failed to delete service");
                throw new Error("Failed to delete service");
            }
        } catch (error) {
            console.error("Error deleting service:", error);
            toast.error("An error occurred while deleting the service");
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={<Button variant="ghost" className="h-auto p-0 text-xs font-normal text-[#B94E43] hover:bg-transparent hover:text-[#fd1900]">Delete</Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>
                        Delete {service.serviceName}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete {service.serviceName}? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleDelete}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
