import { requireRole } from '@/lib/core/server';
import React from 'react';

const CustomerLayoutPage = async ({ children }: { children: React.ReactNode }) => {
    await requireRole("customer");
    return (
        <div>
            {children}
        </div>
    );
};

export default CustomerLayoutPage;