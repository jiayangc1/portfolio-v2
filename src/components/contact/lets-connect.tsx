"use client";

import { Send } from "lucide-react";
import * as React from "react";
import { LetsConnectForm } from "@/components/contact/lets-connect-form";
import {
  connectCopy,
  useLetsConnectForm,
} from "@/components/contact/use-lets-connect-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type LetsConnectProps = {
  trigger?: React.ReactElement;
};

export const LetsConnect = ({ trigger: triggerProp }: LetsConnectProps) => {
  const [open, setOpen] = React.useState(false);
  const { form, onSubmit, status, errorMessage, reset } = useLetsConnectForm({
    onSuccess: () => setOpen(false),
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      reset();
    }
  };

  const trigger = triggerProp ?? (
    <Button variant="ghost">
      <Send /> Let's connect
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="top-4 left-1/2 -translate-x-1/2 translate-y-0 sm:top-6 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{connectCopy.title}</DialogTitle>
          <DialogDescription>{connectCopy.description}</DialogDescription>
        </DialogHeader>
        <LetsConnectForm
          form={form}
          onSubmit={onSubmit}
          status={status}
          errorMessage={errorMessage}
        />
      </DialogContent>
    </Dialog>
  );
};
