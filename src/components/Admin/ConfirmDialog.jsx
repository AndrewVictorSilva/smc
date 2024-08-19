import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

export function ConfirmDialog({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Confirm Deletion</DialogHeader>
      <DialogBody divider>
        Tem certeza que deseja excluir este usuário? Essa ação não pode ser desfeita.
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="blue-gray" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="red" onClick={onConfirm}>
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
