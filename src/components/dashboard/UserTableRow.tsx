import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Role, User } from "@/lib/types";

const UserTableRow = ({
    user,
    currentUserId,
    onRoleChange,
    onStatusChange,
}: {
    user: User;
    currentUserId?: string;
    onRoleChange?: (user: User, userRole: Role) => void;
    onStatusChange?: (user: User, isBlocked: boolean) => void;
}) => {
    function formatDate(value?: string | Date) {
        if (!value) return "—";
        const date = value instanceof Date ? value : new Date(value);
        if (Number.isNaN(date.getTime())) return "—";
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }

    const isCurrentUser = user.id === currentUserId;
    const isBlocked = Boolean(user.isBlocked);
    return (
        <TableRow key={user.id} className="h-20">
            <TableCell className="pl-5">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                    {user.email}
                </p>
            </TableCell>
            <TableCell>
                <Select
                    value={user.userRole}
                    disabled={isCurrentUser}
                    onValueChange={(value) =>
                        onRoleChange?.(user, value as Role)
                    }
                >
                    <SelectTrigger
                        className="h-8 w-28"
                        aria-label={`Change userRole for ${user.name}`}
                    >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
            </TableCell>
            <TableCell className="text-xs text-muted-foreground">
                {formatDate(user.createdAt)}
            </TableCell>
            <TableCell>
                <Badge
                    variant={isBlocked ? "destructive" : "secondary"}
                    className={
                        isBlocked
                            ? "bg-destructive/10 text-destructive"
                            : "bg-success/10 text-success"
                    }
                >
                    {isBlocked ? "Blocked" : "Active"}
                </Badge>
            </TableCell>
            <TableCell>
                {isCurrentUser ? (
                    <span className="text-[10px] text-muted-foreground">
                        Current admin
                    </span>
                ) : (
                    <Button
                        type="button"
                        variant="ghost"
                        className={
                            isBlocked
                                ? "h-8 px-0 text-xs text-success hover:bg-transparent"
                                : "h-8 px-0 text-xs text-destructive hover:bg-transparent"
                        }
                        onClick={() => onStatusChange?.(user, !isBlocked)}
                    >
                        {isBlocked ? "Unblock user" : "Block user"}
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
};

export default UserTableRow;
