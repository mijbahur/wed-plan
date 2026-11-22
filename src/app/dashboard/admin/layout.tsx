import { requireRole } from '@/lib/core/server';
import React from 'react';

const AdminLayoutPage = async ({ children }: { children: React.ReactNode }) => {
    await requireRole("admin");
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminLayoutPage;