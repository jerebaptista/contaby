"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ChatFab() {
  const t = useTranslations("Dashboard.fab");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant="default"
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-50 size-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:text-primary-foreground"
          aria-label={t("chat")}
        >
          <MessageCircle className="size-6" aria-hidden />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" align="center">
        {t("chat")}
      </TooltipContent>
    </Tooltip>
  );
}
