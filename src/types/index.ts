export type ListResponse<T = unknown> = {
    data?: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}

export type CreateResponse<T = unknown> = {
    data?: T;
}

export type GetOneResponse<T = unknown> = {
    data?: T;
}

declare global {
  interface CloudinaryUploadWidgetResults {
    event: string;
    info: {
      secure_url: string;
      public_id: string;
      delete_token?: string;
      resource_type: string;
      original_filename: string;
    };
  }

  interface CloudinaryWidget {
    open: () => void;
  }

  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (
          error: unknown,
          result: CloudinaryUploadWidgetResults
        ) => void
      ) => CloudinaryWidget;
    };
  }
}

export interface UploadWidgetValue {
  url: string;
  publicId: string;
}

export interface UploadWidgetProps {
  value?: UploadWidgetValue | null;
  onChange?: (value: UploadWidgetValue | null) => void;
  disabled?: boolean;
}
export enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
}

export type Genre = {
  id: number;
  name: string;
};

export type GameDetails = {
    id: number;
    title: string;
    description: string;
    price: number;
    genre: Genre;
    createdAt?: string;
}
export type SignUpPayload = {
  email: string;
  name: string;
  password: string;
  image?: string;
  imageCldPubId?: string;
  role: UserRole;
};