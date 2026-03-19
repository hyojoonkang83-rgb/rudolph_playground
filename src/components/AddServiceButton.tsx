"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddServiceModal } from "./AddServiceModal";

export function AddServiceButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
