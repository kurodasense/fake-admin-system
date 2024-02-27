import type { App } from "vue";
import { formatUtcString } from "@/utils/date-format";
export default function registerProperties(app: App) {
  app.provide("$filters", {
    formatTime(value: string) {
      return formatUtcString(value);
    }
  });
}
