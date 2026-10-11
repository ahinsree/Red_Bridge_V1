// "Area of Interest" options for the contact form; labels are also sent to Zoho CRM
export const CONTACT_TOPICS = [
  { value: "strategy", label: "Strategy, Transformation & Institution Building" },
  { value: "ai", label: "AI, Digital & Data" },
  { value: "design", label: "Experience & Service Design" },
  { value: "investment", label: "Investment, Economic & Infrastructure Advisory" },
  { value: "startup", label: "Entrepreneurship, Innovation & Startup Ecosystems" },
  { value: "pm", label: "Programme Management, Monitoring & Evaluation" },
  { value: "general", label: "General Enquiry" },
] as const;

export function getContactTopicLabel(value: string): string | undefined {
  return CONTACT_TOPICS.find((topic) => topic.value === value)?.label;
}
