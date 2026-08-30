export type ApprovalState =
  | "approved"
  | "client-approval-required";

export type ContactItem = {
  label: string;
  value: string;
  href:
    | `tel:${string}`
    | `mailto:${string}`
    | `https://${string}`
    | null;
  approval: ApprovalState;
};

export type SocialItem = {
  label: string;
  network:
    | "whatsapp"
    | "instagram"
    | "linkedin";
  href: `https://${string}`;
  approval: ApprovalState;
};

export type ConnectItem = {
  label: string;
  kind:
    | "whatsapp"
    | "instagram"
    | "call"
    | "email"
    | "linkedin"
    | "location";
  href: string;
  external?: boolean;
  approval: ApprovalState;
};

export const siteConfig = {
  name: "Wazni Jewellery",
  legalName: "Wazni Jewellery",
  description:
    "Fine jewellery shaped by craftsmanship, refinement and personal service in Abu Dhabi.",
} as const;

export const contactItems = [
  {
    label: "Phone",
    value: "+971 2 558 1720",
    href: "tel:+97125581720",
    approval: "approved",
  },
  {
    label: "Email",
    value: "Client approval required",
    href: null,
    approval: "client-approval-required",
  },
  {
    label: "Boutique",
    value:
      "Al Maqta' St - Rabdan - RB2 - Abu Dhabi",
    href: "https://www.google.com/maps/search/?api=1&query=Wazni%20Jewellery%2C%20Al%20Maqta%27%20St%20-%20Rabdan%20-%20RB2%20-%20Abu%20Dhabi",
    approval: "approved",
  },
] as const satisfies readonly ContactItem[];

export const socialItems = [
  {
    label: "WhatsApp",
    network: "whatsapp",
    href: "https://wa.me/971562656550",
    approval: "approved",
  },
  {
    label: "Instagram",
    network: "instagram",
    href: "https://www.instagram.com/waznijewellery_uae/",
    approval: "client-approval-required",
  },
  {
    label: "LinkedIn",
    network: "linkedin",
    href: "https://www.linkedin.com/",
    approval: "client-approval-required",
  },
] as const satisfies readonly SocialItem[];

export const connectItems: readonly ConnectItem[] = [
  {
    label: "WhatsApp",
    kind: "whatsapp",
    href: "https://wa.me/971562656550",
    external: true,
    approval: "approved",
  },
  {
    label: "Instagram",
    kind: "instagram",
    href: "https://www.instagram.com/waznijewellery_uae/",
    external: true,
    approval: "client-approval-required",
  },
  {
    label: "Call Wazni",
    kind: "call",
    href: "tel:+97125581720",
    approval: "approved",
  },
  {
    label: "Email Wazni",
    kind: "email",
    href: "#",
    approval: "client-approval-required",
  },
  {
    label: "Visit Wazni",
    kind: "location",
    href: "https://www.google.com/maps/search/?api=1&query=Wazni%20Jewellery%2C%20Al%20Maqta%27%20St%20-%20Rabdan%20-%20RB2%20-%20Abu%20Dhabi",
    external: true,
    approval: "approved",
  },
];

export const trustItems: readonly {
  label: string;
  type:
    | "partner"
    | "certification"
    | "client";
  approval: "approved";
}[] = [];