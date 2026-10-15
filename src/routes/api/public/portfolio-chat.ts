import { createFileRoute } from "@tanstack/react-router";
import { handlePortfolioChat } from "@/lib/portfolio-chat.server";

export const Route = createFileRoute("/api/public/portfolio-chat")({
  server: { handlers: { POST: ({ request }) => handlePortfolioChat(request) } },
});
