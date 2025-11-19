"use client";
import React from "react";
import { X } from "lucide-react";
import { deleteTodos } from "@/hooks/ReactQueryHooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DeleteModal from "@/components/ui/deleteModal/DeleteModal";

interface ModalDeleteNewsletterProps {
  selectedNewsLetterId: { id: string | number } | null;
  showModalDelete: boolean;
  setShowModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DeletePayload {
  id: string | number | undefined;
}

export default function DeleteTodos({
  showModalDelete,
  selectedTodosId,
  setShowModalDelete,
}: ModalDeleteNewsletterProps) {
  console.log("selectedTodosId", selectedTodosId?.id);
  const queryClient = useQueryClient();

  const { mutate: deletedTo } = useMutation({
    mutationFn: (id: DeletePayload) => deleteTodos(id),
    onSuccess: (data: any) => {
      toast.success("To do List Deleted");
      queryClient.invalidateQueries({ queryKey: ["todoLists"] });
      setShowModalDelete(false);
    },
    onError: () => {
      toast.error("Failed to delete todos");
    },
  });

  return (
    <div className="flex items-center justify-center ">
      <DeleteModal
        isOpen={showModalDelete}
        onClose={() => setShowModalDelete(false)}
        title="Are You sure?"
        message="Do you really want to delete this TodoList? This process cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        // confirmVariant="outlined"
        icon={<X size={32} color="#7B1E19" />}
        iconColor="#7B1E19"
        onConfirm={() => deletedTo(selectedTodosId?.id)}
      />
    </div>
  );
}
