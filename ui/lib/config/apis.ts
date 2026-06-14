export const API_ENDPOINTS = {
  artworks: {
    list: "/artworks/",
    detail: (artworkId: string) => `/artworks/${artworkId}/`,
  },
  collections: {
    list: "/collections/",
    detail: (slug: string) => `/collections/${slug}/`,
    artworks: (slug: string) => `/collections/${slug}/artworks/`,
  },
  qrCodes: {
    list: "/qr-codes/",
    detail: (uniqueId: string) => `/qr-codes/${uniqueId}/`,
  },
  signatures: {
    list: "/signatures/",
    detail: (uniqueId: string) => `/signatures/${uniqueId}/`,
  },
  auth: {
    register: "/auth/register/",
    token: "/auth/token/",
    refresh: "/auth/token/refresh/",
    me: "/auth/me/",
  },
  uploads: {
    signature: "/uploads/signature/",
  },
} as const;
