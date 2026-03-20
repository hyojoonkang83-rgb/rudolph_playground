export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  thumbnail_image?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email?: string;
  role: string;
  created_at: string;
}
