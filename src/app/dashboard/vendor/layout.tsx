import { requireRole } from '@/lib/core/server';
import React from 'react';

const VendorLayoutPage = async ({ children }: { children: React.ReactNode }) => {
    await requireRole("vendor");
    return (
        <div>
            {children}
        </div>
    );
};

export default VendorLayoutPage;