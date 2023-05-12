export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      countries: {
        Row: {
          continent: Database['public']['Enums']['continents'] | null;
          id: number;
          iso2: string;
          iso3: string | null;
          local_name: string | null;
          name: string | null;
        };
        Insert: {
          continent?: Database['public']['Enums']['continents'] | null;
          id?: number;
          iso2: string;
          iso3?: string | null;
          local_name?: string | null;
          name?: string | null;
        };
        Update: {
          continent?: Database['public']['Enums']['continents'] | null;
          id?: number;
          iso2?: string;
          iso3?: string | null;
          local_name?: string | null;
          name?: string | null;
        };
      };
      issues: {
        Row: {
          contact: string | null;
          created_at: string | null;
          description: string;
          id: number;
          title: string;
          type: string;
        };
        Insert: {
          contact?: string | null;
          created_at?: string | null;
          description: string;
          id?: number;
          title: string;
          type: string;
        };
        Update: {
          contact?: string | null;
          created_at?: string | null;
          description?: string;
          id?: number;
          title?: string;
          type?: string;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          biography: string | null;
          country: number | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          biography?: string | null;
          country?: number | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          biography?: string | null;
          country?: number | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      continents:
        | 'Africa'
        | 'Antarctica'
        | 'Asia'
        | 'Europe'
        | 'Oceania'
        | 'North America'
        | 'South America';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Countries = Database['public']['Tables']['countries']['Row'];
export type InsertCountries =
  Database['public']['Tables']['countries']['Insert'];
export type UpdateCountries =
  Database['public']['Tables']['countries']['Update'];

export type Issues = Database['public']['Tables']['issues']['Row'];
export type InsertIssues = Database['public']['Tables']['issues']['Insert'];
export type UpdateIssues = Database['public']['Tables']['issues']['Update'];

export type Profiles = Database['public']['Tables']['profiles']['Row'];
export type InsertProfiles = Database['public']['Tables']['profiles']['Insert'];
export type UpdateProfiles = Database['public']['Tables']['profiles']['Update'];
