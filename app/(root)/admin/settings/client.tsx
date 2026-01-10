"use client";

import AdminSettingsForm from '@/components/forms/admin-settings-form';
import { useSettings } from '@/hooks/use-settings'
import React from 'react'

function AdminSettingsPage() {
  const { settings, isLoadingSettings } = useSettings();

  return (
    <div>
      <AdminSettingsForm />
    </div>
  )
}

export default AdminSettingsPage