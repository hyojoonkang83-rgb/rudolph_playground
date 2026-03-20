"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddServiceModal } from "./AddServiceModal";

interface AddServiceButtonProps {
  isAdmin?: boolean;
}

export function AddServiceButton({ isAdmin }: AddServiceButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isAdmin) return null;

  return (
    <>
      <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
        <Plus className="h-4 w-4" />
        New Service
      </Button>
      <AddServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
